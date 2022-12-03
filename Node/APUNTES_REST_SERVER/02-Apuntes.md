# Configuración MongoDB

- Instalo mongoose con npm
- Creo la carpeta config con el archivo db
- Esto es lo que va
- Importo mongoose, uso el método connect que devuelve una promesa y copio el string de conexión ( que puedo meterlo en una variable de entorno )

>MONGODB_CNN=mongodb://localhost:27017/NodeCafeRepaso

- Le añado los 2 parámetros
- Lo meto todo en un try y un catch
- Lo exporto por defecto

~~~js
import mongoose from 'mongoose'


const DBConnection= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la DB')
    }
}
export default DBConnection
~~~

- Creo el método async conectarDb en el server
- Debo llamarlo en el constructor de mi clase Server para que la inicie al instanciar el servidor

~~~js

    
    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB(){
        await DBConnection()
    }
~~~
----

# Modelo de Usuario

- Creo el archivo usuario.js en models
- Utilizo Schema de mongoose para definir el modelo
~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    
})
~~~

- Empiezo a definir las propiedades
- Puedo definir en un arreglo que sea requerido y el mensaje en caso de error

~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
})
~~~

- enum me va a validar si es uno u otro
- google es para saber si el usuario fue creado por google, por defecto en false

~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN', 'USER']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})
~~~

- Ahora debo exportar el modelo de usuario. Entre comillas le pongo el nombre de la colección en singular ( le añadirá la s ), y tras una coma el modelo

~~~js
const Usuario = mongoose.model("Usuario", UsuarioSchema)

export default Usuario
~~~
----
# Insertar usuario en la DB con POST

- Voy al método POST del controller
- Creo en postman o thunderclient el objeto de la petición POST al endpoint /api/usuarios

~~~js
{
  "nombre": "Jean",
  "correo": "jean@mail.com",
  "password": "123456",
  "rol": "ADMIN"
}
~~~

- Aunque tengo que valorar si viene información sensible (cómo el password) ahora la prioridad es insertar en la DB
- Importo Usuario en el controller para usar el modelo
- Le inserto la data del body

         NOTA: La "U" mayúscula de Usuario es un standard para poder crear instancias de Usuario con minúscula

~~~js
export const usuariosPost = (req,res)=>{

    const body = req.body
    const usuario = new Usuario(body)

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~

- Falta guardar la data en la DB
- Es un método async-await

~~~js
export const usuariosPost = async(req,res)=>{

    const body = req.body
    const usuario = new Usuario(body)

    await usuario.save()

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~

- Ahora se ha creado la DB NodeCafeRepaso con la colección usuarios  con el usuario Jean con un id único
- Si no hubieran todos los datos requeridos la app crasheará
- Si choca con el correo también crasheará
- Hay que manejar los errores
- El password no está encriptado y los roles todavía no los filtra
---

# BcryptJS- Encriptando la contraseña

- Hay que encriptar los passwords
- También hay que validar todos los endpoints de la manera más minuciosa posible, no hay que confiar en el frontend
- Primero voy a desestructurar el body y tomar sólo lo que me interesa
- Lo meto dentro de un objeto en la instancia de Usuario

~~~js

export const usuariosPost = async(req,res)=>{

    const {nombre, correo, password, role} = req.body
    const usuario = new Usuario({nombre, correo, password, role})

    await usuario.save()

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~
- Instalo via npm bcryptjs

> npm i bcryptjs

- Lo importo en el controller

> import bcryptjs from 'bcryptjs';

- Hay que verificar si el correo existe
- Encriptar el password
- Para encriptar primero se genera un salt ( el número de vueltas para complicar la encriptación, viene 10 por defecto)
- Accedo al password del objeto usuario con notación de punto y en la encriptación añado el password y el salt

~~~js
export const usuariosPost = async(req,res)=>{

    const {nombre, correo, password, role} = req.body
    const usuario = new Usuario({nombre, correo, password, role})


    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        usuario
    })
}
~~~

- Importante: el password debe de ser un string, cómo se indicó en el modelo.

----

# Validar campos obligatorios - Email

- Para evitar escribir lo mismo en varios lugares, se instalará el express-validator
- Para verificar si el correo existe

~~~js
export const usuariosPost = async(req,res)=>{

    const {nombre, correo, password, role} = req.body
    const usuario = new Usuario({nombre, correo, password, role})

     const existeEmail= await Usuario.findOne({correo})
    if(existeEmail){
        return res.status(400).json({
            msg: "El correo ya está registrado"
        })
    }


    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~
- express-validator tiene un gran conjunto de middlewares para hacer validaciones
- Si se mandan dos argumentos en usuario.routes son la ruta y el controlador
    - Si hay un tercer argumento es el middleware de validación de express-validator
    - Si se mandan varios se hace mediante un arreglo
    - Uso el check para indicar qué campo quiero comprobar
    - Uso el método isEmail para hacer la validación

- usuario.routes:

~~~js
import {Router} from 'express'
import { check } from 'express-validator'
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from '../controllers/usuario.controller.js'

export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/',[
    check('correo', "El correo no es válido").isEmail()
] ,usuariosPost)

router.delete('/', usuariosDelete)
~~~

- Esto me da la posibilidad de usar el error en el controlador con la función validationResult.
    - Me pide la req
- Si errors no está vacío, retorno un status 400 e imprimo en un json los errors
----

# Validar todos los campos necesarios

- Los campos obligatorios se tienen que validar cómo obligatorios ( nombre, correo, password, rol)

~~~js
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser de más de 6 letras').isLength({ min: 6}),
    check('correo', "El correo no es válido").isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
] ,usuariosPost)
~~~

- Para no tener que escribir reiteradamente  la comprobacion de errors= validationResult(req) voy a crear un middleware personalizado
- Creo la carpeta middlewares con el archivo validar-campos.js
- Copio y pego el código en una función
- Importo el validationResult
- Los middlewares también se llaman con el req,res
- Al ser un middleware va a tener un tercer argumento llamado next, para pasar a lo siguiente

~~~js
import { validationResult } from "express-validator";

export const validarCampos = (req,res, next)=>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()
}
~~~
- Los middlewares tienen acceso al req,res,next por lo que no tengo que importarlos
- Lo coloco al final para revisar los errores de cada uno de estos checks

~~~js
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser de más de 6 letras').isLength({ min: 6}),
    check('correo', "El correo no es válido").isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    validarCampos
] ,usuariosPost)
~~~

----
# Validar rol contra base de datos
