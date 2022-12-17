# API REST MONGODB TYPESCRIPT

> npm i cors dotenv mongoose multer

> npm i @types/cors @types/dotenv @types/express @types/mongoose @types/multer -D

- Copio aquí mi package.json

~~~json
{
  "name": "apiresttypescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "tsc": "tsc",
    "start": "node build/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.15",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.7",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "4.18.2",
    "mongoose": "^6.8.0",
    "multer": "^1.4.5-lts.1"
  }
}

~~~

- Creo el archivo index.ts (puede ser que lo llame app.ts más adelante, son lo mismo) en src y configuro el server

~~~js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`)
})
~~~

- Creo el archivo en raíz .env
- Añado la variable PORT

> PORT= 3000

- Creo el archivo item.ts en routes
- Creo el router. Lo exporto como un objeto para poder hacer luego la importación dinámica
- item.ts

~~~js
import {Router, Response} from 'express'

const router = Router()

router.get('/items', (_ ,res: Response)=>{
    res.send({data: "AQUI VAN LOS MODELOS"})
})

export {router}
~~~

- Debo usar el router en app.ts

~~~js
app.use(ItemsRouter)
~~~

- Creo el archivo index.ts en routes
- Importo el router y la función readdirSync de fs
- __dirname es una constante que viene integrada en node, devuelve la ruta del directorio actual del archivo
- readdirSync es una función que se encarga de leer cuántos y cuales son los archivos que existen en 'x' directorio
- Esta me va a devolver un array y un filename

~~~js
import {Router} from 'express'
import {readdirSync} from 'fs'



const PATH_ROUTER = `${__dirname}`

const router = Router()

readdirSync(PATH_ROUTER).filter((fileName)=>{
    console.log(fileName)
})


export {router}
~~~

- Si ahora incorporo el router en index.ts me imprime en consola item.routes.ts
- Voy a crear una función en index (routes) para limpiar el fileName
    - En el router.get('item') está sin .ts
    - Lo que quiero es que el nombre del archivo sea el nombre del prefijo de la ruta
    - Quiero quitarle el .ts al fileName
        - Para ello usaré split. este devuelve un array. 'item'.'ts'
        - Con shift retiro el primer elemento del array y lo retorno

~~~js
const cleanFileName= (fileName: string)=>{
    const file= fileName.split('.').shift()
    return file
}
~~~

- El index no es una ruta que yo quiera tener. Le puedo poner un condicional

~~~js
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName !== 'index'){
        
    }
})
~~~

- Una vez aqui tengo que hacer uso del router, para que tenga acceso al nombre de la ruta de forma dinámica

~~~js
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName != 'index'){
        router.use(`./${cleanName}`)
    }
})
~~~

- Para que esto se implemente se necesita hacer una importación dinámica
- Voy a item.routes y borro del get('/item') para dejarlo en get('/')
- La importación dinámica devuelve una promesa
- moduleRouter es el router que está dentro de la ruta, lo capturo en la promesa
- Uso el router del index.ts(routes) con el nombre del archivo limpio como ruta, y con el router con notación con punto capturado de la promesa ya que lo exporté como un objeto

- index.ts (routes)
~~~js
import {Router} from 'express'
import {readdirSync} from 'fs'



const PATH_ROUTER = `${__dirname}`

const router = Router()

const cleanFileName= (fileName: string)=>{
    const file= fileName.split('.').shift()
    return file
}

readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName= cleanFileName(fileName)
    if(cleanName !== 'index'){
        import(`./${cleanName}`)
            .then((moduleRouter)=>{
                console.log(`Se está cargando la ruta ... ${cleanName}`)
                router.use(`/${cleanName}`, moduleRouter.router)
            })
    
    }
})


export {router}
~~~

- Para usar el cargador de rutas dinámico cambio la importación del router de item a index
- index.ts (src)

~~~js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {router} from './routes/index' //cambio

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`)
})
~~~

- item.ts. (Se cambió la ruta del GET de '/items' a '/')

~~~js
import {Router, Response} from 'express'

const router = Router()

router.get('/', (_ ,res: Response)=>{
    res.send({data: "AQUI VAN LOS MODELOS"})
})

export {router}
~~~

- En todos los archivos de rutas que escriba debo exportar el router como un objeto
- el nombre del archivo es el nombre de la ruta
- min 30:32
---------

## dbConnect

- La ruta item
- El GET va a devolver un array de objetos de una DB
- Creo la carpeta config en src con el archivo mongo.ts

