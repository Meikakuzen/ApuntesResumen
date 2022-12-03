# RestServer

- Cambio en el package.json para usar el import y export
- Colocar antes de los scripts

>  "type": "module",

- Install express y dotenv
- Creo el archivo .env con la variable de PORT=8080
- Importo dotenv en app.js y lo uso con dotenv.config() 

~~~js
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World!")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`)
})
~~~
----

# Express basado en clases

- Creo una clase server

~~~js
import express from 'express'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.routes()
    }


        routes(){
            this.app.get('/', (req,res)=>{
                res.send("Hello World!")
            })
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}
~~~

- Tengo que crear una nueva instancia para que corra el servidor con el método listen 
- Lo hago en app.js que ha quedado vacío

~~~js
import dotenv from 'dotenv'
import { Server } from "./models/server.js";

dotenv.config()

const server = new Server()

server.listen()
~~~

- Creo la carpeta public con un html básico
- Creo un método middleware en el server
- La palabra use es la palabra clave para expresar que esto es un middleware

~~~js
import express from 'express'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.middlewares()
        this.routes()

    }

        middlewares(){
            this.app.use(express.static('public'))
        }


        routes(){
            this.app.get('/hello', (req,res)=>{
                res.send("Hello World!")
            })
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}
~~~

- Ahora en el 8080 del navegador veo el html que tengo dentro de /public en la ruta raíz '/'
- La ruta que tenía antes en el get('/') ya no es válida, la cambio por ('/hello')
-----

# Peticiones HTTP GET-PUT-POST-DELETE

- Puedo devolver un json con .json

~~~js

        routes(){
            this.app.get('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición get API'
                })
            })
        }
~~~

- Puedo cambiarle el status con .status (el ok sería un 200)

~~~js
        routes(){
            this.app.get('/api', (req,res)=>{
                res.status(403).json({
                    msg: 'Es una petición get API'
                })
            })
        }
~~~

- Copio tres veces la petición get y lo cambio a put, post y delete

~~~js
  routes(){
            this.app.get('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición get API'
                })
            })
            this.app.put('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición put API'
                })
            })
            this.app.post('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición post API'
                })
            })
            this.app.delete('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición delete API'
                })
            })
        }
~~~

    - Uso thunderclient o postman para realizar las peticiones
   
----
# Usando códigos de respuesta HTTP en Express

- 200 es todo OK
    - 201 Created (con POST)
- 300 es redireccionamiento
- 400 ERROR Client (algo hizo mal en el frontend)
    - 400 Bad Request
    - 401 Unauthorized
    - 402 Payment Required
    - 403 Forbidden
    - 404 Not Found
    - 408 Request Time Out
- 500 Server Error (algo salió mal en el server)
    - 500 Internal Server Error
    - 502 Bad Gateway
----

# CORS - Middleware

- Instalo cors con npm. No tendría sentido si solo fuera en una red interna y las peticiones surgieran de un mismo lugar. 

> npm i cors

- Permite proteger el servidor de manera superficial
- Tiene que estar habilitado para la mayoría de navegadores
- Se puede configurar una whitelist y una blacklist


- Lo importo en el server

> import cors from 'cors'

- Lo uso en el método de middlewares antes del resto

~~~js
middlewares(){
            this.app.use(cors())
            this.app.use(express.static('public'))
        }
~~~

# Separar las rutas y el controlador de la clase

- Tener las rutas así es dificil de mantener. Voy a separar las rutas en su archivo especial de rutas y controladores.
- Creo la carpeta routes con el archivo user.routes.js
- Importo el Router de express
- Llamo la función y la exporto
- Quito las rutas del server y las copio en el archivo cambiando this.app por router

~~~js
import {Router} from 'express'

export const router = Router()

router.get('/api', (req,res)=>{
    res.json({
        msg: 'Es una petición get API'
    })
})
router.put('/api', (req,res)=>{
    res.json({
        msg: 'Es una petición put API'
    })
})
router.post('/api', (req,res)=>{
    res.json({
        msg: 'Es una petición post API'
    })
})
router.delete('/api', (req,res)=>{
    res.json({
        msg: 'Es una petición delete API'
    })
})
~~~

- En el server uso un middleware con la ruta '/api/usuarios'
- Para llamar al router lo importo 

> import {router} from '../routes/user.routes.js'

~~~js
    routes(){
          this.app.use('/api/usuarios', router)
        }
