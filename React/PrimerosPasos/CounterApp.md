### Snippets
+ rafce --->  functional component con importacion de React
+ rafcp --->  functional component con importacion de PropType
+ imr ----->  import React
+ imd -----> import ReactDOM

# CounterApp 
## Eventos

- Tengo tres componentes que lucen así: index.html, index.js y CounterApp.js

~~~~html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CounterApp</title>
</head>
<body>

  <div id="app">
    
    <CounterApp value ={10} />
    
    
    </div>

  <script>

  </script>
  
</body>
</html>
~~~~
~~~~js

import React from 'react'
import ReactDOM from 'react-dom'
import CounterApp from './CounterApp'

const divRoot = document.querySelector('#app');

ReactDOM.render(<CounterApp value={ 10 } />, divRoot)
~~~~

~~~~js
import React from 'react'
import PropTypes from 'prop-types'


const CounterApp = ({value}) =>{
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button>+1</button>  
        
        </>

    )

    
}


CounterApp.propTypes = {
    value: PropTypes.number
}

export default CounterApp;
~~~~


## En la documentación oficial se pueden consultar todos los eventos

            es.reactjs.org
----------

- Cómo lo que busco es la acción del click en el botón usaré onClick
- Para introducir código de jaascript usaré las llaves {  } 
- Usaré una función de flecha e imprimiré el evento para inspeccionar
~~~~js

import React from 'react'
import PropTypes from 'prop-types'


const CounterApp = ({value}) =>{
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={(e)=>{
                console.log(e)
            }}>+1</button>  
        
        </>
    )
}


CounterApp.propTypes = {
    value: PropTypes.number
}

export default CounterApp;
~~~~~
- Se puede sacar del return esta función 
- Cuando el primer argumento de una función es enviado como primer argumento de la función que está dentro:
        -se puede dejar solo la referencia a la función que quiero ejecutar
        - el event de onClick va a ser pasado como único argumento del handleAdd
~~~~js

const CounterApp = ({value}) =>{
    
    handleAdd =(e) =>{
        console.log(e)
    }
    
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={handleAdd}>+1</button>  
        
        </>
    )
}

~~~~ 
### Porqué no invoco la funcion handleAdd?
--------
- Toda función que no tiene un return especifico retorna undefined
- Todas las funciones retornan algo, 
    - Si la invoco en el html entre llaves con un 1 en el  return, marcará error:
        - Esperaba una función y recibió un valor numérico
    - Si pongo en el return el mismo console.log y la invoco entre llaves en el html SI funcionaría
    - Serviría para procesar cualquier instrucción y mandar lo que se quiera del click
    
    
         Esta es la diferencia de colocarlo con paréntesis o no


# useState- Hook


### Referencia

- El argumento es el mismo que el primer valor del return, el segundo es una función.
    - Esta función se suele llamar setAlgo.
    Es utilizada para establecer el valor al primer argumento del return
- Se hace la desestructuración o se pone state directamente

~~~~js
const useState = (valor) =>{
    return [valor, ()=>(console.log('Hola Mundo'))]
}

const [nombre, setNombre ] = useState('Bonifacio')
        //state//

console.log( nombre );
setNombre();

~~~~
- Los hooks suelen empezar por use
~~~~js
import React, {useState} from 'react'
importPropTypes from 'prop-types'


const CounterApp = ({value}) =>{
    
    const state = useState('Bonifacio')
    console.log(state) ////---> devuelve un arreglo de 2 items uno el nombre y otro un dispatchAction


    handleAdd =(e) =>{
        console.log(e)
    }
    
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={handleAdd}>+1</button>  
        
        </>
    )
}
~~~~


Se suele usar la desestructuración
- El console.log del state y setState devuelve un arreglo con 2 valores
    - el estate 
    - un dispatchAction
~~~~js
import React, {useState} from 'react'
importPropTypes from 'prop-types'


const CounterApp = ({value}) =>{
    
    const [counter, setCounter] = useState(0)


    handleAdd =(e) =>{
        setCounter( counter +1 )
    }
    
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={handleAdd}>+1</button>  
        
        </>
    )
}
~~~~
- Si pongo counter ++ me dará error. Porqué?
    - Estoy intentando cambiar el valor a una constante y eso no está permitido. Sería como poner counter = counter + 1 
    - Con let tampoco funcionará

       REACT obliga a no mutar el state de esta manera, tiene funciones específicas para modificar el state

- El setCounter le dice a react que el counter cambió, por lo que hay que renderizar de nuevo el componente
    - Pero solo redibujará lo que cambia

- Pudiera ser que no tuviera acceso al counter anterior.
    - En el useState puedo recibir el valor del anterior counter de la desestructuración, y llamarlo con una función de flecha

~~~~js
const CounterApp = ({value}) =>{
    
    const [counter, setCounter] = useState(0)


    handleAdd =(e) =>{
        setCounter( (c) => c++)
    }
    
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={handleAdd}>+1</button>  
        
        </>
    )
}
~~~~
-------
## HandleSubstract y HandleReset
- Creo 2 botones adicionales en el html
    - Substract y Reset
- Puedo crear la lógica en los botones directamente

~~~~js

const CounterApp = ({value}) =>{
    
    const [counter, setCounter] = useState(0)


    handleAdd =(e) =>{
        setCounter( (c) => c++)
    }
    handleSubstract = ()=>{
         setCounter((c)=>c -1)
    }
    
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{value}</h2> 
            <button onClick={handleAdd}>+1</button>  
        
        </>
    )
}

~~~~
- Para hacerlo en los botones sería de esta forma:
~~~~js
<button onClick={ ()=> setCounter( value)}> RESET</button>
<button onClick={ ()=> setCounter( counter -1)}> Substract</button>
























