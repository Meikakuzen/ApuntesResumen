# 03 Apuntes REACT

- Instalar react-router-dom

        npm i react-router-dom

## Crear router

- Importaciones

~~~js
import {BrowserRouter, Routes, Route} from 'react-router-dom'
~~~

- BrowserRouter engloba todo desde App.jsx
- En Routes están las rutas
- Route de apertura y cierre puede anidar otros Route

~~~js
function App() {
 

  return (
      <BrowserRouter>
        <Routes>
            <Route>
                <Route />
                <Route />
                <Route />
            </Route>
        </Routes>
      
      </BrowserRouter>
  )
}
~~~

- La forma de añadir una ruta es esta

~~~js
<Route path="/" element={<IniciarSesion />}/>
~~~
- De esta manera puedo tener dos grupos de rutas.
- La ruta anidada Inicio no se renderiza porque hay que importar el Outlet de react-router-dom en Layout
- Mostrará el componente de Inicio donde defina el Outlet
- Asi puedo reutilizar una página principal (con un navbar, por ejemplo)
- Hay que indicar el index
~~~js
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import EditarCliente from './Paginas/EditarCliente'
import Inicio from './Paginas/Inicio'
import NuevoCliente from './Paginas/NuevoCliente'

function App() {
 

  return (
      <BrowserRouter>
        <Routes>
            
            <Route path="/clientes" element={<Layout />}>
                  <Route index element={<Inicio />} />
                  <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                  <Route path="editar/:id" element={<EditarCliente />} />
            </Route>

        </Routes>
      
      </BrowserRouter>
  )
}

export default App

~~~

- De esta manera en todas las páginas se verá desde Layout y lo que sea que incorpore lo inyecta en el outlet


~~~js
import{Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <h1>Desde Layout</h1>

        <Outlet />
    </div>
  )
}

export default Layout
~~~

# Hook useLocation()

- Tiene una sintaxis diferente a lo visto hasta ahora

        const location= useLocation()

- Si le hago un console.log viene el hash, el key, el pathname donde está la ubicación actual del navegador, el search para los query strings y el state.

        const urlActual= location.pathname

- Puedo usarlo para aplicarle estilos al link actual dónde me encuentro

~~~~js
<Link className={`${urlActual === '/clientes'? 'text-blue-300': 'text-white'} text-white text-2xl block mt-2`}>
~~~~

# Formik 

- Instalar

      npm i formik yup

- Importar 

    import {Formik, Form, Field} from 'formik'

- le añado un htmlFor para hacerlo accesible y un id al campo
~~~js

      <Formik>
        <Form>
          <div>
              <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="nombre"
                placeholder="Escribe tu nombre"/>

          </div>
        </Form>
      </Formik> 
~~~
- Se puede transformar un componente con el atributo as

~~~js
     <div className="mb-4">
              <label className="text-gray-800" htmlFor='notas'>Notas</label>
              <Field 
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe las notas"/>

          </div>
~~~

- En lugar de usar un useState Formik te da el initialValues,lo asocias a cada campo con el name
- Despues del formik abro llaves y encapsulo todo con un arrow function y paréntesis para dar por implicito el return
- De esta forma está asociado con el initialValues
- Con el onsubmit del Formik, si hago un console.log al values tengo el objeto del initialValues con los campos
~~~js

const Formulario = () => {
  return (
    <div className="md:w-3/4 mx-auto">
   
      <Formik
        initialValues={{
          nombre: '',
          empresa:'',
          email: '',
          telefono:'',
          notas:''

        }}
         onSubmit={(values)=>console.log(values)}
      >
        {()=>(
          
          <Form>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="nombre"
                placeholder="Escribe tu nombre"
                name= "nombre"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='empresa'>Empresa</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="empresa"
                placeholder="Escribe la empresa del cliente"
                name="empresa"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='email'>Email</label>
              <Field 
                type="email"
                className="mt-2 block w-full p-3 shadow"
                id="email"
                placeholder="Escribe el mail"
                name="email"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='telefono'>Teléfono</label>
              <Field 
                type="tel"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe el teléfono"
                name="telefono"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='notas'>Notas</label>
              <Field 
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe las notas"
                name="notas"/>

          </div>
          <input  
          type="submit" value="agregar cliente" className="bg-blue-700 text-white w-full uppercase font-bold text-xl"/> 
        </Form>
        )}

        


      </Formik> 
   
    </div>
  )
}

export default Formulario
~~~
- Puedo agregar la función hanldeSubmit al onSubmit para manejar todas las validaciones
        
        onSubmit={(values)=>handleSubmit(values)}

- Ahora puedo trabajar y enviar los valores a una Api o donde sea desde el handleSubmit

~~~js
const handleSubmit = (valores) =>{
 console.log(valores) 
}

~~~

# YUP

- Lo importo 
~~~js
import * as Yup from 'yup'
~~~

- Hay que hacer un schema, es un objeto con los campos que debe de tener 
~~~js
const nuevoClienteSchema= Yup.object().shape({
  nombre: '',
  empresa:'',
  email: '',
  telefono:'',
  notas:''
})

~~~

- debo señalarle a Formik dónde va a encontrar el schema de validación

~~~js
  <Formik
        initialValues={{
          nombre: '',
          empresa:'',
          email: '',
          telefono:'',
          notas:''

        }}
        onSubmit={(values)=>handleSubmit(values)}
        validationSchema ={nuevoClienteSchema}
      >
