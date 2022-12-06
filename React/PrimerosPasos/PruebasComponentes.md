# Pruebas a Componentes

- Pruebas a primeraApp. Las importaciones necesarias. El saludo era requerido.
~~~~js
const divRoot = document.querySelector('#app')

ReactDOM.render(<PrimeraApp saludo= 'Hola, soy Christian'/>, divRoot)
~~~~
- Varias cosas se pueden comprobar: 
  - que renderice bien el h1, el subtitulo, etc


~~~~js
const primeraAppp = ({saludo, subtitulo}) => {

    return(
        <>
            <h1>{ saludo }</h1>
            <p>{ subtitulo }</p>

        </>
    )
}

PrimeraApp.propTypes = {
    saludo: PropTypes.string.isRequired
}

PrimeraApp.defaultProps = {
    subtitulo: "Soy un subtitulo"
}

~~~~

- Creo el archivo PrimaraAPp.test.js, uso el describe
- Necesito renderizar el componente y evaluar sobre el producto renderizado
- Creo un contenedor wrapper e importo render y react, ya que renderizo con JSX
- Saludo es requerido, sin saludo dará error

~~~~js
import {render} from '@testing-library/react'
import PrimeraApp from '.....'
import React from 'react'


test('debe de mostrar Hola soy Christian', ()=>{
    const saludo = 'Hola, soy Christian"
    const wrapper = render(<PrimeraApp saludo={saludo}/>)
    
    wrapper
})
~~~~
- Wrapper tiene un montón de métodos, aquí se usará con enzyme, el método getByText.
- De aquí en adelante se usará enzyme, no la librería @testing de React
- Se puede usar en la desestructuración
~~~~js
test('debe de mostrar Hola soy Christian', ()=>{
    const saludo = 'Hola, soy Christian"
    const {getByText} = render(<PrimeraApp saludo={saludo}/>)
    
    expect.getByText(saludo).toBeInTheDocument();
})
~~~~
- Esto da error porque no esta configurado en setupTest para extender el expect

# Enzyme Testing Unit




- ENZIME


- Paso 1. Inst JEST en el proyecto:
npm install --save-dev jest

- P2. Inst la versión de enzime para REACT 17:
npm install --legacy-peer-deps --save-dev @wojtekmaj/enzyme-adapter-react-17

- P3. Add a setupTests.js:

    import Enzyme from 'enzyme';
    import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
     
    Enzyme.configure({ adapter: new Adapter() });

- P4. Inst las dependencias faltantes:

npm install --save-dev enzyme

- P5. Inst enzyme-to-json:

npm install --save-dev enzyme-to-json

- P6. Add a setupTest.js:

    import {createSerializer} from 'enzyme-to-json';
    expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));



~~~~js
npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17
~~~~
- Creo el archivo en src

setuptests.js:
~~~~js
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode:'deep'}))
~~~~

~~~~js
import {shallow} from 'enzyme'
import'@testing-library/jest-dom'

test('debe de mostrar PrimerApp correctamente', ()=>{
     const saludo = "Hola, soy Christian"
   
    const wrapper = shallow(<PrimeraApp saludo={saludo}>)

    expect(wrapper).toMatchSnapshot();

})
~~~~
- El Snapshot no se toca manualmente, pero se puede abrir para ver que hay
- Es una fotografía de lo renderizado.
- Si dice ShallowWrapper no es lo que ineteresa.
    - Por eso la extensión configurada anteriormente

# Revisar elementos dentro del componente

- Para comprobar si a mi componente le mandamos un subtitulo
- Tocar u para actualizar el snapshot
- Wrapper contiene toda el html relacionada con lo renderizado en el snapshot: los h1, los p, etc
- Lo puedo barrer con el .find, como si usara un querySelector
- .text me devuelve el texto del p. Ahora hay que comprobar con el expect que el texto sea igual que el subtitulo
~~~~js

