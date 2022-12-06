# Componentes

- Así luce un componente trabajando con la librería react.min.js, react.dom.min.js, babel.min.js

~~~~javascript
<script type="text/babel">

    const divRoot = document.querySelector('#root')
    const nombre = "Goku"

    const h1Tag = <h1>Hola, soy {nombre} </h1>;

    ReactDOM.render(h1Tag, divRoot)
</script>
~~~~

- Se puede ver como selecciono la etiqueta #root, que es un id
- Encapsulo la etiqueta h1 en h1Tag y con las llaves le añado texto del lado de javascript dentro de la etiqueta h1
- Para finalizar renderizo con ReactDOM, seleccionando "el qué y dónde"; la constante donde guardé el Tag, el qué, y el id, dónde

- Todo es un componente: el menú, formulario, cada item, son segmentos
    - **piezas de código encapsuladas que tienen una acción específica**
    - Pueden contener unos de otros, *padres e hijos*. 
    - Pueden **tener un ESTADO o NO**
## ¿Qué es un estado?

- Cuando un formulario es renderizado por primera vez, tiene un *ESTADO INICIAL*.
    - Es como se encuentra la información por primera vez
- Los campos no tienen ningún valor
- En el momento que los campos, desde la primera tecla que introdujo un caracter, son rellenados, **CAMBIA EL ESTADO**

      EL ESTADO es como se encuentra la información de un componente en un punto determinado del tiempo 

# Primera aplicación
Escribir este comando para iniciar

        $}npx create-react-app nombre-de-la-aplicación
        $}cd nombre-de-la-aplicacion
        $}npm start




# Hola Mundo en React

- Borro toda lo que lleva la carpeta src
        
        El lenguaje de HTML que se usa del lado de javascript se llama JSX
        Para usarlo, hay que realizar la importación de React
        Para renderizar hay que usar el ReactDOM, por lo que hay que importarlo

~~~javascript
import React from 'react'
import ReactDOM from 'react-dom'

const saludo = <h1>Hola Mundo</h1>

~~~

- En el index.html, en el body, tengo un div con el id "root"
~~~~html

<body>

<div id="root">

</div>

</body>

~~~~

- Necesito crear la referencia a esa etiqueta para renderizar saludo
- Lo haré por el id con querySelector
- Utilizo ReactDOM y entre paréntesis, primero el qué y luego el dónde
~~~~javascript
import React from 'react'
import ReactDOM from 'react-dom'

const saludo = <h1>Hola Mundo</h1>

const divRoot = document.querySelector('#root');

ReactDOM.render(saludo, divRoot)
~~~~

- Creo un archivo llamado PrimerApp.js
- Hay dos tipos de componentes, basados en clases y basados en funciones
- En este curso se trabaja con los *Functional Components*
- Al usar JSX hay que importar react, con el snippet "imr"

~~~~javascript
import React from 'react
const PrimeraApp = () => {
    return <h1> Hola Mundo!</h1>    
}

export default PrimeraApp;
~~~~
- Yo puedo importarla al index.js y usarla
~~~~javascript
import React from 'react'
import ReactDOM from 'react-dom'
import PrimeraApp from '../PrimeraApp'

const divRoot = document.querySelector('#root');

ReactDOM.render(<PrimeraApp  />, divRoot)
~~~~

## El reotrno de los elementos se hacen en un div contenedor o Fragment
### Si escribo la etiqueta vacía tampoco hay div adicional y funciona igual que un Fragment
- Importo el elemento Fragment de forma independiente
~~~~javascript
import React, { Fragment } from 'react'
//ejemplo1

const PrimeraApp = ()=>{

    return(

        <Fragment>
            <h1>Hola Juanola</h1>
            <h2>Adiós Juan</h2>
        </Fragment>
    )
}

//ejemplo2: etiqueta vacía, no hay div
<>
    <h1>Hola Juanola</h1>
    <h2>Adiós Juan</h2>
</>

//ejemplo3: div
    <div>
    <h1>Hola Juanola</h1>
    <h2>Adiós Juan</h2>
    </div>

# Imprimir variables en el html

- Las llaves no aceptan todo tipo de elementos
~~~~javascript

