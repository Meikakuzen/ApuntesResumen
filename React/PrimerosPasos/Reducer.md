# Reducer
- Es una función común y corriente
- No puede ser asíncrona
- Debe de ser pura. Todo lo que realice tiene que resolverse internamente
- No debe de llamar al LocalStorage o SessionStorage
- Debe de retornar siempre un nuevo estado; ni errores ni otras cosas
- Solo recibe dos argumentos: el estado inicial y la acción
- Para modicificar el state solo debe de haber una acción
~~~~js
const algoReducer = ()=>{
    //esto puede ser un reducer, una función común
}
~~~~

Un ejemplo:
~~~~js
const initialTodos = [{
    id:1,
    todo: 'Comprar té'
    done: false
}]

const todoReducer = ( state = initialTodos, action) =>{
    return state
}

let todos = todoReducer;
console.log(todos)

~~~~
- Este console.log mostraría el objeto initialTodos con length:1
- La idea es tener controlado en un solo lugar toda la lógica que modifica mi state
---------
## Ciclo
- Tengo un State inicial, le pasa a la página para mostrarlos en pantalla
- El usuario que necesita agregar un nuevo todo lo ingresa,
        - pero la página no modifica directamente el state
        - La página va a crear un aacción para añadir un nuevo elemento
        - Esa acción es lo que le voy a mandar al Reducer
        - reducer tiene todo el mapa de las acciones que puede realizar
            - Borrar, Agregar o modificar
        - No debe disparar efectos secundarios
-----

1- Establezco el estado inicial.
2- Declaro el reducer, siempre tiene 2 argumentos
    - el state y la accion
3- Si quiero agregar un nuevo objeto, como lo hago?
4- Creo un nuevo ToDo
5- Creo una acción
6- Le añado un type, que servirá para clasificar qué tiopo de acción es
7- El payload, es un standard llamar así a los argumentos que se le quiere mandar a la acción
~~~~js

const newTodo = {
    id:2,
    todo: 'Comprar café'
    done: false
}

const action ={
    type: 'agregar',
    payload: newTodo
}

todos = todoReducer ( todos, action)
~~~~
---
- Debo meter la lógica al todoReducer para procesar la acción
- El interrogante dice: si hay un action lee el type, si no no haga nada

~~~~js
const todoReducer = (state= initialState, action) =>{
    if(action?.type === 'agregar'){
        return [...state, action.payload]
    }
}

//ejemplo educativo, e un caso real se hace distinto
~~~~
# Uso del switch y el dispatch con el Reducer

- Se puede pensar en el useReducer como el useState.
- el snippet dice así

~~~~js
const [state, dispatch] = useRecuder(reducer, initialState, init)
~~~~
- Declaro un initialState fuera del componente.
- En un archivo aparte hago el todoReducer
~~~~js
const initialState =[{
    id:new Date().getTime();
    desc: 'aprender React'
    done: false

~~~~

~~~~js
//el switch siempre se puede utilizar si se puede comparar con un ===

export const todoReducer =(state=[], action) =>{ //pongo un arreglo vacío por defecto 
                                            //para que no de error
        switch(action.type){
           // case 'add':

            

            default:
                return state;
        }
}

~~~~
- En el  archivo padre llamo al todoReducer y lo importo
- La desestructuración de objetos es posicional
    - Yo puedo renombrar el state todos
~~~~js

//const [state] = useReducer(todoReducer, initialState)
const [todos] = useReducer(todoReducer, initialState)
console.log(todos)
~~~~

- En el archivo padre hago carpintería...
~~~~jsx
return{
    <div>
        <h1>TodoApp ({todos.length})</h1>
        <ul>
            {todos.map((todo, id)=>{
                <li
                key= {todo.id}>
                
                {i+ 1} - {todo.desc}</li>
            })}
        </ul>
    </div>
}
~~~~
~~~~js

const handleSubmit = (e) =>{
    e.preventDefault();

}


<form onSubmit={handleSubmit}>

<input
type="text"
name="description" />

<button
type="submit"> Agregar TODO </button>

</form>
~~~~

- Como agregar un Todo. Tengo que hacer que la info de agregar pase por el reducer

~~~~js
const handleSubmit = (e) =>{
    e.preventDefault();
   
   const newTodo ={
        id:new Date().getTime(),
        desc: 'Nueva Tarea',
        done: false

        }

    const action = {
        type: 'add',
        payload: newTodo
    }

~~~~
- Uso el spread para añadir todos los todos, y añado el nuevo
~~~~js

export const todoReducer =(state=[], action) =>{ //pongo un arreglo vacío por defecto 
                                            //para que no de error
        switch(action.type){
            case 'add':
                    return[ ...state, action.payload]
            

            default:
                return state;
        }
}
~~~~
- Ahora, cómo hago para mandar esta acción?
- El segundo argumento del useReducer es el dispatch
- el dispatch es a quien tengo que mandarle la acción
~~~js
//const [state, dispatch] = useRecuder(reducer, initialState, init)

const [todos, dispatch] = useReducer(todoReducer, initialState)

const action = {
        type: 'add',
        payload: newTodo
    }
dispatch( action )

~~~
-----
- Este es el proceso, mecánico:
- Crear las acciones y mandarlas al Reducer
- el Reducer las ejecuta y regresa un nuevo estado
- el useReducer se encarga de redibujar lo que haya que redibujar
-----

- Para borrar, lo ideal es primero ir al reducer para especificar la tarea 
- Uso el .filter para regresar un nuevo arreglo con aquellos elementos que cumplan una condición
- En este caso dice: regresame todos aquellos de id distinto al que te mando en el payload
~~~~js
export const todoReducer =(state=[], action) =>{ //pongo un arreglo vacío por defecto 
                                            //para que no de error
        switch(action.type){
            case 'add':
                    return[ ...state, action.payload];
            case 'delete':
                return state.filter(todo => todo.id 1== action.payload);
            

            default:
                return state;
        }
}
~~~~
- Para hacer un delete es el mismo proceso que add
- Primero asegurarse de recibir el todoId
- Crear la acción
- Hacer el dispatch
----
Como necesito un argumento, hago función de flecha
~~~~js
<button
onCLick = {()=> handleDelete(todo.id)}> Borrar</button>
~~~~


~~~~js
const handleDelete = (todoId) =>{
    //console.log(todoId)
    const action = {
        type: 'delete'
        payload = todoId
    }

    dispatch(action)


}

~~~~