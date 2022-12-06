# Gif Expert 1

- Para consumir la API necesito una APIKey y la documentacion para el endpoint y la data
- Las herramientas de React del navegador también ayudará
- nopx create-react-app gif-expert
- Borro toda la carpeta src
- Incluyo, añado extend-expect a la linea de @testing en setupTsts.js
~~~~js
import '@testing-library/jest-dom/extend-expect'
~~~~
El archivo index.js ahora luce así:
~~~~js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
~~~~
- App no está definida y da error pero ahora es correcto
- Creo el componente **GifExpertApp** con un h2 y abajo un hr, una linea de separación
- Cambio App por GifExpertApp en el index.js
~~~~js
import React from 'react'
import ReactDOM from 'react-dom'
import {GifExpertApp} from '.../...'

ReactDOM.render(
    <GifExpertApp />,
    document.getElementById('root')
)
~~~~
- Añado unos estilos de CSS (avoid)

- La estructura de archivos es importante. Hay documentación sobre ello

- Crearé una lista de categorías para pintarla en pantalla
- para ello necesitaré  ol y li y algo que retorne uno ( o más valores)
- El ciclo for no va a funcionar, necesito un método, en este caso .map
- Error: Each child needs an unique key prop
- Asignar el valor indice como key puede ser inestable a los cambios, pero viene implicito en el .maps y de momento no hay id
- Esa key es lo que React necesita para saber que objeto está iterando
- Usaré category como key y como valor a mostrar 
- Creo un botón de Agregar
~~~~js
import React from 'react'

const GifExpertApp = () => {
    const categories = ['One Punch', 'Samurai X', 'Megaman']
  
  return (
    <>
        <h1>GifExpertApp</h1>
        <hr />
        <button>Agregar</button>


        <ol>
          {categories.map(category =>{
                return <li key= {category}>{category}</li>
          })}
        </ol>
    </>
  )
}

export default GifExpertApp
~~~~
------
              CREAR UN ARREGLO CON CONST PARA ALGO DINÁMICO NO VA A FUNCIONAR!!!!

## USO useState
(LO IMPORTO)
    - setCategories es la función que voy a llamar para añadir categorias al arreglo
    - Con el .push NO ES LA MANERA, ya que lo agregaría al arreglo pero no cambió en el State pq NO SE CAMBIA ASI EL STATE
    - Ademas, es una constante. 
    - Cuando el setCategories maneje el cambio, hará que React vuelva a renderizar el componente y guardará los cambios
    - Category es el valor, y el setCategories es lo que voy a llamar para añadir categorías
    - Cuando se usa el setCategories, estoy "cayendo encima" al estado anterior, con lo cual sin el spread sobreescribiría el anterior state dando ERROR
    - Por ello uso el spread, para extraer las categorías, y añado el nuevo valor 
        -Si lo pongo antes del spread, lo añadirá en primera posición.

    -Añado el handleAdd al onClick del button 
    - RESUMEN: Barrido con el .map y pintar un li con category como key
      - Con el setCategories le caigo encima al state, con el .push (MALA PRAXIS) reescribo
      - Por ello uso el useState con desestructuración  para añadir item a categories


~~~~js
import React, {useState} from 'react'

const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch', 'Samurai X', 'Megaman'])
    
    const handleAdd = ()=>{
        SetCategories(...categories, 'HunterXHunter' );
    }


  return (
    <>
        <h1>GifExpertApp</h1>
        <hr />
        <button onClick={handleAdd}>Agregar</button>


        <ol>
          {categories.map(category =>{
                return <li key= {category}>{category}</li>
          })}
        </ol>
    </>
  )
}

export default GifExpertApp
~~~~

- Otra manera de hacerlo sería con un callback
- El setCategories puede tener un callback, en el cual el primer argumento es EL ESTADO DEL STATE ANTERIOR
        - + EL NUEVO ESTADO QUE ESTOY AGREGANDO
~~~~js
const handleAdd = () =>{

    setCategories(cats =>{...cats, 'HunterXHunter'})

}
~~~~
- Al usar categories como id, si aprieto varias veces el botón se repite el key lo que da ERROR
- Normalmente son id's de bases de datos, no puede ser el índice
- El handleAdd era solo para fines didácticos. BORRADO
--------