~~~ts
import 'dotenv/config'
import {connect} from 'mongoose'


async function dbConnect():Promise<void>{
    const DB_URI= <string>process.env.DB_URI
    await connect(DB_URI)
}

export default dbConnect
~~~

- Necesito la variable de entorno DB_URI con el string de conexión

> DB_URI=mongodb://localhost:27017/api-rest-ts

- Voy a index.ts (archivo principal), importo dbConnection y lo invoco
- .then porque devuelve una promesa

~~~js
dbConnect().then(()=> console.log("DB corriendo"))
~~~
----

## Interfaces y controllers

- Creo la carpeta src/interfaces
- La interfaz hace una representación del tipado del dato. Es como un contrato
- Cómo el proyecto es sobre coches creo car.interface.ts

~~~ts
export interface Car{
    color: string;
    gas: 'gasoline' | 'electric'
    year: number;
    description: string;
    price: number;
    name: string
}
~~~

- Creo en controllers item.controller.ts
- el controller alberga las funciones típicas de un CRUD

~~~js
import { Request, Response } from "express"

export const getItem=(req: Request, res: Response)=>{
    try {
        
    } catch (error) {
        res.status(500).send('ERROR_GET_ITEM')
    }
}
export const getItems=(req: Request, res: Response)=>{

}
export const postItem=(req: Request, res: Response)=>{

}
export const updateItem=(req: Request, res: Response)=>{

}
export const deleteItem=(req: Request, res: Response)=>{

}
~~~

    NOTA: esta código da error de typescript porque no se está usando ni el req ni el res. Se puede colocar _

- Cómo la sentencia del catch se va a repetir en cada función del controller, creo una carpeta src/utils con el archivo errorHandle.ts
- Uso el  error (errorRaw) con un interrogante porque puede no venir y lo paso por consola
- utils/errorHandle.ts

~~~js
import { Response } from "express"

export const handleHttp = (res: Response, error: string, errorRaw?:any)=>{
    console.log(errorRaw)
    res.status(500).send({error})
}
~~~

- Ahora sustituyo el código en el catch del controlador por la función

