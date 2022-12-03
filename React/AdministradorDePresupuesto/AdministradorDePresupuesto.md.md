# APUNTES 


## State
- Paso el state a la propiedad value
- En el onChange capturo el e.target.value para que lo que se escriba en el input vaya al state

~~~js

const [state, setState] = useState(0)

 <input  type="text" 
        value={state}   
        onChange={(e)=>setState(e.target.value)}>
~~~

- También puedo crear una función 


-------

## Validación formulario

- Creo una función en el form 
- Uso el e.preventDefault() para evitar el refresh
- Debo convertir a número si estoy tratando con números
- Puedo tratar el error de validación como un state y añadir el mensaje de error con un componente
- Con el return detengo la ejecución del código
- Coloco setMensaje vacío para borrar de pantalla el mensaje de error
- Puedo usar la validación para mostrar otro componente en caso de que sea válido usando otro state
- Su valor inicial será false, obvio

~~~js

const [mensaje, setMensaje] = useState("")
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

const handleSubmit = () =>{
    e.preventDefault()
    if(!Number(presupuesto) || Number(presupuesto) < 0>){
        setMensaje("No es un presupuesto válido)
        return
    }
    setMensaje("")
    setIsValidPresupuesto(true)

}


<form onSubmit={handleSubmit}>

~~~~

- Mensaje

~~~js

export const Mensaje = ({children}) =>{

    <div>
        <p>{children}</p>    
    </div>
}
~~~~~

- Puedo colocar el mensaje dónde yo considere con && (si esto es true, haz esto)

~~~js

{mensaje && <Mensaje>{mensaje}</Mensaje>}

~~~

- Lo mismo para el Presupuesto válido, puedo usar un ternario y mostrar el contenido principal en caso de no ser válido
- Es la carga condicional de componentes

~~~~js

{isValidPresupuesto ? <ComponentePresupuestoValido />: <ComponentePrincipal>}
~~~~



## Formatear Cantidades

~~~js
    const formatearCantidad = (cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style: "currency",
            currency:"USD"
        })
    }
~~~

## Importar imágenes

~~~~js
import ImagenIcono from './images/image.svg 

    <img 
    src={ImagenIcono}
    alt="Icono">
~~~~

## Mostrar Modal
- Puedo usar un state en true en el onClick del icono o un botón para mostrar un modal

~~~jsx

const [modal, setModal] = useState(false)

<button onClick={()=>setModal(true)}>Modal</button>

{modal && <Modal>}
~~~~

- Lo mismo para cerrarlo, setModal(false)



## Manejar varios states de un formulario

- Puedo declarar cada campo en un state (se podría hacer en un objeto) y luego juntarlo en un arreglo.
- Añado un button/input type "submit" para manejar el onSubmit del formulario
- Asocio en el value de cada input el state, y el onChange con el setState(e.target.value)
- Para manejar el resultado uso el onSubmit en el formulario
- Hago una validación de que no vengan campos vacíos en el formulario. Puedo usar un setTimeOut
- Creo una función para guardar el resultado en un objeto
- Creo un state para manejar los gastos
- Necesita un id único
- Para cerrar el modal puedo usar el setModal(false)
~~~~~js

const [nombre, setNombre]= useState("")
const [cantidad, setCantidad] = useState("")
const [categoria, setCategoria] = useState("")

const [gastos, setGastos] = useState([])

const handleSubmit = (e) =>{
    e.preventDefault()
    
    if([nombre, cantidad, categoría].includes("")){
        setTimeOut(()=>{
            setMensaje("No puede haber campos vacíos")
            
        }, 3000)
        return
    }

    guardarGasto({nombre, cantidad, categoria})
    

}

const guardarGasto = gasto =>{
    gasto.id= generarId()
    setGastos([...gastos, gasto])
    setModal(false)
}

~~~~~

## Id único

~~~~js

export const  generarId = () =>{
    const random = Math.random().toString(36)

    const fecha = Date.now().toString(36)

    return random + fecha
}
~~~~

- El id es para poder usar el .map para mostrar los gastos, SIEMPRE necesita un key único
- Le paso el prop de gasto para poder mostrar la información en el componente Gasto
~~~~jsx

    <div>
        <h2> {gastos.length ? "Gastos": "No hay gastos"} </h2>
        
        {gastos.map(gasto =>(
            <Gasto key={gasto.id} gasto={gasto}>
        
        ))}
    </div>

~~~~

## Generar Fecha

- Para generar la fecha añado esto

~~~~js
const guardarGasto = gasto =>{
    gasto.id= generarId()
    gasto.fecha= Date.now()
    setGastos([...gastos, gasto])
    setModal(false)
}

~~~~


## Formatear fecha

~~~~js
export const formatearFecha= fecha =>{
    
    const fechaNueva = new Date(fecha);
    
    const opciones = {
        year:"numeric",
        month: "long",
        day: "2-digit"
    }
    return fechaNueva.toLocaleDateString("es-ES", opciones)
}
~~~~
# Mostrar iconos

- Creo un diccionario de iconos para las categorias
- Importo todos los iconos relacionados a las categorías y los asocio en el diccionario
~~~~js
 const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa
}

    <img src={diccionarioIconos[categorias]} alt="icono">
~~~~

## UseEffect
- Si quiero disparar algo cuando un componente cambie uso el useEffect con el componente como dependencias
- Siempre se ejecuta, al menos una vez
- el reduce me servirá, toma dos parámetros, el acumulador y la variable


~~~~js

    useEffect(()=>{
        const totalGastado= gastos.reduce((total, gasto)=> gasto.cantidad + total, 0)
        
        const totalDisponible = presupuesto-totalGastado
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])

~~~~js

    useEffect(()=>{
        const totalGastado= gastos.reduce((total, gasto)=> gasto.cantidad + total, 0)
        
        const totalDisponible = presupuesto-totalGastado
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])



