## JWT y Autorización

- Creo el archivo de jwt en /utils/jwt.handle.ts
- Este se va a encargar de generar un jwt
- El token se divide en tres secciones separadas por un punto
    - La primera es el header: contiene el algoritmo y el token type (jwt)
    - La segunda es el payload: la data ( no datos sensibles )
    - La tercera es la firma: contiene la palabra clave de encriptación
- Para generar un token se necesita el payload ( la data ) y la firma
- Para ello voy a las variables de entorno y creo la palabra clave JWT_SECRET=PALABRA_SECRETA
- Ahora puedo generar el token
- Le paso el id como payload
- Uso el método sign con el id y la firma. Expirará en 2 horas
~~~js
import {sign} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export const generateToken =  (id: string)=>{
    const jwt = sign({id}, JWT_SECRET, {
        expiresIn: "2h"
    })
    return jwt
}
~~~

- En el login va a necesitar un jwt. Una vez se ha logueado genero el token
- auth.services

~~~js
export const loginUser = async ({email, password}:Auth)=>{
    const existUser =  await UserModel.findOne({email})  
    if(!existUser) return 'NOT_FOUND_USER'

    const passwordHash = existUser.password
    const isCorrect = await verified(password, passwordHash)
    if(!isCorrect) return "PASSWORD_INCORRECT"

    const token = generateToken(existUser.email)
    const data = {
        token,
        user: existUser
    }

    return data
}
~~~

- Creo el archivo routes/order.ts, la ruta de las ordenes
- En esta ruta solo puede acceder quien tenga la sesión activa (un jwt válido)
- Le coloco  a la ruta el controlador ( todavía por crear en order.controller ). Lo llamaré getItems también
~~~js
import {Router} from 'express'
import { getItems } from '../controllers/order.controller'


const router = Router()

router.get('/', getItems)

export {router}
~~~

- Hay que reiniciar el servidor para que pille la ruta
- Creo el controllers/order.controller.ts con el getItems ( lo copio )
- Para que responda este controlador tienes que tener un jwt

~~~js
import {Request, Response} from 'express'
import { handleHttp } from '../utils/errorHandle'

export const getItems= async(_: Request, res: Response)=>{
    try {
     
        res.send({
            data: "ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS"
        })
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}
~~~

- Creo también el services/order.service.ts

~~~
~~~

- Creo el middleware middlewares/session.ts
- Compruebo que tenga un jwt
- El JWT se passa por el encabezado
- Para poder acceder a la ruta /order necesito tener en el encabezado el jwt
    - En Http Headers ( en THUNDERCLIENT ) Authorization y en el campo de la derecha Bearer 384734873284732847084u340 ( el jwt obtenido del login )
    - También se puede colocar en la pestaña Auth/Bearer 
- middleware/session.ts

~~~js
import { NextFunction, Request, Response } from "express";



export const checkJwt = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        console.log(jwtByUser)
        next()
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}
~~~

- Lo implemento en la ruta routes/order.ts

~~~js
router.get('/', checkJwt, getItems)
~~~

- Si hago una petición GET a /order me devuelve ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS y en consola 'Bearer HOLa SOY UN TOKEN' (que es lo que he colocado en Auth/Bearer de THUNDERCLIENT)
- Me interesa lo que viene después de Bearer en el string ( el JWT )
- session.ts

~~~js
import { NextFunction, Request, Response } from "express";



export const checkJwt = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        
        const jwt = jwtByUser?.split(' ').pop() //extraigo el token
        

        next()
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}
~~~

- Para verificar el token uso la función verify del jwt.handle.ts

~~~js
export const verifyToken =(jwt: string)=>{
   const isOk =  verify(jwt, JWT_SECRET)
   return isOk
}
~~~

- Coloco el jwt en un template string para que sea un string y no de error. 
- Si retorna un false pueden pasar varias cosas
    - Se venció el token
    - El usuario no está pasando token
    - El usuario está pasando el token de manera incorrecta
- jwt.handle.ts

~~~js
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";



export const checkJwt = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        
        const jwt = jwtByUser?.split(' ').pop()

        const verifiedToken = verifyToken(`${jwt}`)

        if(!verifiedToken){
            res.status(401).send({
                msg: 'INVALID_TOKEN'
            })
        }else{
            console.log({jwtByUser})
            next()
        }

        
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}
~~~

- Hago el POST con un usuario y contraseña válidos a /auth/login con THUNDERCLIENT para extraer el token
- Coloco el token en Auth/Bearer de THUNDERCLIENT y hago un GET a /order
- Me sale el mensaje ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS y me imprime en consola el token
- Si le hago un console.log a verifiedToken sale el id: email ( pues utilicé el email como id)
- verifiedToken sería más bien isUser
- Si yo quiero pasar este usuario al controlador a través del middleware, creo una interfaz extendida del req.
- Pongo el user como opcional y para que no de error Typescript con el req.user le pongo que devuelve un string o un JwtPayload 
- session.ts

~~~js
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.handle";

export interface RequestExt extends Request{
    user?: string | JwtPayload
}


export const checkJwt = (req: RequestExt, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser= req.headers.authorization || null
        
        const jwt = jwtByUser?.split(' ').pop()

        const isUser = verifyToken(`${jwt}`)

        if(!isUser){
            res.status(401).send({
                msg: 'INVALID_TOKEN'
            })
        }else{
            req.user = isUser
            next()
        }

        
        
    } catch (error) {
        res.status(400).send({
            msg: "SESIÓN_NO_VÁLIDA"
        })
    }
}
~~~

- Si ahora voy al controlador y le pongo un console.log(req.user) debería retornarme el email
- Para ello debo importar la interfaz del Request extendida y aplicarla
- Como puede venir o no pongo el req con un interrogante
- order.controller.ts

~~~js
import { Response} from 'express'
import { RequestExt } from '../middlewares/session'
import { handleHttp } from '../utils/errorHandle'

export const getItems= async(req: RequestExt, res: Response)=>{
    try {
     res.send({
        msg: 'ESTO SOLO LO VEN LAS PERSONAS AUTENTICADAS',
        user: req?.user
     })
  
        
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ITEMS')
    }
}
~~~