# Componente AddCategory
- Creo un nuevo directorio llamado components y el archivo de AddCategory
- Quiero un nuevo componente que tenga una caja de texto y al presionar enter agregue una nueva categoría
- Coloco el AddCategory como componente debajo del h2 del GifExpertApp
- Necesito algo que me sirva para añadir categorías: un input
- Uso el useState, lo importo
- setInputValue es lo que voy a usar para cambiar la caja de texto


~~~~js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const AddCategory = () => {
  
  const [inputValue, setInputValue]= useState('Hola Mundo')
  
  return (
    <>
    <input 
      type="text"
      value = {inputValue}>

    
    </>
  )
}

export default AddCategory
~~~~

- En este momento no me deja escribir en la caja, porque este valor no puede cambiar (estado) porque no maneja el onChange.
- Puesto el onChange, necesito extraer ese valor de la caja de alguna manera. Pruebo un console.log del evento
- con el console.log del evento del onChange con un callback puedo ver en consola que debo atacar al e.target.value y pasarlo al handleInputChange
~~~~js
onChange = {(e)=>console.log(e)}
~~~~
- Veo que el valor está en e.target.value, mando a  llamar el setInputValue con el valor de e.target.value , primero puedo hacer un console.log
- Puedo pintar el inputValue, siempre será el último valor que la persona escribe a tiempo real en pantalla
- Puedo meterlo todo en un form, entonces no hace falta el fragments.
- Manejo el onChange con el handleInputChange, se actualizará cada vez que el texto de la caja cambie
- Quiero manejar el enter para disparar la acción.
~~~~js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const AddCategory = () => {
  
  const [inputValue, setInputValue]= useState('Hola Mundo')

  handleInputChange = (e) =>{
    //console.log(e.target.value)
    setInputValue(e.target.value)
  }


  return (
    <>
    <h1>{inputValue}</h1>
    <input 
      type="text"
      value = {inputValue}
      onChange={(handleInputChange)} />
    
    </>
  )
}
~~~~
- Quiero manejar el Submit
- Me interesa prevenir el comportamiento de refresh que tiene el navegador cuando doy Enter al formulario
- Borro el h1, no interesa


~~~~js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const AddCategory = () => {
  
  const [inputValue, setInputValue]= useState('Hola Mundo')

  handleInputChange = (e) =>{
    //console.log(e.target.value)
    setInputValue(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }


  return (
    
    <form onSubmit = {handleSubmit}>
    <input 
      type="text"
      value = {inputValue}
      onChange={(handleInputChange)=>} />
    
    </form>
  )
}
~~~~

# Comunicación entre componentes

- Tenemos un componente encargado de manejar la información del input, AddCategory, y otro de renderizarla, GifExpertApp

- Para añadir un elemento, el setCategories lo tengo en el GifExpertApp
- Para llamar al setCategories en el AddCategories, SE LO PUEDO PASAR COMO PROPS mandándole de referencia del setCategories
- Ahora la puedo ver en Componentes del Browser, en las props setCategory, la función
- Debo llamarla en el handleSubmit!! Cómo lo hago? Hay que recibirlo de las props


~~~~js
import React, {useState} from 'react'
import AddCategories from '....'


const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch', 'Samurai X', 'Megaman']);
    
    

  return (
    <>
        <h1>GifExpertApp</h1>
        <AddCategories  setCategories= {setCategories}/>
        <hr />
        <button onClick={handleAdd}>Agregar</button>


        <ol>
          {categories.map(category =>{
                return <li key= {category}>{category}</li>
          })}
        </ol>
    </>
  )
}
~~~~

## Uso la desestructuración en lo que sería el props como argumento del AddCategory
~~~~js
//Esto!!! desestructuración
const AddCategory =({setCategories})=>{}

//en lugar de . No se lleva poner props. luego habría que escribir props. todo
const AddCategory = (props) =>{}

~~~~
- Lo que sea que yo envíe como props al setCategories de AddCategory, es lo que yo obtengo como props en el componente, en este caso el setCategories
- He de llamar al setCategories con un callback para recibir el estado anterior y modificarlo con el nuevo state
- Se hizo anteriormente como ejemplo, desestructurando categories y añadiendo el nuevo state como segundo valor
- Bien podría llamar las categoría desde la desestructuración de las props, pero puedo hacerlo con un callback
- El onsubmit es en el form, no en el input.
- tengo muteado todo el rato el handleAdd y el setCategories.
- He de hacer una validación para manejar errores en el handleSubmit, que conecto con el onSubmit, ahora si borro todo inserta un espacio en blanco y eso no debería ser
- Si tiene mas de dos caracteres llamo al setCategories y reseteo el inputValue mandando un string vacío

