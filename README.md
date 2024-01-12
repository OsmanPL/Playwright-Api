# Playwrigth-Api

Esta api hara la función de ser un pull de navegadores el cual podemos utilizar cualquiera de las opciones que tenemos al momento, como chromium, firefox, webkit, edge y brave.

Para que funcione el api solo debemos enviar un json de peticion, todas las peticiones son post, y el api nos respondera el html del sitio.

## Json para peticion

| Key     | Coment                                                                      |
|---------|-----------------------------------------------------------------------------|
| options | Las opciones que se le pueden agregar al navegador, como proxy, slowMo, etc, el unico que deberia de ir por defecto es headless:true debido a que si no no funciona el navegador |
| url     | La url del sitio que queremos extraer                                       |
| browser | Es el navegador que queremos utilizar para la extracción, existen chromium, firefox, webkit, edge y brave, si el dato no se envia en el json se seleccionara un navegador al azar para cada peticion                    |

### Ejemplo
```json
{"options":{
    "args":["--disable-web-security","--disable-xss-auditor","--no-sandbox","--enable-automation\u003dfalse","--disable-setuid-sandbox","--no-first-run"],
    "slowMo":20.0,
    "proxy":{},
    "headless":true
},
"url":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
"browser":"chromium"
}
```

## Mappers

Se cuenta con lo que son los mappers lo cual nos permite crear interacciones con el sitio cuando sea necesario, como por ejemplo el uso de 2captcha con amazon, de igual manera al crear un mapper si se debe seleccionar hacer con un navegador especifico y se debe de crear el endpoint para utilizar ese mapper.
