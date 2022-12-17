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

- Con esta validación, significa que solo 2 roles serán válidos. Si quiero añadir uno tendría que modificar esta línea
- Quiero validarlo contra una base de datos. Comento esta linea

> //    check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),

- Creo una nueva colección en MongoCompass llamada role
- Voy a ADD DATA, inserto un documento en formato JSON 

~~~js
{
    "rol": "ADMIN_ROLE"
}
~~~

- Inserto otros dos con USER_ROLE y VENTAS_ROLE
- Para leerlos de la DB hay que crear un modelo

~~~js
import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({

    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }

})

export const Role = mongoose.model('Role', RoleSchema)
~~~

- Ahora toca hacer la validación en el el usuario.routes
- Utilizo .custom
- Le añado un valor por defecto al rol por si no viniera
- Hago la verificación de que existe el rol

~~~js

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser de más de 6 letras').isLength({ min: 6}),
    check('correo', "El correo no es válido").isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( async (rol = '') =>{
        const existeRol = await Role.findOne({rol})

        if(!existeRol){
            throw new Error('El rol no es válido')
        }
    }),
    validarCampos
] ,usuariosPost)
~~~

# Centralizar la validación del rol

- Creo la carpeta helpers con el archivo db-validators.js

~~~js
import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({

    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }

})

const Role = mongoose.model('Role', RoleSchema)

export default Role
~~~

- Cuando en un callback el primer argumento es el mismo argumento que se recibe cómo parámetro de la función se puede dejar solo la referencia

~~~js
check('rol').custom(rol=>esRoleValido(rol)),
~~~

- Dejando solo la referencia

~~~js
check('rol').custom(esRoleValido)
~~~

- Puedo modificar un método en el modelo.
- Por ejemplo, no quiero que me devuelva el password.
- Necesito hacerlo con una función normal porque voy a usar el this
- Uso la desestructuración para sacar los campos que no quiero
- Utilizo el parámetro rest para sacar y almacenar el resto de argumentos

~~~js
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject() //para referirme al modelo
    return usuario
}
~~~
- Ahora al crear un usuario no retorna ni el password ni la versión

-----
# Custom Validation- Email existe

~~~js
export const emailExiste = async(correo="")=>{
    const existeEmail= await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error (`El correo ${correo} ya está registrado`)
    }
}
~~~

- Añado otro check

~~~js
check('correo').custom(emailExiste),
~~~

----

# PUT: Actualizar información del usuario

- Para actualizar, en la url debe ir un id que validar contra la db
- Hay muchas maneras de hacer esto. Voy a hacer que si quiere actualizar el password también lo actualice
- Voy a usuariosPut en el controlador
- Desestructuro las propiedades que me intersa cambiar del req.body
- Uso el parámetro rest para desestructurar el resto de propiedades 

~~~js
const {password, correo, ...resto} = req.body
~~~

- Debo validar que el id exista en la db (después)
- Si viene el password significa que quiere actualizar el password.
- Hay que validar que es la misma persona la que quiere cambiar el password (después)
- Copio y pego las lineas de encriptación con bcrypt de la ruta POST
- Actualizo usuario con .findByIdAndUpdate y le añado la info que quiero actualizar (el resto) 
- Añando el objeto {new: true} para que me devuelva el objeto actualizado

        NOTA: Al excluir el correo con la desestructuración evitamos el error de llave duplicada al actualizar

~~~js
export const usuariosPut = async (req,res)=>{

    const id= req.params.id
    const {password, google, correo, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})

    res.json({
        msg: 'Es una petición put API',
        usuario
    })
}
~~~

- Si hago una petición PUT con un id de mongo válida existente en la db la actualiza menos google y el correo porque los estoy excluyendo.
- Si que me permite cambiar el ROLE, porque hace falta un middleware en el router.put para validarlo
- Debo validar que el id de mongo que exista

----

# Validaciones adicionales en el PUT

- Si le mando en el body un _id me va a disparar un error
- Para ello extraigo también en la desestructuración el _id

>  const {_id, password, google, correo, ...resto} = req.body

- También hay que asegurarse de que el id en la url sea un id válido de mongo
- En usuario.routes, en el put agrego un arreglo dónde irán mis middlewares
- Uso el check. Hay una validación en express-validator para verificar que es un mongoId
- tengo que poner validarCampos al final de todos mis checks, para que no continúe a la ruta si hay algún error

