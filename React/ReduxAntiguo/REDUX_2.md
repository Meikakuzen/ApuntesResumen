# REDUX 2

## Las primeras acciones

- Creo la carpeta typès en /src con un archivo index.js
- Los types sólo describen lo que está pasando
- Se usan tanto en el action cómo en el reducer.
- En el action sirven para ir ejecutando ciertas funciones
- Por ejemplo para agregar un producto puede haber el type de AGREGAR_PRODUCTO y si lo agregó a la db AGREGAR_PRODUCTO_EXITO
- El standard es en mayúsculas separado por un guión bajo

~~~js
export const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO'
export const AGREGAR_PRODUCTO_EXITO = 'AGREGAR_PRODUCTO_EXITO'
export const AGREGAR_PRODUCTO_ERROR = 'AGREGAR_PRODUCTO_ERROR'
~~~

- En el reducer se evaluan cada una de estas condiciones y van a servir para modificar el state
- Para ello hay que importar los types en el reducer
- Creo la carpeta actions en /src con un archivo llamado productoActions.js
- Aqui estarán las funciones que modifican el state
- Es como mapear el productoReducer con el productoActions
- Debo importar los types (obvio) en el productoActions.js

~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'

export function crearNuevoProductoAction(){
    return ()=>{
        console.log("desde action")
    }
}
~~~
- Importo la función en el componente, en este caso NuevoProducto donde la usaré para agregar el producto al state
- En Nuevo Producto:
    - Creo una nueva función llamada submitNuevoProducto en el onSubmit del form
    - Creo otra función que llamaré agregarProducto dónde usaré una función de redux que mande llamar crearNuevoProductoAction
    - Para ello importo de react-redux useDispatch y useSelector
    - useDispatch ejecutará la acción, useSelector me dará acceso al state
---
Dispatch es una función que ejecuta otra función, se usa para mandar llamar las funciones que están en el action
--- 

~~~js
import { crearNuevoProductoAction } from "../actions/productosActions"
import {useDispatch, useSelector} from 'react-redux'


