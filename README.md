# devbrary-js-test-library

Funciones varias para facilitar el testeo en JavaScript.
Esta usa JQuery para realizar sus funciones.

Puedes agregarlo a tu proyecto con la siguiente etiqueta html:


<script id="devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js"></script> 



O con la versión minificada:


<script id="devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.min.js"></script> 


También puedes agregarlo usando JQuery

$.getScript( "https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js", function( data, textStatus, jqxhr ) {
  console.log( "Fue cargado correctamente." );
});
