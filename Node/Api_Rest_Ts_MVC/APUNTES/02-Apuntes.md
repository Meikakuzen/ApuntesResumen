## Middlewares y Autenticación

- Los middlewares son una función que van a estar en medio, entre la ruta y el controlador
- Sirve como un observador para las cosas que están sucediendo
- Puede servir para un login, proteger rutas, etc
- Creo la carpeta middlewares/log.ts

~~~js
import { Request, Response, NextFunction } from "express"


export const logMiddleware= (req:Request, res:Response, next: NextFunction)=>{
    console.log('Soy el log')
    next()
}
~~~

- Se usa en las rutas. Quiero aplicarlo en las rutas que se usa el /:id

~~~ts
router.get('/:id',logMiddleware, getItem)
~~~

    NOTA: he tenido que comentar en tsconfig la opción noUnusedParameters:true para poder pasar el req y el res en el middlewareen el middleware y ver el Soy el log en consola

- En el middleware puedo sacar los encabezados con req.headers

~~~js
export const logMiddleware= ( req: Request, res:Response, next:NextFunction)=>{
    const header = req.headers
    const userAgent = header["user-agent"]

    console.log(userAgent)
    next()
}
~~~

- Creo el middleware que se va a encargar de comprobar si el usuario tiene una sesión activa o no
- No se ha hecho el login todavía. Para ello se van a cargar unos paquetes

> npm i bcryptjs jsonwebtoken

> npm i @types/jsonwebtoken @types/bcryptjs -D

- Creo el archivo routes/auth.ts
- Importo el router de express

~~~ts
import {Router} from 'express'

const router = Router()

router.post('/register')
router.post('/login')


export {router}
~~~

- Creo los controladores en /controllers/auth.controller.ts

~~~js
import {Request, Response} from 'express'

export const resgisterController=(req:Request, res: Response)=>{

}

export const loginController=(req:Request, res: Response)=>{

}
~~~

- Creo el /services/auth.services.ts dónde irá mi lógica de negocio

~~~js
const registerNewUser =()=>{


}

const loginUser = ()=>{

    
}
~~~

- Más adelante se harán las validaciones pertinentes con express-validator
- Por ahora, voy al controlador y en registerNewUser desestructuro el body del req y me aseguro de recibir email y password
- Creo la interfaz /interfaces/auth.interface.ts

~~~ts
export interface Auth{
    email: string;
    password: string;
}
~~~

- Creo el modelo de usuario, pero antes creo la interfaz User extendiéndola de Auth ( con lo que ya tiene email y password)
- /interfaces/user.interface.ts

~~~ts
import { Auth } from "./auth.interface";

export interface User extends Auth{
    name: string
    description: string
}
~~~

- Voy al servicio y le digo que el parámetro que recibe va a cumplir con User

~~~ts

const registerNewUser =(authUser: User)=>{
}
~~~
- Porqué esta interfaz de usuario?
- Porque en el momento que voy al modelo de usuario, le digo que el schema es de tipo User

~~~ts
import {Schema, model} from 'mongoose'
import { User } from '../interfaces/user.interface'


import {Schema, model} from 'mongoose'
import { User } from '../interfaces/user.interface'


const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        description:{
            type: String,
            default: 'Soy la descripción'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const UserModel = model('user', UserSchema)
~~~

- Ahora que ya tengo el modelo voy al servicio y lo importo
- Primero reviso si existe el usuario
- Creo el usuario
- auth.services

~~~js
const registerNewUser = async (authUser: User)=>{
    const existUser =  await UserModel.findOne({email: authUser.email})  
    if(existUser) return 'ALREADY_USER'

    const registerNewUser = await UserModel.create(authUser)

}
~~~

- También puedo usar la desestructuración

~~~js
const registerNewUser = async ({name, email, password}: User)=>{
    const existUser =  await UserModel.findOne({email})  
    if(existUser) return 'ALREADY_USER'

    const registerNewUser = await UserModel.create({name, email, password})

    return registerNewUser
}
~~~

- Pero de esta manera estaría registrando un usuario con la clave sin encriptar
- auth.controller

~~~js
export const resgisterController= async ({body}:Request, res: Response)=>{
    
    const responseNewUser = await registerNewUser(body)
      
    res.status(200).send({responseNewUser})
}
~~~

## Encriptar password

- Creo un archivo en utils/bcrypt.handle.ts con las funciones encrypt y verified
- Importo de bcrypt hash y compare
- Necesito que la función encrypt sea asíncrona para usar el await
- Le paso al método hash el password y el salt (complejidad del encriptado, 10 por defecto)

~~~js
import {hash, compare} from 'bcryptjs'

const encrypt = async (password:string)=>{
    const passwordHash = await hash(password, 10)

    return passwordHash
}

const verified = () =>{

}

export { encrypt, verified }
~~~

- Voy al auth.service y antes de crear el usuario registrado encripto el password

~~~js
export const registerNewUser = async ({name, email, password}: User)=>{
    const existUser =  await UserModel.findOne({email})  
    if(existUser) return 'ALREADY_USER'

    const passwordHash = await encrypt(password)

    const registerNewUser = await UserModel.create({name, email, password: passwordHash})

    return registerNewUser
}
~~~

- Para comparar el password se usará la funcion verified en /utils/bcrypt.handle.ts

~~~js
import {hash, compare} from 'bcryptjs'

const encrypt = async (password:string)=>{
    const passwordHash = await hash(password, 10)

    return passwordHash
}

const verified = async (password: string, passwordHash: string) =>{
    const isCorrect =  await compare(password, passwordHash)

    return isCorrect
}

export { encrypt, verified }
~~~

- Esto devolverá un boolean
- En auth.services toca trabajar el login
- Desestructuro el email y el password, de tipo Auth
- Me aseguro de que el usuario exista

~~~js
export const loginUser = async ({email, password}:Auth)=>{
    const existUser =  await UserModel.findOne({email})  
    if(!existUser) return 'NOT_FOUND'

    const passwordHash = existUser.password
    const isCorrect = await verified(password, passwordHash)
    if(!isCorrect) return "PASSWORD_INCORRECT"

    return existUser
}
~~~

- Ahora enb el auth.controller coloco el loginUser

~~~js
export const loginController= async({body}:Request, res: Response)=>{
    const {email, password}= body
    const responseLogin = await loginUser({email, password})
    res.send(responseLogin)
}
~~~

- Si hay un error en el password me sigue devolviendo un status 200.
- En el controlador puedo enviar un status en caso de error

~~~js
export const loginController= async ({body}:Request, res: Response)=>{
    const {email, password}= body
    const responseLogin = await loginUser({email, password})
 
    if(responseLogin==='PASSWORD_INCORRECT'){
        res.status(403).send(responseLogin)
    }else{
        
        res.send(responseLogin)
    }
    
}
~~~

- Ahora se necesita usar un JSONWEBTOKEN para la autorización, ya que ya tengo la autenticación
- Para ello creo /utils/jwt.handle.ts








