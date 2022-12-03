- Aplicando Javascript se pueden hacer mucho más reutilizables los styled components

~~~~js
const Button = styled.button`
  background-color: ${props => props.primary? 'red': 'white'};
  color: ${props => props.primary ? 'white': "red"};
  padding: 10px 15px;
  solid: solid 2px red;
  border-radius: 2px
`
~~~~
- Con esto solo tengo que indicarle la propiedad al Button para que cambie a rojo

~~~js
<Button primary>Enviar</Button>
~~~

## Extender estilos

- Para extender los estilos encierro entre paréntesis el objeto creado y abro back ticks
~~~js

const BlockButton = styled(Button)`
    width:100%;
    font-size: 24px

`
~~~
## Cambiando las etiquetas renderizadas

- Para cambiar el comportamiento uso la palabra as 

~~~js

 <BlockButton primary as="a" href="#">Enviar</BlockButton>
~~~

## Agregando estilos a componentes ya creados

- Para agregar estilos a componentes ya creados hay que sacar el className por las props y hacer una copia del resto de props por si acaso
~~~js
const Link = ({className, ...props})=> {
  return <a className={className} {...props} ></a>
}

const StyledLink = styled(Link)`
color: blue`

~~~

            Nunca definir un StyledComponent dentro de un método de render, siempre fuera del componente

## Pseudoelementos y selectores

~~~~js
const StyledLink = styled(Link)`
color: blue;
transition: all .5s ease;

&:hover{
    color:violet
}
 `
~~~~

- También puedo añadirles clases

~~~js
const Button = styled.button`
  transition: all .3s ease;
  background-color: ${props => props.primary? 'red': 'white'};
  color: ${props => props.primary ? 'white': "red"};
  padding: 10px 15px;
  solid: solid 2px red;
  border-radius: 2px;

  &:hover {
    box-shadow: 3px 2px 5px rgb(0,0,0,0.3)
  }
 
  &.secondary{
    background-color: blue
  }
`
<Button className="secondary"> Enviar</Button>
~~~
- Sin el símbolo & le aplicará sólo a los hijos de este Button

# Agregando Propiedades

- Con attrs 

~~~~js

const Input = styled.input.attrs(props=>({
  type: 'text',
  color: props.color || 'red'
}))`
font-size: 20px;
border: 2px solid red
color: ${props=> props.color}`

~~~~
- Yo puedo sobreescribir las propiedades, la de type por ejemplo 
. Las propiedades que yo escriba dentro de las backticks sobreescribirán las anteriores del input

~~~js
const Password = styled(Input).attrs({
    type: "password"
})``
~~~

## Animaciones

- Hay que importar keyframes

        import styled, {keyframes} from 'styled-components'

~~~js
const girar =keyframes`
  from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`
const Rotar = styled.div`
display: inline-block;
animation: ${girar} 2s linear infinite`

~~~~
