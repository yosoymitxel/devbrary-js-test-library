function dev_echo(texto){
    console.log(texto);
}

function dev_var_dom_dump(idObjeto){
    //Imprimir atributos
    if(dev_existe_objeto_dom(idObjeto)){
        let id = '#'+idObjeto;
        echo('Objeto: ');
        echo($(id));
        echo('Id   : '+$(id).attr('id'));
        if(!dev_string_vacio($(id).prop('name'))){
            echo('Name : '+$(id).prop('name'));
        }

        if(!dev_string_vacio($(id).val())){
            echo('Value: '+$(id).val());
        }

        if(!dev_string_vacio($(id).text())){
            echo('Text : '+($(id).text()).trim());
        }

        if(!dev_string_vacio($(id).attr('css'))){
            echo('Css  : '+$(id).attr('css'));
        }
        
        if(!dev_string_vacio($(id).attr('class'))){
            echo('Class: '+$(id).attr('class'));
        }
        
        if(!dev_string_vacio($(id).attr('style'))){
            echo('Style: '+$(id).attr('class'));
        }
    }else{
        echo('El elemento "'+id+'" no existe en el DOM.');
    }
}

function dev_existe_objeto_dom(idObjeto){
    if(dev_es_tipo_de_dato(idObjeto,'string')){
        idObjeto = dev_quitar_espacios_blancos(idObjeto);
        if((!idObjeto.startsWith('#') && !idObjeto.startsWith('.')) || idObjeto.startsWith('#')){
            let id = idObjeto.startsWith('#')?idObjeto:'#'+idObjeto;

            if(!dev_string_vacio($(id).attr('id'))){
                return true;
            }else{
                return false;
            }
        }else if(idObjeto.startsWith('.')){
            let id = idObjeto;

            if(!dev_string_vacio($(id).attr('class'))){
                return true;
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}

function dev_es_tipo_de_dato(dato,tipo) {
    tipo = tipo.toLowerCase();
    switch (tipo) {
        case 'numero':
        case 'número':
        case 'num':
        case 'numeric':
            tipo = 'number'
            break;
        case 'bool':
        case 'boolean':
        case 'booleano':
            tipo = 'boolean'
            break;
        case 'string':
        case 'texto':
        case 'alfanumerico':
            tipo = 'string'
            break;
        case 'undefined':
            tipo = 'undefined'
            break;
    }
    if((typeof dato === 'string' || dato instanceof String) && typeof dato === tipo){
        return true;
    }else if (typeof dato === tipo){
        return true;
    }else{
        return false;
    }
}

function dev_var_dump(dato) {
    let tipoDato = typeof dato;
    let valorDato = dato;
    switch (tipoDato) {
        case 'number':
            if (Number.isSafeInteger(valorDato)) {
                tipoDato = 'int';
            } else {
                tipoDato = 'float';
            }
            echo(tipoDato + '(' + valorDato + ')');
            return tipoDato;
            break;
        case 'string':
            echo(tipoDato + '(' + valorDato.length + ') "' + valorDato + '"');
            return 'string';
            break;
        case 'object':
            if (Array.isArray(valorDato)) {
                tipoDato = 'array';
                echo(`${tipoDato} (${valorDato.length}) "${valorDato}"`);
                return 'array';
            }else if(valorDato == null){
                echo('NULL');
                return 'NULL';
            }else if(dev_existe_objeto_dom($(dato).attr('id'))){
                dev_var_dom_dump($(dato).attr('id'));
            }else if(dato !== undefined && dato !== null && dato.constructor == Object){
                echo('Objeto de tipo JSON');
                echo(dato);
                return 'json';
            }else{
                echo('Objeto no reconocido.');
                return 'Objeto no reconocido';
            }
            break;
        case 'boolean':
            echo(tipoDato + ' "' + valorDato + '"');
            return 'boolean';
            break;
        case 'undefined':
            echo('La variable no está definida. (undefined)');
            return 'undefined';
            break;
    }
}

function dev_tipo_dato(dato) {
    let tipoDato = typeof dato;
    let valorDato = dato;
    switch (tipoDato) {
        case 'number':
            if (Number.isSafeInteger(valorDato)) {
                tipoDato = 'int';
            } else {
                tipoDato = 'float';
            }
            return tipoDato;
        case 'string':
            return 'string';
        case 'object':
            if (Array.isArray(valorDato)) {
                return 'array';
            }else if(valorDato == null){
                return 'NULL';
            }else if(dev_existe_objeto_dom($(dato).attr('id'))){
                return 'dom';
            }else if(dato !== undefined && dato !== null && dato.constructor == Object){
                return 'json';
            }else{
                return 'Objeto no reconocido';
            }
        case 'boolean':
            return 'boolean';
        case 'undefined':
            return 'undefined';
    }
}

function dev_quitar_espacios_blancos(texto) {
    return dev_es_tipo_de_dato(texto,'undefined')?'':(texto.replace(/\s/g,""));
}

function dev_sin_caracteres_especiales(texto){
    if(dev_es_tipo_de_dato(texto,'string')){
        //Aquí añades las letras que no quieres que se usen
        let vocalesNoPermitidas    = ['á','é','í','ó','ú','ñ'];

        //Aquí añades las letras que quieres que se usen
        let vocalesPermitidas      = ['a','e','i','o','u','ni'];

        //Aquí añades los caracteres que no quieres que se usen
        let caracteresNoPermitidos = ['?','\"','\''];

        texto = (texto.toString()).toLowerCase();
        for(let i=0; i<vocalesNoPermitidas.length;i++){
            texto = texto.replace(vocalesNoPermitidas[i], vocalesPermitidas[i]);
        }

        for(let i=0; i<caracteresNoPermitidos.length;i++){
            texto = texto.replace(caracteresNoPermitidos[i], '_');
        }

        //Esta parte reemplaza los espacios en blanco " " y los guiones "-" por guiones bajos "_"
        texto = texto.replace(/(\s+|\-+|\_\_)+/g,"_");
    }
    return texto;
}

function dev_quitar_espacios_extra(texto){
    if(texto!='' && texto != null){
        texto = texto.trim();
        texto = texto.replace(/\s\s+/g, ' ');
        texto = texto.replace(/\s\s/g, '');
    }else{
        echo('El String está vacío');
    }
    return texto;
}

function dev_conseguir_numero_string(texto){
  let numero =  texto.match(/\d+/g);
  
  //Se valida si es es un array, hay caso (como el segundo) donde no sale un número directamente sino un array
  numero = Array.isArray(numero)?numero.join(''):numero;
  return numero;
}

function dev_separador_unidad_mil(numero){
    numero              = numero.toString();
    let filtered_number = numero.replace(/[^0-9]/gi, '');
    let length          = filtered_number.length;
    let breakpoint      = 1;
    let formated_number = '';

    for(i = 1; i <= length; i++){
        if(breakpoint > 3){
            breakpoint = 1;
            formated_number = '.' + formated_number;
        }
        var next_letter = i + 1;
        formated_number = filtered_number.substring(length - i, length - (i - 1)) + formated_number;

        breakpoint++;
    }

    return formated_number;
}

function dev_string_vacio(texto){
    if(texto !=undefined && texto!='' && texto.length>0 && texto!=null && texto!==''){
        return false;
    }else{
        return true;
    }
}

function dev_fecha_actual() {
    let f     = new Date();
    let fecha = `${f.getDay()}/${f.getDate()}/${f.getFullYear()}`;
    return fecha;
}

function dev_fecha_actual_texto() {
    var meses      = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f          = new Date();
    let fecha = `${diasSemana[f.getDay()]} ${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;
    return fecha;
}

function dev_html_permitir_caracteres_input( permitidos, elEvento = event) {
    //Se usa con onkeypress
    // onkeypress="return dev_html_permitir_caracteres_input('num')"
    // onkeypress="return dev_html_permitir_caracteres_input('car')"
    // onkeypress="return dev_html_permitir_caracteres_input('num_car')"
    // Variables que definen los caracteres permitidos
    let numeros = "0123456789";
    let caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let numeros_caracteres = numeros + caracteres;
    let teclas_especiales = [8, 37, 39, 46];
    // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha


    // Seleccionar los caracteres a partir del parámetro de la función
    switch(permitidos) {
        case 'num':
        case 'numero':
        case 'numeros':
            permitidos = numeros;
            break;
        case 'car':
        case 'caracteres':
        case 'letras':
        case 'texto':
            permitidos = caracteres;
            break;
        case 'num_car':
        case 'alfanumerico':
        case 'letrasnumeros':
        case 'numerosyletras':
            permitidos = numeros_caracteres;
            break;
    }

    // Obtener la tecla pulsada
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    // (teclas de borrado y flechas horizontales)
    var tecla_especial = false;
    for(var i in teclas_especiales) {
        if(codigoCaracter == teclas_especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
    // o si es una tecla especial
    return permitidos.indexOf(caracter) != -1 || tecla_especial;
}

function dev_validar_email(t) {
    return ( (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(t)) );
}

function dev_validar_url(t) {
    let re = /^(file|http?:\/\/|https?:\/\/)\w+\.\w+/;
    return t.match(re);
}

function dev_validar_longitud_string(t,longitud = 1) {
    return (!dev_string_vacio(t) && t.length>=longitud);
}

function dev_convertir_a_sting(t) {
    if(!dev_es_tipo_de_dato(t,'string')){
        switch (dev_tipo_dato(t)){
            case 'int':
            case 'boolean':
            case 'float':
                t = String(t);
                break;
            case 'null':
            case 'undefined':
                t= '';
                break;
        }
    }
    return t;
}

function dev_copiar_en_portapapeles(dato) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val(dato).select();
    document.execCommand("copy");
    $temp.remove();
}

function dev_url_decode(t){
    return decodeURIComponent(t)
}

function dev_url_encode(t){
    return encodeURIComponent(t)
}

function dev_string_incluye(t,busqueda) {
    return dev_es_tipo_de_dato(t,'string')?t.includes(busqueda):'';
}

function dev_string_incluye_reg(t,expresion) {
    let expreg = new RegExp(expresion);
    return dev_es_tipo_de_dato(t,'string')?expreg.test(t):false;
}

function dev_contador_texto_para_pruebas(texto='Prueba') {
    if( typeof dev_contador_texto_para_pruebas.counter == 'undefined' ) {
        dev_contador_texto_para_pruebas.counter = 0;
    }
    dev_contador_texto_para_pruebas.counter++;
    console.log(texto+': '+dev_contador_texto_para_pruebas.counter);
}

/*LLAMADA DE FUNCION MÁS BREVE*/
function echo (texto){
   dev_echo(texto);
}
function var_dump (texto){
   dev_var_dump(texto);
}
function var_dom_dump (texto){
   dev_var_dom_dump(texto);
}
function string_isset(t,longitud = 1) {
    return dev_validar_longitud_string(t,longitud);
}
