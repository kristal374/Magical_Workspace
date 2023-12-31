# Magical Workspace

<p align="center">
    <img src="https://img.shields.io/github/v/release/kristal374/Magical_Workspace">
    <img src="https://img.shields.io/github/license/kristal374/Magical_Workspace">
</p>
<p align="center">
   <img src="https://img.shields.io/badge/JavaScript-FFD700?logo=javascript&logoColor=white"/>
   <img src="https://img.shields.io/badge/HTML-red.svg?logo=html5&logoColor=white"/>
   <img src="https://img.shields.io/badge/CSS-blue.svg?logo=css3&logoColor=white"/>
</p>
<p align="center">
    <img src="assets/MagicalWorkSpace_logo.png" width="300" alt="logo">
</p>

# Описание


Расширение для Firefox, реализующее примитивнейший функционал рабочих пространств, аналогичный пространствам в Opera.


## Использование

Функционал расширения очень простой: есть несколько кнопок, представляющих пространства. При переходе в новое
пространство, расширение запоминает список открытых вкладок и закрывает их. Затем оно считывает список вкладок из
другого пространства и поочередно открывает их взамен закрытых. Как упоминалось ранее реализация примитивнейшая, но мне
этого пока хватает. Так же существует функционал создания новых пространств и их удаления(не применимо к первым двум),
всего вы можете создать не более 12 пространств. У каждого из пространств будет своя иконка что позволит их отличать.
Имеется и возможность переименовать пространство после двойного клика по названию.

## Внешний вид

<p align="center">
   <img src="assets\present-1.png" width="800" alt="present-1.png">
   <img src="assets\present-2.png" width="800" alt="present-1.png">
</p>

## Установка

Поскольку расширение разрабатывалось на основе опыта использования Opera, мне хотелось реализовать функционал расширения
с использованием боковой панели(sidebar). Firefox имеет нужный инструментарий позволяющий работать с sidebar-ом, однако
по умолчанию минимальный размер боковой панели ограничен и не позволяет полноценно повторить интерфейс боковой панели из
Оперы.

**Загрузите это расширение из  [магазина Firefox](https://addons.mozilla.org/ru/firefox/addon/magical-workspace/)**

Что бы изменить минимальный размер боковой панели Firefox следуйте этой инструкции если ваш Firefox выше версии 69:

1. Введите в адресной строке [about:config](about:config)
    * Если возникнет предупреждение, нажмите "Продолжить".
2. В поле поиска введите `toolkit.legacyUserProfileCustomizations.stylesheets`.
3. Измените значение данного параметра с `false` на `true`.
4. Перейдите по следующему пути: `Меню -> Справка -> Информация для решения проблем -> Папка профиля -> Открыть папку`
   или если язык браузера
   английский: `Firefox menu -> Help -> Troubleshooting Information -> Profile folder -> Open folder`
5. Должна быть папка с именем Chrome. Если её нет, создайте её.
6. В упомянутой папке Chrome есть файл `userchrome.css`. Если его не существует, создайте его.
7. Откройте этот файл с любым текстовым редактором.
8. В этом файле, если нет правила CSS `#sidebar-box`, создайте его:
   ```css
   #sidebar-box {
        min-width: 45px !important;
   }
   ```
9. Перезагрузить Firefox. Готово.

---
Если ваш Firefox ниже версии 69:

1. Перейдите по следующему пути `Меню -> Справка -> Информация для решения проблем -> Папка профиля -> Открыть папку`
   или если язык браузера
   английский: `Firefox menu -> Help -> Troubleshooting Information -> Profile folder -> Open folder`
2. Должна быть папка с именем Chrome. Если её нет, создайте её.
3. В упомянутой папке Chrome есть файл `userchrome.css`. Если его не существует, создайте его.
4. Откройте этот файл с любым текстовым редактором.
5. В этом файле, если нет правила CSS `#sidebar`, создайте его:
   ```css
   #sidebar {
        min-width: 45px !important;
   }
   ```
6. Перезагрузить Firefox. Готово.

---
