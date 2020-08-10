# devbrary-js-test-library

Funciones varias para facilitar el uso JavaScript.

Este se divide en distintas finalidades de funciones usando como prefijo `dev_`

**Ejemplo:** `dev_test_var_dump('prueba')`

* **str:** manejo de string
```
dev_str_reemplazar_expresion_regular('Hola', '\w+',' ')
```
* **test:** manejo de testeo
```
dev_test_var_dom_dump('id-elemento')
```
* **dom:** manejo de DOM
```
dev_dom_crear_elemento('p','Valor del contenido','id-padre','id-elemento','clases','name',['otros','atributos'],['valor','de atributos'])
```
* **is:** saber que tipo de dato es
```
dev_is_array(['valor'])
```
* **form:** validación de elementos del domde
```
dev_form_email('mail@mail.com')
```
* **url:** manejo de url
```
dev_url_get_host('http://www.pagina.prueba.com')
```
* **arr:** manejo de array
```
dev_arr_incluye_texto(['prueba'],'prueba')
```
* **fec:** manejo de fechas
```
dev_fec_fecha_actual()
```

## Pre-requisitos

* [jQuery](https://jquery.com/)

## Instalación 
#### Al descargarla usa esta etiqueta html para añadirla a tu proyecto

```
<script id="dev-js-devbrary" src="/devbrary.js"></script> 
```

#### Puedes agregarlo a tu proyecto con la siguiente etiqueta html:

```
<script id="dev-js-devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js"></script> 
```

#### O con la versión minificada:

```
<script id="dev-js-devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.min.js"></script> 
```

#### También puedes agregarlo usando JQuery

```
$.getScript( "https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js", function( data, textStatus, jqxhr ) {
  console.log( "Fue cargado correctamente." );
});
```

## Ejecutando las pruebas

Puedes escribir `echo('prueba')` o `dev_test_echo('prueba')` para saber si esta fue instalada correctamente

## Construido con 

* JavasScript - Lenguaje de programación
* [jQuery](https://jquery.com/) - Manejador de DOM

## Licencia 

Este proyecto está bajo la Licencia (MIT) 


---
⌨️ con ❤️ por [yosoymitxel](https://github.com/yosoymitxel)
