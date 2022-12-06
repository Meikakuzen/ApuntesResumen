# useState

- Manejo el state de mi componente con *useState*. Cuando hay mucha data o states complejos se usa el *useReducer*


- Su snippet es así

~~~js
const [state, setState] = useState(initialState) 
~~~

- State es el estado en si, y SetState la función que voy a usar para cambiar mi estado
- Normalmente usaré la desestructuración y el spread para esta tarea, ya que
    -Cuando uso el setstate le caigo encima al state anterior, con lo cual uso el spread
    para importar el estado anterior, seguido del nuevo valor a añadir, si ese es el caso.
- Siempre es necesario hacer la importación
~~~js
import {useState} from 'react'
~~~
Ej:
~~~js
const [counter, setCounter] =useState ({
  counter1: 10,
  counter2: 20
})
console.log(counter)    //{counter1:10, counter2:20}

//Desestructuración

const [{counter1, counter2}] = useState ({
  counter1:10,
  counter2:20
})

~~~    
- Por ejemplo, si necesito alterar mi state con un botón, extraigo con desestructuración del state y uso el spread con el setState para no sobreescribir el estado anterior y mandar una copia de todos los valores anteriores

~~~~js
const [state ,setState] = useState({
  counter1: 10,
  xounter2: 20,
  counter3: 30
}) 

const [counter1,counter2] = state;

<button onClick={()=>{
  setState({
    ...state,
    counter1: counter +1
  })
}}>
~~~~


# useEffect
- Se usa para ejecutar algún efecto secundario cuando algo cambie en el state; monitorear según dependencias los cambios en el state para ejecutar algo
- Su snippet es algo extraño, por su ciclo de vida. 
    - El return del useEffect devuelve algo cuando el componente ya está montado.
- Usualmente recibe un callback como primer parámetro y un arreglo de depoendencias como segundo.
- Se trabajan de manera individual
- Notar que el arreglo vacío de las dependencias hace que solo se ejecute una vez
- Siempre se ejecuta minimo 1 vez, con la primera renderización
- Una forma de su uso habitual es para prevenir el refresh del navegador y peticiones innecesarias

~~~~js
useEffect(()=>{        //sólo se ejecuta la primera vez
  e.preventDefault()
}, [])  //con este arreglo vacío de las dependencias
~~~~
- Muy usado en formularios
- El name es importante que coincida, ya que me servirá para visualizar lo que escribo en pantalla junto con el handleInputChange
~~~~html
  <form>
    <input 
    type="text"
    name="name"
    value= {name}
    onChange={handleInputChange}
  >

</form>
~~~~

- Defino el handleInputChange. Puedo pasar el evento y hacer un console.log para ver por dónde va. Con target.name y target.value obtengo el elemento que cambió y el valor del input
~~~~js
const handleInputChange =(e)=>{
  console.log(e.target.name)
  console.log(e.target.value)
}
~~~~
- Desestructuro el target del e.target y uso el spread para el state.
- Computo, quiero que el nombre de esta propiedad sea lo que venga del objeto
~~~~js
const handleInputChange = ({target}) =>{
  setState({
    ...state,
    [target.name] : target.value
  })
}
~~~~
- Es importante el apartado name = name del input. Name es el campo, value es lo que escribo en él.
- Con el arreglo de dependencias vacío, evito que a cada cambio se realice una petición/ejecución.
- Si lo que quiero es controlar el estado del formulario, puedo ponerlo como dependencia

~~~~js
useEffect(()=>{
  
},[formState])
~~~~
- Si quisiera que solo esté atento si el campo del email cambia creo un nuevo efecto
~~~~js
useEffect(()=>{

//lógica

}, [email])
~~~~

- Se usa para escuchar cambios específicos de algun componente de la aplicación


# UseEffect unmount-Cleanup
## No se pueden tener hooks que se rendericen de manera condicional

- Deben estar lo más arriba posible del componente

- La función que se ejecuta en el return del useEffect se efectúa cuando el componente/state esta desmontado

- Puedo renderizar de manera condicional de esta forma
- Si name existe muestra el mensaje

~~~~js

{ name === '123' && <Message />}

~~~~