test('debe de mostrar  el subtitulo enviado por props', ()=>{
    const saludo = 'Hola, soy Christian';
    const subtitulo = "Este es un subtitulo"


    const wrapper = shallow(<PrimeraApp 
                            saludo={saludo}
                        subtitulo = {subtitulo}/>)
    const textoParrafo = wrapper.find('p').text() 

expect(textoParrafo). toBe( subtitulo );

})
~~~~

# Pruebas CounterApp

~~~~js
import React, {useState} from 'react'
import PropTypes from 'prop-types'






const CounterApp = ({value = "10"}) =>{

    const [counter, setCounter]= useState(value);
       
    
        
       
       const handleAdd =() =>{
            setCounter(c=> counter +1)
    
       }
       const handleSubstract = ()=>{
           setCounter((c)=> c -1)
       }
       const handleReset = ()=>{
           setCounter(c => c =value)
       }
    
    return(
        <>
            <h1>CounterApp</h1>   
            <h2>{counter}</h2> 
            <button onClick={handleAdd}>+1</button>  
            <button onClick={handleSubstract}>-1</button>  
            <button onClick={handleReset}>RESET</button>  
        
        </>
    )

    
}


CounterApp.propTypes = {
    value: PropTypes.number
}

export default CounterApp;
~~~~


- Debe mostrar CounetrApp correctamente
- Debe de mostrar el valor por defecto de 100. Usar el wrapper.find tomando del html donde muestra el contenido
- Importar React, shallow y CounterApp

~~~~js
test('debe de mostrar CounterApp', ()=>{
    const wrapper = shallow(<CounterApp  value = 10 />)
    expect(wrapper).toMatchSnapshot(;)

})

test('debe de mostrar el valor por defecto de 100', ()=>{
    
    const wrapper = shallow(<CounterApp  value = 10 />)
    
    const counterText = wrapper.find('h2').text().trim
    //console.log(counterText)

    expect(counterText).toBe('100')

})

~~~~
- El resultado donmde renderiza el numero esta en un h2 y solo hay uno
- Para React los espacios dentro de las llaves son espacios también

-----
# Simular Eventos- Click

- Puedo crear el wrapper dentro del describe, un nivel superior , para poder usarlo en los otros tests
- at 0 es elegirlo en base a su poción índice
- Para encontrar el valor es la misma sentencia
- esperaía un 11 ya que el valorp or defecto es 10 y le he añadido 1
~~~~js

    const wrapper = shallow(<CounterApp  value = 10 />)

test('Debe de incrementar contador con el botón +1', ()=>{
    
    wrapper.find(button).at(0).simulate('click')
    const counterText = wrapper.find('h2').text().trim
    expect( counterText).toBe('11')
    
 })
test('Debe de restar contador con el botón -1', ()=>{
    
    wrapper.find(button).at(1).simulate('click')
    const counterText = wrapper.find('h2').text().trim
    expect( counterText).toBe('9')
    
 })
~~~~
- No recibe 9 del toBe, recibe 10
        Porque las pruebas son ejecutadas UNA DETRÁS DE LA OTRA
- Se pueden reinicializar antes de que se ejecuten cada una de ellas, ya que tienen un ciclo de vida
- Para ello usaré el beforeEach()
- Cambio el wrapper a let para que no sea una variable de scope
~~~~js
describe('Pruebas en el CounterApp', ()=>{
    
    let wrapper = shallow(<CounterApp  value = 10 />)
    
    beforeEach(()=>{
        wrapper = shallow(<CounterApp  value = 10 />)

    })
    
})
~~~~
- el reset recibe el valor que se le manda por las props
~~~~js

test('debe de colocar el valor por defecto con el btn reset')

    const  wrapper = shallow(<CounterApp  value = 105 />)
    
    wrapper.find().at(0).simulate('click')
    
    expect( counterText).toBe('106')

    wrapper.find().at(2).simulate('click')
    expect( counterText).toBe('105')