~~~

- Como ya tengo /api/usuarios en el path principal, los /api de las rutas en el archivo user las borro dejando solo '/'
- Puedo colocar la ruta en el constructor para que sea más visible

~~~js
export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.middlewares()
        this.routes()

    }

    
        routes(){
          this.app.use(this.usuariosPath, router)
        }
}
~~~

- El archivo user.routes debería tener solo las rutas pero el interior de la función debe de estar en un controlador.
- Creo la carpeta controllers con el archivo user.controller.js
- Copio y corto el callback del req,res y lo defino en el controller
- Lo exporto

~~~js
export const usuariosGet= (req,res)=>{
    res.json({
        msg: 'Es una petición get API'
    })
}
~~~

- En el user.routes

~~~js
import {Router} from 'express'
import { usuariosGet } from '../controllers/user.controller.js'

export const router = Router()

router.get('/', usuariosGet)
~~~

- Hago lo mismo con el resto de rutas
- Los archivos quedan así

- user.routes

~~~js
import {Router} from 'express'
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from '../controllers/user.controller.js'

export const router = Router()

router.get('/', usuariosGet)

router.put('/', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)
~~~

- user.controller

~~~js
export const usuariosGet= (req,res)=>{
    res.json({
        msg: 'Es una petición get API'
    })
}

export const usuariosPut = (req,res)=>{
    res.json({
        msg: 'Es una petición put API'
    })
}

export const usuariosPost = (req,res)=>{
    res.json({
        msg: 'Es una petición post API'
    })
}

export const usuariosDelete = (req,res)=>{
    res.json({
        msg: 'Es una petición delete API'
    })
}
~~~

# Obtener datos de un POST

- En un post se suele enviar info en un body  en el posteo 
- Selecciono en el thunderclient o postman body/raw/json
- Para recibir la info que viene al backend en formato json hay que crear un middleware en el server

~~~js
 middlewares(){
            this.app.use(cors())
            this.app.use(express.json())
            this.app.use(express.static('public'))
        }
~~~

- Extraigo el body del req con req.body ( en el controlador )

~~~js
export const usuariosPost = (req,res)=>{

    const body = req.body

    res.json({
        msg: 'Es una petición post API',
        body
    })
}
~~~

- Puedo usar desestructuración del objeto que envío en el POST. Si he enviado nombre y edad en el json, por ejemplo
- Edad lo introduje como un número y lo devuelve cómo un número

~~~js
export const usuariosPost = (req,res)=>{

    const {nombre, edad}= req.body

    res.json({
        msg: 'Es una petición post API',
        nombre,
        edad
    })
}
~~~

# Parámetros de segmento y query

- En una petición PUT coloco el id en la ruta del usuario que quiero actualizar (en este caso 10)

> http://localhost:8080/api/usuarios/10

- Este parámetro se conoce cómo parámetro de segmento, ya que puede cambiar
- En user.routes coloco el parámetro

~~~js
router.put('/:id', usuariosPut)
~~~

- Esto me obliga a introducir este parametro en la url para que no de error
- Ahora lo puedo extraer del req

~~~js

export const usuariosPut = (req,res)=>{

    const id= req.params.id

    res.json({
        msg: 'Es una petición put API',
        
    })
}
~~~

- También puedo extraerlo con desestructuración. Lo imprimo en el json para comprobar
- Devuelve el parámetro como un string


~~~js
export const usuariosPut = (req,res)=>{

    const {id}= req.params

    res.json({
        msg: 'Es una petición put API',
        id
        
    })
}
~~~

- Puede ser que en el GET yo necesite enviar query params

> http:localhost:8080/api/usuarios?q=hola&nombre=fernando&apikey=98232938238

- Cómo hago para obtener estos query params?
- Cómo estos params son considerados opcionales, no hace falta poner nada en el user.routes, express los parsea automáticamente
- Los extraigo del req

~~~js
export const usuariosGet= (req,res)=>{

    const query= req.query

    res.json({
        msg: 'Es una petición get API',
    
    })
}
~~~

- Puedo desestructurar lo que me interesa
- Le puedo especificar un parámetro por defecto, como el nombre

~~~js

export const usuariosGet= (req,res)=>{

    const {q,nombre ="Pere", id = 0}= req.query

    res.json({
        msg: 'Es una petición get API',
        q,
        nombre,
        id
    
    })
}
~~~