~~~js
export const getItem=(_: Request, res: Response)=>{
    try {
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}
~~~

- Hago lo mismo en el resto de controladores, cambiando 'ERROR_GET_ITEM' por 'ERROR_POST_ITEM', etc
- Un controlador forma la orquestación entre infraestructura y lógica de negocio
- El controlador solo debe de eneterarse ( en este caso ) de las cosas que vienen por http, del req y res
- El controlador no debe de saber de lógica de negocio
- Esto es lo que **NO DEBE HACER UN CONTROLADOR**

~~~js
export const postItem=(req: Request, res: Response)=>{
    try {
        const user = req.body
        dbConnect.find(user)
        2+5
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}
~~~

- En el controller lo único que voy a hacer es **recibir datos**
- IMPORTANTE: tener habilitado en index.ts el express.json()

> app.use(express.json())

----
# Rutas

- item (en /routes)

~~~js
import {Router} from 'express'
import { deleteItem, getItem, getItems, postItem, updateItem } from '../controllers/item.controller'

const router = Router()

router.get('/', getItems)
router.get('/:id', getItem)
router.post('/', postItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export {router}
~~~

- Hago un console.log del req.body en el try de postItem para ver que todo marcha bien. 
- Uso ThunderClient, una petición POST a localhost:3000/item con algo en el body en formato json
- Le pongo algo en el res.send para que no se quede colgado

~~~js
export const postItem=(req: Request, res: Response)=>{
    try {
        console.log(req.body)
        res.json('ok')
        
    } catch (error) {
        handleHttp(res, 'ERROR_POST_ITEM')
    }
}
~~~
-----

# Schema

- Voy a models/item.models.ts
- Creo dos objetos dentro de Schema, en el segundo objeto añado el tiemstamps y elimino el version

~~~ts
import {Schema, Types, model} from 'mongoose'

const ItemSchema = new Schema(
    {},
    
    {
        timestamps: true, //cuando se guarde un dato se crea la fecha de creación y actualización
        versionKey: false
    }
)
~~~

- En el primer objeto defino las propiedades que voya utilizar
- Lo que voy a hacer es la implementación de la interfaz de Car y añadir las propiedades

~~~ts
import {Schema, model} from 'mongoose'
import { Car } from '../interfaces/car.interface'

const ItemSchema = new Schema<Car>(
    {
        color:{
            type: String,
            required: true
        },
        gas:{
            type: String,
            enum: ['gasoline', 'electric'],
            required: true
        },
        year:{
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        name:{
            type: String,
            required: true
        }

    },
    
    {
        timestamps: true,
        versionKey: false
    }
)

export const ItemModel = model('item', ItemSchema)
~~~

- Ahora falta implementar el modelo. Para ello uso model
- el primer argumento es el nombre de la colección en la db, el segundo el schema que acabo de crear

~~~ts
export const ItemModel = model('item', ItemSchema)
~~~

- Se dijo que en los controladores no debe de haber lógica de negocio
- Insertar en la base de datos ya es lógica de negocio
- Para ello me creo la carpeta src/services
- Creo un nuevo item de tipo Car y lo retorno
- item.service.ts

~~~js
import { Car } from "../interfaces/car.interface"
import { ItemModel } from "../models/item.model"


export const insertCar= async (item: Car)=>{
    const responseInsert = await ItemModel.create(item)

    return responseInsert
}
~~~

- Voy al controlador y le paso a la función el req.body
- en el handleHttp puedo pasarle error como tercer argumento o no, es opcional. Si no hay error lo omitirá

~~~js
export const postItem= async ({body}: Request, res: Response)=>{
    try {
     const responseItem = await insertCar(body)
     res.status(200).send(responseItem)
        
    } catch (error) {
        handleHttp(res, 'ERROR_POST_ITEM')
    }
}
~~~

- Si ahora voy a ThunderClient y mando esto en el body

~~~json
{
  "name": "Seat Ibiza",
  "color": "black",
  "gas":"electric",
  "year": 1989 ,
  "description": "very good car",
  "price": 3200
  
}
~~~

- Puedo ver que me devuelve esto

~~~json
{
  "color": "black",
  "gas": "electric",
  "year": 1989,
  "description": "very good car",
  "price": 3200,
  "name": "Seat Ibiza",
  "_id": "639b6102835886bc50943ad9",
  "createdAt": "2022-12-15T18:01:38.450Z",
  "updatedAt": "2022-12-15T18:01:38.450Z"
}
~~~

- Perfecto!
- Si no colocara alguno de los campos requeridos la aplicación daría error 500
- Falta hacer las validaciones
- Creo el servicio de getItems en item.service

~~~js
export const getCars = async()=>{
    const responseItems = ItemModel.find({})
    return responseItems
}
~~~

- item.controller

~~~js
export const getItems= async(_: Request, res: Response)=>{
    try {
        const response= await getCars()
        res.status(200).send(response)
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}
~~~

- Voy al servicio para codear el getCar
- El _id de mongo será de tipo id

~~~js
export const getCar= async(id: string)=>{
    const carResponse= await ItemModel.findOne({_id: id})
    return carResponse
}
~~~

- Lo coloco en el controlador. Extraigo params del request con desestructuración y de params el id

~~~ts
export const getItem= async ({params}: Request, res: Response)=>{
    try {
        const {id} = params
        const car = await getCar(id)
        res.status(200).send(car)
    
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}
~~~

- Sigue la función del CRUD, falta update y delete
- Update item.service: 
    - Le paso el id y la data al método
    - Le coloco un segundo objeto con new: true para que findOneAndUpdate me devuelva el objeto actualizado

~~~js
export const updateCar = async (id: string, data: Car)=>{
    const carResponse= await ItemModel.findOneAndUpdate({_id:id}, data, {new: true})
    return carResponse
}
~~~

- Coloco la función en el controlador
    - Extraigo el params y el body del request
    - Envío el body como data

~~~js
export const updateItem= async ({params, body}: Request, res: Response)=>{
    try {
        const {id} = params

       const updatedCar = await updateCar(id, body)

        res.send(updatedCar)
        
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_ITEM')
    }
}
~~~

- Delete
- item.service

~~~js
export const deleteCar = async( id:string)=>{
    const carResponse= await ItemModel.findOneAndDelete({_id:id})
    return carResponse
}
~~~

- item.controller

~~~js
export const deleteItem=async ({params}: Request, res: Response)=>{
    try {
        const {id}= params

        await deleteCar(id)
        res.send("Car deleted")
        
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_ITEM')
    }
}
~~~

- Una validación en getItem del controller podría ser así

~~~js
export const getItem= async ({params}: Request, res: Response)=>{
    try {
        const {id} = params
        const response = await getCar(id)
        const data = response ? response: 'NOT_FOUND'
        res.status(200).send(data)
        
    
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEM')
    }
}
~~~

> 1:08:19