~~~~js
import React, { useState } from 'react'



const AddCategory = ({setCategories}) => {
  
  const [inputValue, setInputValue]= useState('')

  handleInputChange = (e) =>{
    //console.log(e.target.value)
    setInputValue(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
   
   if(inputValue.trim().length >2{
      setCategories(cats => [...cats, inputValue])
      setInputValue('')

    })
  }
  setCategories(cats => [...cats, inputValue])


  return (
    
    <form onSubmit = {handleSubmit}>
    <input 
      type="text"
      value = {inputValue}
      onChange={(handleInputChange)=>} />
    
    </form>
  )
}
~~~~
  - Uso el propTypes para obligar a usar el setCategories. Lo importo

~~~~js
import React,  {useState } from 'react'
import PropTypes from 'prop-types'


const AddCategory = ({setCategories}) => {
  
  const [inputValue, setInputValue]= useState('')  //no pone hola mundo!!! Sin el string vació ' ' da undefined= error

  handleInputChange = (e) =>{
    //console.log(e.target.value)
    setInputValue(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
   
   if(inputValue.trim().length >2{
      setCategories(cats => [...cats, inputValue])
      setInputValue('')

    })
  }
  setCategories(cats => [inputValue, ...cats]) //coloco el inputValue primero para que lo 
                                                // muestre primero


  return (
    
    <form onSubmit = {handleSubmit}>
    <input 
      type="text"
      value = {inputValue}
      onChange={(handleInputChange)=>} />
    
    </form>
  )
}

AddCategories.propTypes = {
  setCategories: PropTypes.func.isRequired
}
~~~~
- Ahora da un error, pero es apropósito, hecho con fines didácticos

- En el useState borré el hola mundo, eso da error. Si el estado actual da undefined, inputValue es undefined. ERROR
- Se requiere que el valor inicial del useState sea algo,un string, iniciarlo con un string vacío
~~~~js
const [inputValue, setInputValue] = useState('')
~~~~

# Fetch API-> obtener las imagenes deseadas
- Mi objetivo ahora es crear un nuevo componente, que cuando note que hay un elemento
  - Haga la petición http
  - Traiga las imágenes correspondientes a la categoría
  - Y se desplieguen en pantalla

- Lo primero es crear un nuevo componente que reciba la info de la caja para procesarla petición http
- Para realizar el ejercicio se pondrá un valor al inicio del useState 'OnePunch', donde se inició el string vacío

- Debo pasar en las props category haciendo desestructuración en GifGrid y pasarlo como props en GifExpertApp PARA HACER LA CONEXIÓN
~~~~js
const [categories, setCategories] = useState('OnePunch')

~~~~
- Lo llamo GifGrid
~~~~js
import React from 'react'
import ReactDOM from 'react-dom'

export const GifGrid = ({category}) => {
  return (
    <div>
      <h3>{category}</h3>
    </div>
  )
}

~~
- Quito el botón, reacomodo el código
- Pinto el GifGrid con la categoría que estoy evaluando en este mismo momento, coloco el key obligatorio

~~~~js
import React, {useState} from 'react'
import {AddCategories} from '....'
import {GifGrid} from '......'

const GifExpertApp = () => {
  const[categories, setCategories] = useState(['One Punch']);
    
    

  return (
    <>
        <h1>GifExpertApp</h1>
        <AddCategories  setCategories= {setCategories}/>
        <hr />
        


        <ol>
          {categories.map(category =>
          
            <GifGrid 
              key: {category}
              category = {category} />          
          
          )}
        </ol>
    </>
  )
}
~~~~

- Si miro en componentes del navegador debería aparecer GifGrid: OnePunch
- Si agrego otro en el input y doy enter, aparece una nueva key del GifGrid con la categoría que haya escrito
- ENTONCES NECESITO RECIBIR UNA CATEGORÍA Y HACER LA PETICIÓN HTTP
- Necesito el endpoint de la API, getURL, consultar en la web

- Uso Postman
- Introduzco la URL del endpoint del SEARCH seguido de api_key, mi apiKey extraida de la web
- Recibo una respuesta con toda la data
- No devuelve nada porque no hay consulta
- Para ello, en params query escribo q en la izquierda y busco lo que haya en consola, DragonBall, lo pongo en la casilla de Value a la derecha
- Ahora si aparece toda la data de 20 imágenes de DragonBall
- Puedo poner en key de postman limit y de value 10, para manejar mejor la info
- api_key debe de ser el último valor, abajo de todo de key
- en consola debería aparecer type, y todo tipo de valores de cada gif
-----
- Ahora creo una constante llamada getGifs con esa url -copy+past y le añado https:
- Ahora hay que llamar al endpoint
- Hago la función getGifs async
- Hago la respuesta del fetch await
- Guardo el json
- A mi lo que me nteresa es la data de la data, uso la desestructuración para trabajarla


~~~js
import React from 'react'
import ReactDOM from 'react-dom'

export const GifGrid = ({category}) => {
  
  const getGifs= async ()=>{
    
    const url ='https://api.giphy./1234abc/apiKey567DEF'
    
    const resp = await fetch( url );
    const {data} = await resp.json(); //desestructuracion!!
    } 
  return (
    <div>
      <h3>{category}</h3>
    </div>
  )
}
~~~
- Ahora puedo barrer todas las imagenes y extraer el id, el título y la url
- Se podría usar la desestructuración para no tener que escribir img.
- Puedo usar el interrogante en images para que si tiene toda esa info la utilice

~~~js
import React from 'react'


export const GifGrid = ({category}) => {
  
  const getGifs= async ()=>{
    
    const url ='https://api.giphy./1234abc/apiKey567DEF'
    
    const resp = await fetch( url );
    const {data} = await resp.json();
    
    çconst gifs = data.map(img =>{
        return{
          id: img.id,
          title: img.title,
          url: img.images?.downsized_medium.ulr
        }
    })

    } 

getGifs()

  return(
    <div>
    <h3> {category}</h3>
    </div>
  )
}



~~~
# useEffect

    HAY UNA SERIE DE INCONVENIENTES DE ESTA MANERA DE HACER, POR ESO HABLAMOS DE useEffect

- Importo el useState y lo declaro como contador, count, con el valor de cero
- Yo lo que quiero es llamar al setCount. Todo esto es para entender el useEffect
- Creo un boton
~~~js
import React, {useState} from 'react'


export const GifGrid = ({category}) => {
  
  const [count, setCount] = useState(0)

  const getGifs= async ()=>{
    
    const url ='https://api.giphy./1234abc/apiKey567DEF'
    
    const resp = await fetch( url );
    const {data} = await resp.json();
    
    çconst gifs = data.map(img =>{
        return{
          id: img.id,
          title: img.title,
          url: img.images?.downsized_medium.ulr
        }
    })

    } 

getGifs();
    
    
  return(
    <div>
    <h3> {category}</h3>
    <h3>{count}</h3>
      <button onClick={()=> setCount(coun+1)}>
    </div>
   )
}

~~~

- Ahora cada vez que aprieto el botón esta disparando una petición http y pintando un numero incremental, porque React notó un cambio
- Entonces vuelve a ejecutar todo el código, porque en medio se encuentra el getGifs, 
- Cada vez que detecta un cambio dispara una petición http, porque hay que actualizar las referencias
- Hay un peligro de bucle infinito, podria pasar con el setImagenes.
- Se puede evitar con useEffect. Me va a permitir ejecutar código de manera condicional
- useEffect recibe una función que es lo que quiero ejecutar, y en este caso recibe el getGifs
- El segundo valor que se le manda es una arrgelo de dependencias.
- Si se manda vacío se disparará una única vez
  - Solo se efectuará cuando el componente es renderizado por primera vez

~~~js
import React, {useState. useEffect} from 'react'


export const GifGrid = ({category}) => {
  
  const [count, setCount] = useState(0)
  useEffect(()=>{
    getGifs()
  }, [])


  const getGifs= async ()=>{
    
    const url ='https://api.giphy./1234abc/apiKey567DEF'
    
    const resp = await fetch( url );
    const {data} = await resp.json();
    
    çconst gifs = data.map(img =>{
        return{
          id: img.id,
          title: img.title,
          url: img.images?.downsized_medium.ulr
        }
    })

    } 

//getGifs();//yo no quiero que este getGifs siga realizando peticiones http cada vez que renderiza el componente
    
    
  return(
    <div>
    <h3> {category}</h3>
    <h3>{count}</h3>
      <button onClick={()=> setCount(coun+1)}>
    </div>
   )
}

~~~
# Mostrar los títulos de las imágenes


- Ahora puedo observar en consola con un console.log que le doy al contador y solo se efectúa una vez la petición http
- Ya no hace falta el contador, LO BORRO
- Dejo el category, añado un ol con 1 item debajo del category de GifGrid
- Uso el useState
-En el setImages el nuevo estado serán los gifs con la respuesta fetch
  - Si voy a la pestaña de componentes del navegador veo en consola que tengo el arreglo de imagenes en GifGrid
-Reemplazo el item. Hago el barrido con .map y manejo la imagen en un li con la data de la api
- desestructuro img con la data que necesito que es el id y el title, asi no escribo img.id e img.title
~~~js
import React, {useState, useEffect} from 'react'


export const GifGrid = ({category}) => {
  
  const [images, setImages] = useState([]);
  
  useEffect(()=>{
    getGifs()
  }, []) //el arreglo de dependencias vacío, sólo renderiza una vez 


  const getGifs= async ()=>{
    
    const url ='https://api.giphy./1234abc/apiKey567DEF'
    
    const resp = await fetch( url );
    const {data} = await resp.json();
    
    const gifs = data.map(img =>{
        return{
          id: img.id,
          title: img.title,
          url: img.images?.downsized_medium.ulr
        }
    })
  console.log(gifs)
  setImages(gifs)

  } 

    
  return(
    <div>
    <h3> { category } </h3>
    <ol>{

      images.map(({id, title})=>(
        
        <li key= {id}> {title }</li>
      
      ))
    }</ol>
    </div>
  )
}
~~~

- Se imprimen en pantalla los 10

- Creo el componente GifGridItem para construir cada elemento a mostrar 

- Le pongo img pero es una prop en realidad
~~~~js
import React from 'react'


export const GifGridItem = (img) => {
  cnsole.log(img)
  
  return (

    
    <div>GifGridItem</div>
  )
}

~~~~

Voy al GifGrid y quito el ol, para pintar mi GifGridItem, lo importo
~~~~js

return(
    <div>
    <h3> { category } </h3>
    

      images.map(img)=>(
        <GifGridItem 
        key= {img.id}
        img = {img}/>
       
      )
    
    </div>
  )  
~~~~
- Un tip. Uso el spread del img en el GifGrid

~~~~js
return(
    <div>
    <h3> { category } </h3>
    

      images.map(img)=>(
        <GifGridItem 
        key= {img.id}
        {...img}/>
       
      )
    
    </div>
  )  
~~~~

- Imprimo las props en el GifGridItem
- Veo que el resultado es EL MISMO!! puedo ver en consola que recibo el title, la url y el id. 
   - Estoy mandando cada una de las propiedades de las imagenes como una propiedad independiente
~~~~js
export const GifGridItem = (props) =>{
  console.log(props)

  return(
    <div></div>
  )
}

~~~~
- Uso la desestructuracion y hago algo de carpintería
~~~~js
export const GifGridItem = ({ id, title, url}) =>{
  console.log({id, title, url})

  return(
    <div>
      <img src={url} alt={title} />
      <p> {title}</p>
    </div>
  )
}

~~~~
---
# Helpers - getGifs

- El getGifs lo tengo en GifGrid. Es un componente en si mismo, puedo extraerlo para hacer el componente más sencillo y que haga solo una función específica
- Pongo el url en back ticks para hacer un template literal con el category
- Va despues de q="nombre del gif"
- Para evitar errores de espacios se usa encodeURI

~~~~jsx
export const GifGrid = ({category}) => {
  
  const [images, setImages] = useState([]);
  
  useEffect(()=>{
    getGifs()
  }, []) //el arreglo de dependencias vacío, sólo renderiza una vez 


  const getGifs= async ()=>{
    
    const url =`https://api.giphy./1234abc/apiKey567DEFq=${encodeURI(category)}&limit9uw0nu`
    
    const resp = await fetch( url );
    const {data} = await resp.json();
    
    const gifs = data.map(img =>{
        return{
          id: img.id,
          title: img.title,
          url: img.images?.downsized_medium.ulr
        }
    })
  console.log(gifs)
  setImages(gifs)

  } 

    
  return(
    <div>
    <h3> { category } </h3>
    <ol>{

      images.map(({id, title})=>(
        
        <li key= {id}> {title }</li>
      
      ))
    }</ol>
    </div>
  )
}
~~
- Creo un nuevo directorio llamado Helpers y un nuevo archivo getGifs
- Le pongo un export antes del const y a correr!
- Le pongo de return gifs, ya que no tengo el setImages
~~~~jsx
export const getGifs= async ()=>{
      
      const url ='https://api.giphy./1234abc/apiKey567DEF'
      
      const resp = await fetch( url );
      const {data} = await resp.json();
      
      const gifs = data.map(img =>{
          return{
            id: img.id,
            title: img.title,
            url: img.images?.downsized_medium.ulr
          }
      })
    return gifs
  
    } 

~~~~
- El useEffect del GifGrid ya no tiene el getGifs, pero lo puedo importar.
- Este getGifs retorna una promesa, con lo cual puedo usar el .then
- Añado el category como dependencia, porque si esta cambiara , pod´ria suceder que se volviera a disparar la renderización. La consola da un warning al respecto.

~~~~jsx
export const GifGrid = ({category}) => {
  
  const [images, setImages] = useState([]);
  
  useEffect(()=>{
    getGifs(category).then(imgs=> setImages(imgs))
  }, [category]) //el arreglo de dependencias vacío, sólo renderiza una vez 



    
  return(
    <div>
    <h3> { category } </h3>
    <ol>{

      images.map(({id, title})=>(
        
        <li key= {id}> {title }</li>
      
      ))
    }</ol>
    </div>
  )
}
~~~~
- El useEffect se puede resumir por ser una funcion cuyo primer argumento es mandado como primer argumento quedando asi:

~~~~jsx
useEffect(()=>{
  getGifs( category)
  .then(setImages)
})

~~~~

# CUSTOM HOOK

- Un customHook es extraer lógica y hacerla sencilla para ser reutilizada

- el useEffect hace que cuando se cargha el componente por primera vez:
  - lance la petición para obtener los gifs 
  - los coloca en las imagenes

- Para los customHooks se recomienda crear un nuevo directorio llamado hooks
- Creo el archivo useFetchGifs.js
- Los hooks empiezan por use. No son más que funciones
- ¿Que diferencia hay con un funcional component?
.- Este hook puede tener su estado, y puede indicar a los componentes que lo utyilicen cuando deben renderizarse porque algo cambió.
~~~~jsx

export const useFetchGifs = () =>{
  const [state, setState] = useState({
    data: [],
    loading: true
  })
  return state; //data: [], loading: true, este es el state
}

~~~~ 
- Almaceno este estado en una constante dentro del GifGrid, quito código y lo importo
- Uso desestructuración

~~~~jsx
export const GifGrid =({category})={

const [data,loading] = useFetchGifs();


return(
  <>
    <h2>{category}</h2>
    {loading ? 'cargando...':'Fin de carga'}

  </>
)
}

~~~~
- Los customHooks pueden tener efectos, pueden usar reducer, contextos
- Cuando se ejecute el GifGrid llama al useFetchGifs
- En UseEffect es donde voy a ejecutar el cuerpo de mi peticion http
- Importo del helpers el getGifs y le paso la categoría como argumento.
- Problema! no la tengo, pero SE LA PUEDO MANDAR POR LAS PROPS DESDE EL GIFGRID
# Obtener imágenes y bandera de carga



- Cambios en el GifGrid
~~~~js

    export const GifGrid =({category})={
    
    const [data,loading] = useFetchGifs(category);
    
    
    return(
      <>
        <h2>{category}</h2>
        {loading ? 'cargando...':'Fin de carga'}
    
      </>
    )
    }
~~~
- La recibe en las props;
- Solo efectuará el cambio si la categoría cambia
- GetGifs una promesa, los effects no pueden ser asincronos
-
~~~js
export const useFetchGifs = (category) =>{
  const [state, setState] = useState({
    data: [],
    loading: true
  })
  
  useEffect(()=>{
  getGifs()    
    }[category]) //
}

~~
- Tengo que manejar la info del setState en el mismo orden
~~~js
export const useFetchGifs = (category) =>{
  const [state, setState] = useState({
    data: [],
    loading: true
  })
  
  useEffect(()=>{
  getGifs(category).
  then( imgs =>{
    setState({
      data: imgs,
      loading: false
    })
  })    
    }[category]) //
}

~~