- Ahora cuando escribo 123, y solo cuando es 123 en el input se muestra el mensaje. 
- El snippet es:
~~~~js

useEffect(()=>{
  effect //componente montado
  return{
    clean //componente desmontado
  }
}, [input]) //dependencias

~~~~

- Hay un problema que solventa el cleaner del useEffect, y es que si monto un listener,
aunque se desmonte el componente sigue el listener montado .Si abro varios y todos hacen peticiones vana consumir la cpu o agotar el plan de datos del usuario.


~~~~js
useEffect(()=>{

  const mouseMove = (e) =>{
    const coors={x: e.x, y: e.y}
    console.log(coors)
  }
  
  window.addEventListener('mousemove',mouseMove)
  
  return () =>{
    window.removeEventListener('mousemove')
  }

}, [])
~~~~
- Puedo extraer las coords e imprimirlas en pantalla

~~~~js
const [coords, setCoords] = useState({x:0, y:0})

const {x,y}= coords;

useEffect(()=>{

  const mouseMove = (e) =>{
    const coords={x: e.x, y: e.y}
    setCoords(coords)
  }
  
  window.addEventListener('mousemove',mouseMove)
  
  return () =>{
    window.removeEventListener('mousemove')
  }

}, [])

return{
  <p> x : {x}, y: {y}</p>
}

~~~~
# Custom Hook useFetch
~~~~js
export const useForm = (initialState = {}) =>{

    const [values, setValues] = useState(initialState)
    
    
    const handleInputChange = ({target}) =>{
      setValues({
        ...values,
        [target.name]: target.value
      })
    }

    return [values, handleInputChange]

}

~~~~

~~~~js
const [formValues, handleInputChange] =useForm)({
  name:''.
  email:''
  password:''
})

const [name, email, password] = formValues;

return(
  (...)formulario(...)
)
~~~~
# useFetch CustomHook

- Para crear un customHook para hacer peticiones:
- Data en null pq no tengo la data todavía
- El loading en true pq estará cargando
- Error en null porque no lo se todavía, ya lo manejaré
~~~~js
export const useFetch = (url)=>{

  const [state, setstate] =useState({data: null, loading: true, error: null})

}
~~~~
- Una vez cambie o reciba una url voy a disparar un efecto
- Llamo al setState con el loading en false, pq si llegué hasta ahi ya no esta cargando
- El error en null, porque en principio salió bien
- Y la data es la data
~~~~js
export const useFetch = (url)=>{

  const [state, setstate] =useState({data: null, loading: true, error: null})
 
 useEffect( ()=>{
    fetch(url)
   .then(resp=>resp.json())
   .then(data=>{
     setState({
       loading: false,
       error: null
       data
     })
   })
  }, [url])
  return state  //aqui simplememnte retorno el state (data null, loading: true...)
}
~~~~

- Si hago un console.log de lo que regresa
~~~~js
const state = useFetch('https:api.com/frases_e_imagenes_bracking_bad/1') 
console.log(state)
~~~~
- Regresa un objeto con loading en false, error null y en la data un arreglo con
  -el quote_id
  -el quote
  -el author
  - la serie

- Yo puedo desestructurar el useFetch
- Tengo dos elementos, un loading o el párrafo con el blocquote para la frase y el autor
- Bien puedo usar un ternario para visualizarlos
~~~~js
const {loading} = useFetch('https:api.com/frases_e_imagenes_bracking_bad/1')

{
  loading
  ?
    (
      <div>Loading....</div>
    )
  :
    (
      <p> {quote}</p>
      <blockquote>{author}</blockquote>
    )
}

~~~~
- Como en la data primero hay null y luego hay data, debo de hacer una vadilación primero.
- Dice: si existe la data, extrae la posición 0 de la data. 
- entonces yo debería tener author y quote en la data
~~~~js
      const {loading, data} = useFetch('https:api.com/frases_e_imagenes_bracking_bad/1')
  const {author, quote} = !!data && data[0] //no me queda claro. !!null === false

~~~~

# useRef

- useRef devielve un objeto que se llama current

