# Playwrigth-Api

Esta api hara la función de ser un pull de navegadores el cual podemos utilizar cualquiera de las opciones que tenemos al momento, como chromium, firefox, webkit, edge y brave.

Para que funcione el api solo debemos enviar un json de peticion, todas las peticiones son post, y el api nos respondera el html del sitio.

## Json para peticion

| Key     | Coment                                                                      |
|---------|-----------------------------------------------------------------------------|
| options | Las opciones que se le pueden agregar al navegador, como proxy, slowMo, etc, el unico que deberia de ir por defecto es headless:true debido a que si no no funciona el navegador |
| url     | La url del sitio que queremos extraer                                       |
| browsers | Listado de navegadores que queremos utilizar para la extracción, existen chromium, firefox, webkit, edge y brave, si el dato no se envia en el json se seleccionara un navegador al azar para cada peticion                    |

### Ejemplo
```json
{"options":{
    "args":["--disable-web-security","--disable-xss-auditor","--no-sandbox","--enable-automation\u003dfalse","--disable-setuid-sandbox","--no-first-run"],
    "slowMo":20.0,
    "proxy":{"server":"http://my.proxy.com:3000","username":"user","password":"pass"},
    "headless":true
},
"url":"https://httpbin.org/get",
"browsers":["chromium","brave","edge","firefox","webkit"]
}
```

## Mappers

Se cuenta con lo que son los mappers lo cual nos permite crear interacciones con el sitio cuando sea necesario, como por ejemplo el uso de 2captcha con amazon, de igual manera al crear un mapper si se debe seleccionar hacer con un navegador especifico y se debe de crear el endpoint para utilizar ese mapper.

## Comandos Docker

Son los utilizados para hacer uso de la imagen docker localmente.

Construir imagen.
```shell
docker build -t playwright-api .
```

Utilizar contenedores con docker compose.
```shell
docker-compose up -d
```

Apagar contenedores con docker compose.
```shell
docker-compose down
```

## Notas

El browser de webkit no tiene soporte para stealth asi que es el unico que no puede usar el stealthMode.