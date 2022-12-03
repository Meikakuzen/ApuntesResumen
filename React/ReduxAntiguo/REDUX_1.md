# REDUX

- Install

        npm i react-redux redux redux-thunk

- Crear Store.js en /src
- Crear carpeta reducers con index.js y productosReducer.js

## Store

- Importaciones Store.js

~~~js
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
~~~

- Importaciones index.js

~~~js
import {combineReducers} from 'redux'
~~~

- Cada reducer tiene su propio state. El state siempre es un objeto. Las propiedades dependerán del caso.
- El reducer siempre es una función que tomará el state.
- El Store le pasa el state y le pasa la acción que se va a ejecutar



## **Todo el reducer es un switch**

- En él se irán colocando los cases según el type y la acción (payload)
- Siempre debe de retornar un state, por eso se debe colocar un default

- En productosReducer.js

~~~js
const initialState ={
    productos: [],
    error: null,
    loading: false   
}

export default function(state=initialState, action){
    switch(action.type){
        default:
            return state
    }
} 
~~~

- Importar el reducer en el index.js
- combineReducers facilitará implementar varios reducers, ya que solo puede haber un reducer
- En el index.js añado el reducer junto al state

~~~js
import {combineReducers} from 'redux'
import productosReducer from './productosReducer'

export default combineReducers({
    productos: productosReducer
})
~~~

- En el Store.js importamos el reducer
- Como esta en un index y exportado por defecto va sin llaves y solo el nombre de la carpeta en la ruta
- Para usar thunk se usa applyMiddleware.
- Como segundo argumento está la configuración de redux devtools

~~~js
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'



const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), 
        window.__REDUX_DEVTOOLS_EXTENSION__&&
        window.__REDUX_DEVTOOLS_EXTENSION__()

    )
)

export default store
~~~
- Ahora hay que importar el Provider y el Store dónde esté el enrutado

- Se coloca el Provider inmediatamente debajo del BrowserRouter envolviendo toda la app
- Requiere el store como propiedad

~~~js
import { Provider } from 'react-redux'
import store from './Store'
~~~


~~~js
<BrowserRouter>
    <Provider store={store}>
~~~

- Hay que mejorar el código del store para que no crashee en navegadores sin redux devtools

~~~js
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'


const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), 

        typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
         window.__REDUX_DEVTOOLS_EXTENSION__(): f=> f

    )
)

export default store
~~~