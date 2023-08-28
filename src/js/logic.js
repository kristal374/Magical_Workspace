let listImagePath = [
    '../image/icons_space/bag.png',
    '../image/icons_space/book.png',
    '../image/icons_space/crown.png',
    '../image/icons_space/file.png',
    '../image/icons_space/game.png',
    '../image/icons_space/leaf.png',
    '../image/icons_space/night.png',
    '../image/icons_space/plain.png',
    '../image/icons_space/sun.png',
    '../image/icons_space/sword.png',
];

(async () => { // Инициализация пространств
    const spaces = document.querySelectorAll('.nav__list-item');
    const navList = document.querySelector('.nav__list-list');
    const tabs = (await browser.storage.local.get('tabs')).tabs || []; // Запрашиваем данные из хранилища
    let listTabs = []

    spaces.forEach(space => { // Навешиваем обработчики событий на главные пространства
        addEvents(space)
        listTabs.push(generateDataTab(space))
    })

    tabs.forEach(space => { // Создаёт доп. пространства и навешиваем на них ивенты, если таковые присутствуют
        if (!space.main) {  // Игнорируем главные пространства т.к. ивенты на них уже добавлены
            const newSpace = createSpaceElement(space.name, space.id, space.icon);
            navList.appendChild(newSpace);
            addEvents(newSpace)
        } else {
            document.getElementById(space.id).querySelector('.space-name').textContent = space.name;
        }
        if (space.active) { // Обновляем active элемент
            document.querySelector('.active').classList.remove('active');
            document.getElementById(space.id).classList.add('active');
        }
    })
    if (tabs.length === 0) { // Если хранилище пусто заполняем его данными главных пространств
        await browser.storage.local.set({"tabs": listTabs})
    }
})()

document.addEventListener('DOMContentLoaded', function () {
    const addSpace = document.querySelector('.add-button');

    addSpace.addEventListener('click', async () => {
        const idList = Array.from(document.querySelectorAll(".nav__list-item")).map(element => element.id);
        const navList = document.querySelector('.nav__list-list');
        if (idList.length >= 12) return;
        let id_ = getRandInt(1001, 9999);
        while (idList.includes(id_.toString())) {
            id_ = getRandInt(1001, 9999)
        }
        const newSpace = createSpaceElement('Новое пространство', id_, listImagePath[0]);
        navList.appendChild(newSpace);
        await addEvents(newSpace)

        const listTabs = (await browser.storage.local.get('tabs')).tabs
        listTabs.push(generateDataTab(newSpace))
        await browser.storage.local.set({"tabs": listTabs})
    });
});

async function addEvents(space) {
    await addClickEvent(space);
    await addDoubleClickEvent(space);
    await addDeleteEvent(space);
}

async function addClickEvent(space) {
    space.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement !== space) {
            activeElement.classList.remove('active');
            space.classList.add('active');
            changeSpace(activeElement, space);
        }
    });
}

async function addDeleteEvent(space) {
    const deleteButton = space.querySelector('.delete-button');
    if (!deleteButton) return;

    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const listItem = deleteButton.closest('.nav__list-item');
        if (document.querySelector('.active') === space) {
            const SpaceList = document.querySelectorAll('.nav__list-item');
            SpaceList[0].click();
        }
        listImagePath.push(space.querySelector('.space-icon').getAttribute('src'));
        listItem.remove();
        event.stopPropagation()

        let listTabs = (await browser.storage.local.get('tabs')).tabs
        listTabs = listTabs.filter(item => item.id !== listItem.id);
        await browser.storage.local.set({"tabs": listTabs})
    });
}

async function addDoubleClickEvent(space) {
    const spaceName = space.querySelector('.space-name');
    const editInput = space.querySelector('.edit-input');

    space.addEventListener('dblclick', () => {
        if (window.innerWidth < 170) return;
        editInput.value = spaceName.textContent;
        spaceName.style.display = 'none';
        editInput.style.display = 'inline-block';
        editInput.focus();
        editInput.select();
    });

    editInput.addEventListener('blur', () => {
        confirmInput(spaceName, editInput, space);
    });

    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            editInput.value = event.key === 'Escape' ? '' : editInput.value;
            confirmInput(spaceName, editInput, space);
        }
    });

}

async function confirmInput(spaceName, editInput, space) {
    spaceName.style.display = '';
    editInput.style.display = 'none';
    if (editInput.value.trim() !== '') {
        spaceName.textContent = editInput.value;
    }
    let listTabs = (await browser.storage.local.get('tabs')).tabs
    const indexToUpdate = listTabs.findIndex(item => item.id === space.id);
    listTabs[indexToUpdate] = generateDataTab(space)
    await browser.storage.local.set({"tabs": listTabs})
}

function createSpaceElement(spaceName, id, path) {
    const spaceItem = document.createElement('li');
    spaceItem.classList.add('nav__list-item');
    spaceItem.id = id

    const spaceLink = document.createElement('a');
    spaceLink.classList.add('nav__list-link');
    spaceLink.href = '#';

    const spaceIcon = document.createElement('img');
    spaceIcon.classList.add('space-icon');
    spaceIcon.src = path;
    spaceIcon.alt = 'Space Icon';

    listImagePath = listImagePath.filter(item => item !== path);

    const spaceNameSpan = document.createElement('span');
    spaceNameSpan.classList.add('space-name');
    spaceNameSpan.textContent = spaceName;

    const editInput = document.createElement('input');
    editInput.classList.add('edit-input');
    editInput.type = 'text';
    editInput.style.display = 'none';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '&times;';

    spaceLink.appendChild(spaceIcon);
    spaceLink.appendChild(spaceNameSpan);
    spaceLink.appendChild(editInput);
    spaceLink.appendChild(deleteButton);

    spaceItem.appendChild(spaceLink);

    return spaceItem;
}

async function changeSpace(currentSpace, newSpace) {
    const tabs = await browser.tabs.query({})
    const listTabs = (await browser.storage.local.get('tabs')).tabs || []; // Запрашиваем данные из хранилища
    const indexOldSpace = listTabs.findIndex(item => item.id === currentSpace.id);
    const indexNewSpace = listTabs.findIndex(item => item.id === newSpace.id);
    const listUrl = listTabs[indexNewSpace].state;

    listTabs[indexOldSpace].state = tabs.map(tab => ({
        url: tab.url,
        active: tab.active
    }));
    listTabs[indexOldSpace].active = false
    listTabs[indexNewSpace].active = true
    await browser.storage.local.set({"tabs": listTabs})

    listUrl.length > 0
        ? listUrl.forEach(tab => createNewTab(tab.url, tab.active))
        : createNewTab();

    tabs.forEach(tab => {
        browser.tabs.remove(tab.id);
    });
}

function generateDataTab(space) { // Извлекает данные из пространства и структурирует их
    return {
        "name": space.querySelector(".space-name").textContent,
        "icon": space.querySelector('.space-icon').getAttribute('src'),
        "id": space.id,
        "active": space.classList.contains('active'),
        "main": space.id <= 1000,
        "state": []
    }
}

function createNewTab(url, active) { // создаёт новую вкладку с заданным url
    return browser.tabs.create({
        url: url,
        active: active
    });
}

function getRandInt(min, max) { // генерирует случайное целое число в промежутке от min до max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}