const PrimeraApp = ()=>{
    const saludo = "Hola, Juan"
    return(

        <Fragment>
            <h1>{saludo}</h1>
            <h2>Adiós Juan</h2>
        </Fragment>
    )
}
~~~~

       NO IMPRIME CONDICIONALES, BOOLEANS NI OBJETOS
    
    
    - Pero puedes convertir el objeto con JSON.Stringify y la etiqueta pre
    - Mas info modzilla
~~~~javascript

<pre>{JSON.Stringify(saludo, null, 3)}</pre>

~~~~

# Comunicación entre componentes---> Props

- En este ejemplo, el componente padre sería PrimeraApp. 
- Puedo pasar info a través de las props a otros componentes
- Se pueden ver las props ,no tiene de momento, en el navegador


~~~~js
const PrimeraApp=(props)=>{
    const saludo = "Hola Mundo!"
    
    console.log(props)

    return (
        <>
         <h1> {saludo}</h1>
         <h2>Mañana te veo</h2>
        </>
    )

}
~~~~
- Este console.log(props) devuelve, imprime en consola, un objeto vacío no un undefined!




~~~~javascript
import React from 'react'
import ReactDOM from 'react-dom'
import PrimeraApp from '../PrimeraApp'

const divRoot = document.querySelector('#root');

ReactDOM.render(<PrimeraApp saludo= "Hola, soy Leonard Cohen" />, divRoot)
~~~~
- Ahora el console.log devuelve al Leonard C.
- Se pueden ver en el navegador e incluso agregarlas *in situ*, el console.log las imprimirá
    - Esto es muy util para probar cosas desde el navegador sin refrescar.
### ¿Cómo lo haría si no tuviera ese const saludo?

- Haría algo así:
~~~~js
const PrimeraApp=(props)=>{
    
    
    console.log(props)

    return (
        <>
            <h1> {props.saludo}</h1>
            <h2>Mañana te veo</h2>
        </>
    )

}

~~~~
- Pero usando la desestructuración quedaría así:

~~~~js
const PrimeraApp=({saludo})=>{

    return (
        <>
          <h1> {saludo} </h1>
          <h2>Mañana te veo</h2>
        </>
    )

}
export default PrimeraApp
~~~~

### Podría pasar que no se mandara esa propiedad saludo. Se podría definir un valor por defecto, o indicar que tiene que haber un valor en props

# PropTypes

~~~~js
import React from 'react'
import  PropTypes from 'prop-types'


const PrimeraApp=({saludo})=>{
    
    return (
        <>
          <h1> {saludo} </h1>
          <h2>Mañana te veo</h2>
        </>
    )

}

PrimeraApp.propTypes = {
    saludo: PropTypes.string //esto obliga a que sea de tipo String
}


export default PrimeraApp
~~~~
- Si yo pusiera saludo = 123, saltaría error

- Para hacer que sea una propiedad obligada, pues sin ello no daría error si no hubeira argumento:

~~~~js
PrimeraApp.propTypes = {
    saludo : PropTypes.string.isRequired,
    otra: PropTypes.number  //si quisiera poner otra, se separan por comas
}
~~~~

# DefaultProps

- Añado otra prop subtitulo y lo pinto en el h2, si es por defecto lo usual es definirlo directamente
- La prop no aparece en la consola del navegador

~~~~js
import React from 'react'
import  PropTypes from 'prop-types'


const PrimeraApp=({saludo, subtitulo="Soy un subtitulo"})=>{
    
    return (
        <>
          <h1> {saludo} </h1>
          <h2> {subtitulo} </h2>
        </>
    )

}

PrimeraApp.propTypes = {
    saludo: PropTypes.string //esto obliga a que sea de tipo String

}
~~~~

- hay otra manera de hacerlo, en las propTypes

~~~~js

PrimeraApp.propTypes = {
    saludo: PropTypes.string //esto obliga a que sea de tipo String

}

PrimeraApp.defaultProps = {
    subtitulo: 'Soy un subtítulo'
}
~~~~
   Se puede dejar el objeto vacío y que aparezca en las props para documentar que es necesario, obligatorio