~~~js
router.put('/:id', [
    check('id', "No es un id válido").isMongoId(),
    validarCampos
] ,usuariosPut)
~~~

- Ahora voy a hacer una validación personalizada de si existe un usuario con ese id en db-validators.js

~~~js
export const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    
    if(!existeUsuario){
        throw new Error(`El usuario no existe`)
    }
}
~~~

- Lo añado como un custom en el router.put

~~~js
router.put('/:id', [
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosPut)
~~~

- Hay que validar el rol, ya se hizo anteriormente. Agrego la validación (opcional)
- Esto significa que tiene que venir el rol en la actualización

----

# GET: Obtener todos los usuarios de forma paginada

- Creo 15 usuarios más para hacer la paginación
- Para obtener los usuarios

~~~js
export const usuariosGet= async(req,res)=>{

    const usuarios = await Usuario.find()

    res.json({
      usuarios
    })
}
~~~

- Si en la url pongo el parámetro limit=5 significa que solo quiero los 5 primeros registros
- En el find hay una instrucción que es para indicar el límite
- Desestructuro de los argumentos de la url con req.query
- Pongo por defecto el límite en 5

~~~js

export const usuariosGet= async(req,res)=>{

    const {limite = 5} = req.query

    const usuarios = await Usuario.find()
        .limit(limite)

    res.json({
      usuarios
    })
}
~~~

- Esto da error porque cuando extraemos de un query un parámetro lo extrae como string y limit está esperando un número
- Por ello lo casteo con Number

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5} = req.query

    const usuarios = await Usuario.find()
        .limit(Number(limite))

    res.json({
      usuarios
    })
}
~~~

- Ahora si yo pongo el query limite en 6 me devuelve solo 6 resultados

> http://localhost:8080/api/usuarios?limite=6

- Voy a recibir otro argumento "desde" que por defecto estará en 0, que servirá para elegir desde que registro quiero empezar

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query

    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))

    res.json({
      usuarios
    })
}
~~~
------

# Retornar número total de registros en una colección

- Uso countDocuments() en el usuariosGet

~~~js
const total = await Usuario.countDocuments()
~~~

- Lo envío en el res.json

~~~js
  res.json({
      total,
      usuarios
    })
~~~

- En este curso, la estrategia con el delete es de no borrar fisicamente el usuario si no cambiar su estado a false
- Para filtrar esto yo puedo mandar en el find un filtro con esta condición
- Pongo la misma condición en el countDocuments

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query

    const usuarios = await Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await Usuario.countDocuments({estado:true})

    res.json({
        total,
      usuarios
    })
}
~~~

- El await es bloqueante. Si la primera petición (usuarios) demora 1 segundo y después total demora 1 segundo, tardará 2 segundos en dar la respuesta
- Pero necesito el await para tener el resultado cuando lo envío en la respuesta (res.json)
- Entonces, para arreglarlo, voy a hacer las dos peticiones de manera simultánea
- Para ello uso el Promise.all. Hay que poner el await para que se espere a la resolución, pero ejecutará ambas de manera simultánea
- La respuesta es una colección de las dos promesas
- Si una da error, todas darán error

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query
    
    const resp = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        resp
    })
}
~~~

- Como es un arreglo de promesas puedo usar desestructuración de arreglos para que luzca mejor el res.json

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query
    
    const [total, usuarios] = await Promise.all([
        
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}
~~~

- Para que luzca más limpio el código guardo el objeto en una variable llamada query

~~~js
export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query

    const query= {estado:true}
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}
~~~

-----

# Delete: borrando un usuario

- El DELETE también recibe el id como segmento

> router.delete('/:id', usuariosDelete)

- Lo extraigo con desestructuración del req.params
- Debo validar que el id exista, que sea válido de mongo
- Copio los checks hechos anteriormente y los pego

~~~js
router.delete('/:id', [
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)
~~~

- Para borrarlo fisicamente:

~~~js
export const usuariosDelete = async (req,res)=>{
    
    const {id} = req.params
    
   const usuario= await Usuario.findByIdAndDelete(id)
    
    res.json({
        usuario
    })
}
~~~

- Lo que voy a hacer en lugar de borrarlo físicamente es cambiar el estado a false.

~~~js
export const usuariosDelete = async (req,res)=>{
    
    const {id} = req.params
    
   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    res.json({
        usuario
    })
}
~~~