const NuevoProducto = () => {

  const dispatch = useDispatch()

  const agregarProducto = ()=> dispatch( crearNuevoProductoAction())

  const submitNuevoProducto = e =>{
  e.preventDefault()
  
  //validar formulario

  //crear nuevo producto
  
  agregarProducto()

}


  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card mt-3">
          <div className="card-body">
            <h2 className="text-center mb-4 fw-bold">
              Agregar nuevo producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              
              <div className="form-group">
                <label className="fw-bold">Nombre producto</label>
                <input type="text"
                className="form-control"
                placeholder="Nombre producto" />
                </div>
              
              <div className="form-group">
                <label className="fw-bold mt-3">Precio</label>
                <input type="number"
                className="form-control"
                placeholder="Precio producto" />
              </div>
              <div className="text-center">
              <input type="submit" className="btn btn-primary text-white text-center fw-bold mt-3 d-block w-100" value="Agregar"/>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto

~~~
- Ahora si doy al button AGREGAR aparece en consola "desde action"
-----
## Pasando la información del formulario hacia el action

- Agrago un state al componente con los values y onChange respectivos
- Hago una pequeña validación
- A agregarProducto() le paso como objeto los states nombre y precio
- Debo pasarle producto en la declaración de la función y pasarlo al action también
~~~js
import { crearNuevoProductoAction } from "../actions/productosActions"
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'


const NuevoProducto = () => {

  const dispatch = useDispatch()

  const [nombre, guardarNombre] =  useState('')
  const [precio, guardarPrecio] =  useState(0)

  const agregarProducto = (producto)=> dispatch( crearNuevoProductoAction(producto))

  const submitNuevoProducto = e =>{
  e.preventDefault()
  
  //validar formulario
  if(nombre.trim() === "" || precio <= 0){
    return
  }

  //crear nuevo producto
  agregarProducto({
    nombre, 
    precio
  })

}


  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card mt-3">
          <div className="card-body">
            <h2 className="text-center mb-4 fw-bold">
              Agregar nuevo producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label className="fw-bold">Nombre producto</label>
                <input type="text"
                className="form-control"
                placeholder="Nombre producto" 
                value={nombre}
                onChange={(e)=>guardarNombre(e.target.value)}/>
                </div>
              
              <div className="form-group">
                <label className="fw-bold mt-3">Precio</label>
                <input type="number"
                className="form-control"
                placeholder="Precio producto" 
                value={precio}
                onChange={(e)=> guardarPrecio(Number(e.target.value))}/>
              </div>
              <div className="text-center">
              <input type="submit" className="btn btn-primary text-white text-center fw-bold mt-3 d-block w-100" value="Agregar"/>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto
~~~
- Voy a productoActions y en la declaración del action le paso el producto
~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'

export function crearNuevoProductoAction(producto){
    return ()=>{
        console.log(producto)
    }
}
~~~
- De esta manera ya tengo el producto desde el action
- Es importante usar el dispatch!!
- Es aquí en el action dónde se meterá el código para insertar la base de datos y mandar ejecutar el reducer para modificar el state
----
- Elimino el console.log(producto) y en el arrow function del return voy a usar el dispatch
- Mando llamar una función que ahora crearé llamada agregarProducto
- La declaro y envuelvo entre parentesis el return del objeto dónde irá el type y el payload( no es obligatorio, puedo cambiar el loading manualmente )
~~~js
export function crearNuevoProductoAction(producto){
  return (dispatch)=>{
    dispatch(agregarProducto())
    }
}

const agregarProducto = ()=>({
  type: AGREGAR_PRODUCTO,
  //payload: true

})
~~~

- Siempre que defino una función en el actions debo reflejarla en el reducer
- En el case del switch evaluamos el action.type
- Siempre devolvemos una copia del state para no perder datos
- Si agrego el producto lo lógico es que el loading pase a true porque va a hacer alguna operación
### Reducer
~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'



const initialState ={
    productos: [],
    error: null,
    loading: false   
}

export default function(state=initialState, action){
    switch(action.type){
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
} 

~~~

- Puedo ir a redux devtools para ver como aparece AGREGAR_PRODUCTO cuando le doy a agregar y como cambia el state de loading
- Así se puede ir controlando, a través del type y los cambios que refleja en la pantalla de devtools
- Cómo tengo un producto_éxito y un producto_error, puedo usar un try catch para consultar la base de datos
- Si todo sale bien en el try, le paso un dispatch con una nueva función con el producto.
- Si da error le paso otro dispatch con la función de error y un true que será el valor del error en el switch del reducer*
- Voy al reducer a poner los case de éxito y error
- En el de éxito pongo el loading a false, me regreso el arreglo de productos e incorporo el action.payload que es el producto como indiqué
- En el de error cambio el loading a false y agrego el estado del error a true*

----
- El payload es lo que modifica el state. 
- El dispatch es el que manda ejecutar las acciones ( que en este caso son funciones ) y se pasan como objetos
  - action.type: es para describir la aplicación
  - action.payload: es lo que lo va modificando
---

### ProductoActions
~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'

export function crearNuevoProductoAction(producto){
    return (dispatch)=>{
        dispatch(agregarProducto())
        try {
            dispatch(agregarProductoExito(producto))
        } catch (error) {

            dispatch(agregarProductoError(true))
        }
    }
}

const agregarProducto = ()=>({
    type: AGREGAR_PRODUCTO,

})

const agregarProductoExito =(producto)=> ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado

})
~~~
### Reducer
~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'



const initialState ={
    productos: [],
    error: null,
    loading: false   
}

export default function(state=initialState, action){
    switch(action.type){
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: true
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
} 
~~~
- Todavía no he escrito el código para insertar el producto en la base de datos, usaré axios para simplificar las cosas
- Para ello crearé un nuevo archivo de configuración llamado axios.js
- Le añado la url del json-server y lo exporto por defecto

~~~js
import axios from 'axios'

const clienteAxios =  axios.create({
    baseURL: 'http://localhost:4000'
})

export default clienteAxios
~~~
- Importo el clienteAxios en productoActions para realizar la acción con la base de datos
- Uso async y await para el try catch
~~~js
import {

    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR

} from '../types'
import clienteAxios from '../config/axios'


export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto())
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto)

            //Si todo sale bien actualiza el state
            dispatch(agregarProductoExito(producto))
        } catch (error) {
            console.log(error)

            //si hay un error cambia el state
            dispatch(agregarProductoError(true))
        }
    }
}

const agregarProducto = ()=>({
    type: AGREGAR_PRODUCTO,

})

const agregarProductoExito =(producto)=> ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado

})
~~~

- Ahora si tengo el json-server corriendo puedo agregar productos a la base de datos desde NuevoProducto
> json-server archivo_db.json --port 4000

## Acceder al state
- Si recuerdas importamos useSelector. Es el hook que da react-redux para leer el state del store
- Un truco para ver todo el state disponible en el Store
~~~js
const verState = useSelector((state)=>state)
console.log(verState)
~~~
- En este caso aparece como productos porque así lo declaré en el reducer dentro de combineReducers
- Puedo acceder al loading de la siguiente forma ( importando useSelector )
~~~js
  const cargando = useSelector(state=>state.productos.loading)
~~~

- Ahora puedo mostrarlo de manera condicional en el html, con un spinner o lo que sea
~~~js
{cargando ? <p>Cargando...</p>: null}
~~~
----
- Siempre voy a usar useSelector para acceder al state
----