~~~~js
const inputRef = useRef()
console.log(inputRef)
~~~~
- Puede servir para darle seguimiento a cualquier objeto
~~~~js
const handleClick = () =>{
  inputRef.current.focus() //para seleccionar con sombreado
  console.log(inputRef) //---> tengo la referencia a todo el input 
}

<input 
ref={inputRef}
placeholder="Su nombre...">
~~~~
# useRef caso real

- Puedo usar el .current como referencia en el tiempo , por ejemplo durante una petición http, para que no de error
- Por ejemplo, en este caso creo el estado show que es un valor booleano
- Si show esta en true muestra el componente
- Creo un botón con la función en el propio botón
- Donde la accíon del SetShow es ejecutar el valor opuesto de show 
~~~~js
const [show, setShow] = useState(false)

return(
  <>
  {show && <Componente />}

  <button
  onClick={()=>setShow(!show)}>
  </button>
  </>
)

~~~~
- Si la petición tarda mas de lo habitual, al no traer una respuesta daría error
- Uso el use ref poniendo un isMounted. 
- La idea es que mantenga la referencia cuando el componente esta vivo
- Cuando cambie los valores del isMounted no quiero mandar una renderización nuevamente.

~~~js
const isMounted = useRef(true)

const [state, setState] = useState({data:null, loading:true, error:null})

useEffect(()=>{

}, [])

~~~
- Yo se que el return del useEffect es cuando se desmonta el state
- Entonces si el isMounted esta montado, yo puedo llamar al setState sin problema
~~~js
useEffect(()=>{
  isMounted.current = false
}, [])

if(isMounted.current){
  setState({
    loading:false,
    error:null,
    data
  })
}


~~~

-----

# Memo
- Se usa habitualmente envolviendo todo el componente desde el igual con React.memo()
- Cuando React nota un cambio en el state, vuelve a redibujar el componente
    - Para que eso no pase innecesariamente con algun componente hijo, se puede usar el memo
~~~~jsx
export const Memorize =React.memo((propsMemorize)=>{

  //toda la lógica entre paréntesis
})
  
~~~~

# useMemo

- Por ejemplo: si tengo un componente pesado, que efectua un procedimiento muy pesado,
    -Si cada vez que renderizo al notar React algún cambio se dispara es un engorro
- Para evitar eso uso el useMemo
- el snippet es muy parecido al useEffect: recibe un callback y una dependencia
    -si algo cambia, quiero memorizar el resultado de esa función, qwue en este caso sería
      *el proceso pesado* 
~~~~jsx

const memoProcesoPsado = useMemo(()=> procesoPesado(counter), [objeto:que:hace:disparar:la:renderización:counter])

~~~~
- Le paso como función al useMemo el proceso pesado, y la dependencia me va a decir cuando memorizar esa funcion.

# useCallback
- Uno de los 2 usos principales, es cuando necesito mandar una función a un componente hijo.
- Este useCallback me va a servir como función memorizada que puedo enviar como las props
- Y React sabrá si la función no va a cambiar o no ha cambiado si la dependencia no ha cambiado 
~~~~js
useCallback(()=>{
  setCounter( counter +1)
}, [setCounter]) //si pusiera el counter no me serviría pq se volvería a ejecutar
                  //pero sin el counter React me manda un error

~~~~
- La guardo en una variable
~~~~js
const increment =useCallback(()=>{
  setCounter( counter +1)
}, [setCounter]) 
~~~~
- Recordar, cuando no se tiene acceso al state, se puede usar un callback

~~~~js
const increment = useCallback (()=>{
  setCounter(counter =>counter +1)
})

return(
  <div>
  <h1> useCallback Hook {counter} </h1>
  <hr/>
  <ShowIncrement increment = {increment}>

</div>

)
~~~~

- El componente quedaría así
~~~~js
export const showIncrement = React.memo(({increment}) =>{
  return(
    
    <button onClick={ ()=> {
      increment
    }}> Incrementar </button>
  )
}

)
~~~~
- La versión memorizada es la que se está mandando como argumento y también uso el React.memo para que memorice este componente si los argumentos no cambian.
- Si quisiera mandarle un parametro al incrementar puede hacerse así

~~~~js
      const increment = useCallback ((num)=>{
        setCounter(counter =>counter +num)
      })


~~~~