~~~
- Puedo abrir unas llaves para poner el return que antes estaba implicito en la arrow function que encapsula todo
- Así puedo poner un console.log(data) antes del return
~~~js
  {(data)=>{ console.log(data)
        
            return(
          
          <Form>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="nombre"
                placeholder="Escribe tu nombre"
                name= "nombre"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='empresa'>Empresa</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="empresa"
                placeholder="Escribe la empresa del cliente"
                name="empresa"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='email'>Email</label>
              <Field 
                type="email"
                className="mt-2 block w-full p-3 shadow"
                id="email"
                placeholder="Escribe el mail"
                name="email"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='telefono'>Teléfono</label>
              <Field 
                type="tel"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe el teléfono"
                name="telefono"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='notas'>Notas</label>
              <Field 
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe las notas"
                name="notas"/>

          </div>
          <input  
          type="submit" value="agregar cliente" className="bg-blue-700 text-white w-full uppercase font-bold text-xl"/> 
        </Form>
        )}}

~~~
- Lo que me interesa son los errors. Aplico destructuring en la arrow function que encapsula todo
- Debo indicar de que campo es el error. El touched es la propiedad de entrar y salir del campo en pantalla para validación en tiempo real

~~~js
  ({errors, touched})=>{
        
            return(
          
          <Form>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="nombre"
                placeholder="Escribe tu nombre"
                name= "nombre"
                 />
               
                 {errors.nombre && touched.nombre ? (
                  <div className="bg-red-800 text-white font-bold">{errors.nombre}</div>
                ): null}
~~~

- Puedo crear un componente Alerta que tome children para que sea reutilizable
- Puedo encadenar los métodos de validación
~~~js
const nuevoClienteSchema= Yup.object().shape({
  nombre: Yup.string()
              .min(3, "El nombre es muy corto")
              .max(20, "El nombre es muy largo")
              .required('El nombre es obligatorio'),
})

~~~

- Cuando el error sale en inglés debido a una de las opciones no especificada, puedes sobre-escribirlo tu con typeError

~~~js
const nuevoClienteSchema= Yup.object().shape({
  nombre: Yup.string()
              .min(3, "El nombre es muy corto")
              .max(20, "El nombre es muy largo")
              .required('El nombre es obligatorio'),
  empresa: Yup.string()
              .required("El campo es obligatorio"),
  email: Yup.string()
              .required("El email es obligatorio")
              .email("Debe de ser un email válido"),
  telefono: Yup.number()
                .integer()
                .positive()
                .typeError("El número no es válido")

})

~~~
# JSON SERVER

- Una REST (Representational State Transfer) API (Application Programming Interface)
    - debe de responder a los request de HTTP: GET, POST, PUT, PATCH, DELETE
- GET--> Obtener
- POST--> Enviar
- PUT/PATCH--> Actualizar
- DELETE--> Borrar

- Cuenta con Endpoints para hacer operaciones CRUD

- Instalar JSON Server como administrador

    npm i -g json-server

- Creo un archivo nuevo db.json en la raiz del proyecto con un objeto json

~~~js
{
    "clientes":[
      
      {
        "id":1,
        "nombre":"Pedro"
      }
    
    ]
}
~~~

- Ahora escribo

      json-server --watch db.json --port 4000

  ## Enviar datos a Json-Server

- Cuando no es un GET (fetch por defecto) hay que especificar el method.
- Como el server no puede albergar objetos, se pasa a string con stringify
- JSON-Server pide un header cuando se trata de metodos POST entre otros
~~~js

  const handleSubmit = async (valores) =>{
  try {
      const url = 'http://localhost:4000/clientes'

      const respuesta = await fetch(url,{
                      method: 'POST',
                      body: JSON.stringify(valores),
                      headers: {
                        "Content-Type": "application/json"
                      }
      })
      
      
      const resultado= await respuesta.json()

      
  
    } catch (error) {
    console.log(error)
  }
}

~~~

- Para resetear el formulario puedo extraer el resetForm de Formik en el onSubmit con desestructuración
~~~js
onSubmit={async (values, {resetForm})=>{ 
          await handleSubmit(values)
          resetForm()
        }}
~~~

## Hook useNavigate

- Lo importo de react-router-dom
~~~js
const navigate = useNavigate()
~~~

Lo puedo colocar al final del catch del handleSubmit para que me redireccione
~~~js
navigate("/clientes")
~~~

## Petición GET

- Para hacer una petición GET para mostrar los clientes en pantalla uso un useEffect que se disparará al menos una vez
- Creo un state para meter el resultado

~~~js
const Inicio = () => {
  
  const [clientes, setClientes] = useState([])
  
  useEffect(()=>{
    
    const obtenerClientesAPI = async()=>{
      try {
        const url = "http://localhost:4000/clientes"

      const resp = await fetch(url)
      const resultado = await resp.json()
      
      setClientes(resultado)
        
      } catch (error) {
        console.log(error)
      }

    }
    obtenerClientesAPI()
  }, [])

~~~

## useParams
- Cuando quieras leer un parámetro de la url, este es tu hook

~~~js
const params = useParams()
~~~

- Un console.log me devolverá un objeto con la ruta en la que estoy

