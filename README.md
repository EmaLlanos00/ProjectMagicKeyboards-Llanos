# Proyecto Magic Keyboards

## Introducción
La idea de hacer un ecommerse de teclados surgió de la premisa de hacer algo original, de nicho, que pueda volcar en un proyecto tan conocido como las tiendas online.
Me gustan los periféricos, y si pudiera tendría varios teclados, creo que abordar un proyecto personal conectándolo con algo que a uno le gusta simplifica un poco la tarea.

## Estructura del proyecto
La génesis de este proyecto es el trabajo final del curso de backend de Coderhouse, ergo lo más sustancial es el trabajo del lado del servidor por sobre lo visual. Mi idea es hacer una SPA sencilla con categorías como keycaps, switches, placas, lubricantes, cases, teclados, etc.

## Heramientas utilizadas
- nodeJs: lenguaje de javascript optimizado para servidores y para ejecutarse por fuera de un browser. Es el código base que utilizamos en este curso.

- express: extención que simplifica mucho la ejecución y elaboración de servidores.

- Handlebars: motor de plantillas muy popular, es de fácil comprensión y muy parecido a html. No me convence del todo, principalmente porque no pude utilizar su partials correctamente.
Su sintaxis me parece la mejor, previamente utilicé emailJs en otros proyectos y las platillas eran parecidas, usar las "{{ }}" es muy claro y mantenible.

- Pug: otro motor de plantillas conocido, tiene una sintaxis muy particular, es algo tedioso de usar al principio. Por suerte Pug comprente html y js, eso simplifica algunas cosas.
Es el primer motor que utilicé para este proyecto y creo que le agarré algo de cariño, fue toda una odisea tratar de iterar un array con su sintaxis tan rara.

- Ejs: aparentemente este es el motor más popular, siento que es el más potente y versátil pero la forma en la que mezcla html y js se me hizo confusa. Pude manejar sus partials sin problemas, en ese sentido es fácil de aprender, pero no deja de ser confuso como se "parten" los scripts. Siento que leer codigo en ejs es garantía de leer lo mismo varias veces.