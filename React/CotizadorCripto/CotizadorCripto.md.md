# APUNTES REACT 02

## Styled Components

- Para los styled components hay que instalar:

        npm i @emotion/react @emotion/styled

- Se definen fuera del componente
- La sintaxis es la siguiente:

~~~~js
import styled from '@emotion/styled'


const Heading= styled.h1`
    color: red;
    text-transform= uppercase;
`

export const Componente = () =>{

    return <Heading>Título en rojo</Heading>

}

~~~~

- Se puede crear un styled component de imagen y pasarle los atributos correspondientes
- Tambien se le pueden añadir mediaquerys
~~~js

const Imagen = styled.img`
    width: 30%;
    margin: 100px
`
//y dentro del componente lo coloco

<Imagen src={ImagenPortada} alt="portada">

~~~

## Creando un customHook

- Deben empezar por la palabra use
- Se crea con el snippet rafce, como cualquier otro componente
- Se debe importar dónde quieras usarlo
- Le paso por props la etiqueta a mostrar
~~~~js
import React from 'react'

const useSelectMonedas = () => {
  
  const SelectMonedas = ()=>{
    console.log("Desde SelectMonedas")
   
  }
  
  return [SelectMonedas]
    
}

export default useSelectMonedas
~~~~

- Entonces ahora solo es extraer la función del return allá dónde lo importes 

~~~~js

const [SelectMonedas] = useSelectMonedas()

SelectMonedas()

~~~~

- También puedo llamarlo como un componente.
- 
- Notar que esta el return implicito entre paréntesis, lo va a mostrar en pantalla

~~~~js

const useSelectMonedas = ({label}) => {
  
  const SelectMonedas = ()=>(
    <>
        <label>{label}</label>
    </>
  )
    
  
  
  return [SelectMonedas]
    
}

export default useSelectMonedas
~~~~


~~~js

const [SelectMonedas] = useSelectMonedas('Elige tu moneda')


<SelectMonedas />

~~~
- Puedo reutilizarlo para el select de criptomonedas
- Cómo esta exportado como arreglo en el return del componente puedo renombrarlo ya que es posicional

~~~js
  const [SelectCriptomonedas] = useSelectMonedas('Elige tu criptomoneda')
~~~

- Para mostrar las opciones dentro de un select puedo crear un pequeño diccionario llamado monedas
~~~js
    const monedas =[
        {id:"USD", nombre: "Dólar de Estados Unidos"},
        {id:"MXN", nombre: "Peso Mejicano"},
        {id:"EUR", nombre: "Euro"},
        {id:"GBP", nombre: "Libra Esterlina"}

    ]
~~~~
- Recomendable colocar estas opciones (monedas) en un helper


- De esta manera puedo reutilizar el componente solo cambiando las opciones
- Añado el state para manejar la info

~~~js
const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

  
  const SelectMonedas = ()=>(
    <>
        <Label>{label}</Label>
        <Select
        value={state}
        onChange={(e)=>setState(e.target.value)}>
            
            <option value="">Seleccione</option>

            {opciones.map(opcion=>(
                    <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
            ))}

        </Select>

    </>
    
  )
  
  return [state, SelectMonedas]
  
}

export default useSelectMonedas

~~~

- Cuando lo llamo ahora debo colocar monedas (lo importo)

~~~js
const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas) 
~~~

- Para darle formato al select puedo crear un styledComponent de Select y usarlo en el hook


## LLamar una API

- Un useEffect es una buena manera de llamar a una API
- Con el arreglo de dependencias vacío se ejecutará una sola vez cuando el documento esté listo

~~~js

useEffect(()=>{
        const consultarAPI = async() =>{
          const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
          
          const respuesta = await fetch(url)

          const resultado = await respuesta.json()
          }
          
         
        consultarAPI()
    },[])

~~~

- Con el map creo un objeto y uso el Name de la data como id, que son tres digitos de cripto y el FullName
- De tal manera que puedo usar el mismo SelectMonedas para crear el Select
- Retorno el objeto
- Guardo los objetos del .map de arrayCriptos en un nuevo state llamado criptos, setCriptos

~~~js

    useEffect(()=>{
        const consultarAPI = async() =>{
          const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
          
          const respuesta = await fetch(url)
         
          const resultado = await respuesta.json()
          
          const arrayCriptos = resultado.Data.map(cripto=>{
           
            const objeto = {
              id: cripto.CoinInfo.Name,
              nombre: cripto.CoinInfo.FullName
            }
            
            return objeto
          })
          setCriptos(arrayCriptos)
       
        }

        consultarAPI()
    },[])
~~~~

- Ahora solo tengo que llamar al hook 
~~~js
const [criptomoneda, SelectCriptomoneda] = useSelectMonedas("Elige tu criptomoneda", criptos)
~~~~
- Después de pasar la validación, creo un nuevo state como objeto monedas

~~~js
 const handleSubmit = e =>{
      e.preventDefault()

      if([moneda, criptomoneda].includes("")){
        setError(true)
        
      }
       setError(false)
       setMonedas({
        moneda,
        criptomoneda
       })

    }
~~~

- Ahora puedo usar un useEffect para detectar cuando monedas tiene algo
- Para que solo se ejecute cuando monedas tenga algo puedo hacer una validación

~~~~js
 useEffect(()=>{
    if(Object.keys(monedas).length > 0){
    

    }
    
  }, [monedas])
~~~~


- Desestructuro monedas para usar los valores moneda y cripto en el template string del endpoint de cotización FULL DATA


~~~js
  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async() =>{
        
        const {moneda, criptomoneda} = monedas;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado= await respuesta.json()
        
         console.log(resultado)
      }
      cotizarCripto()
    }
    
  }, [monedas])

~~~

- Ahora, para hacer la comparación, en lugar de usar un if que compruebe las cuatro monedas y las 10 criptomonedas, puedo inyectar la moneda y criptomenda de forma dinámica, entre corchetes

~~~js
  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async() =>{
        
        const {moneda, criptomoneda} = monedas;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado= await respuesta.json()
        
        console.log(resultado.DISPLAY[criptomoneda][moneda])
      }
      cotizarCripto()
    }
    
  }, [monedas])
~~~

- En lugar de imprimir el resultado en consola va a ser un nuevo state llamado resultado iniciado con un objeto vacío

- Para mostrar la info solo tengo que desestructurar los datos de la API de resultado