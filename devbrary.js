function dev_var_dom_dump(idObjeto){
    let id = '#'+idObjeto;

    //Imprimir atributos
    if($(id).attr('id')!=undefined && $(id).attr('id')!=null && $(id).attr('id')!=''){
        console.log('Objeto: ');
        console.log($(id));
        console.log('Id   : '+$(id).attr('id'));
        if($(id).prop('name')!=undefined && $(id).prop('name')!=null && $(id).prop('name')!=''){
            console.log('Name : '+$(id).prop('name'));
        }

        if($(id).val()!=undefined && $(id).val()!=null && $(id).val()!=''){
            console.log('Value: '+$(id).val());
        }

        if($(id).text()!=undefined && $(id).text()!=null && $(id).text()!=''){
            console.log('Text : '+($(id).text()).trim());
        }

        if($(id).attr('css')!=undefined && $(id).attr('css')!=null && $(id).attr('css')!=''){
            console.log('Css  : '+$(id).attr('css'));
        }
        if($(id).attr('class')!=undefined && $(id).attr('class')!=null && $(id).attr('class')!=''){
            console.log('Class: '+$(id).attr('class'));
        }
    }else{
        console.log('El elemento "'+id+'" no existe en el DOM.');
    }
}

function dev_existe_objeto_dom(idObjeto){
    let id = '#'+idObjeto;

    if($(id).attr('id')!=undefined && $(id).attr('id')!=null && $(id).attr('id')!=''){
        //echo('El elemento "'+id+'" sí existe en el DOM.');
        return true;
    }else{
        //echo('El elemento "'+id+'" no existe en el DOM.');
        return false;
    }
    
}

function dev_echo(texto){
    console.log(texto);
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
            break;
        case 'string':
            echo(tipoDato + '(' + valorDato.length + ') "' + valorDato + '"');
            break;
        case 'object':
            if (Array.isArray(valorDato)) {
                tipoDato = 'array';
                echo(`${tipoDato} (${valorDato.length}) "${valorDato}"`);
            }else if(valorDato == null){
                echo('NULL');
            }else if(dev_existe_objeto_dom($(dato).attr('id'))){
                dev_var_dom_dump($(dato).attr('id'));
            }else if(dato !== undefined && dato !== null && dato.constructor == Object){
                echo('Objeto de tipo JSON');
                echo(dato);
            }else{
                echo('Objeto no reconocido.');
            }
            break;
        case 'boolean':
            echo(tipoDato + ' "' + valorDato + '"');
            break;
        case 'undefined':
            echo('La variable no está definida. (undefined)');
            break;
    }
}

function dev_sin_caracteres_especiales(texto){
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
    texto = texto.replace(" - ", "");
    texto = texto.replace(/\s/g,"_");
    texto = texto.replace(/\W/g,'');

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
    if(texto!='' && texto.length>0 && texto!=null && texto!==''){
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
    return t.match(re)? true: false;
}

function dev_validar_longitud_string(t,longitud = 1) {
    return (!dev_string_vacio(t) && t.length>=longitud);
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
