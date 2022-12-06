# Context

- Para compartir data de cualquier tipo enter compoenntes está el context
- Está a un nivel superior. Todos aquellos componentes que esten dentro del contexto podrán acceder.
- En una página de login, tengo el user y una manera de establecer al user, setUser
- Login va a llamar al setUser para establecer el usuario.
- El homepage va a leer ese context para obtener los ultimos valores actualizados de ese usuario
---
 ## El context es un contenedor de info que está a un nivel superior, que le va a permitir a su hijos leer y ejecutar métodos.
-----
## Introduccion al router

- El router sirve para hacer una aplicación de una sola página.
- Yo no quiero que al cambiar de pág genere una nueva petición
- Una app puede tener más de un router
- Creo un componente llamado AppRouter.js
- Añado dos rutas de dos elementos creados anteriormente
~~~~js
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Home} from '../components/home'
import {About} from '../components/about'
import {Login} from '../components/login'

export const AppRouter = () => {
  return (
      <BrowserRouter>
        
        <Routes>
           
           
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

        </Routes>
    <BrowserRouter> 
  )
}
~~~~
- Uso el Link en lugar del anchor tag

~~~~js
import React from 'react'
import {Link} from 'react-router-dom'


export const NavBar = () =>{

    return{
        <div>
            <ul>
                <li>
                <Link to= "/"> Home </Link>
                </li>
                <li>
                <Link to= "/about"> About </Link>
                </li>
                <li>
                <Link to ="/login"> Login </Link>
                </li>
            </ul>
        
        </div>
    }
}
~~~~
- Se puede usar redireccionamiento por si no encuentra ninguna de las opciones
~~~~js

    <Route path="/login" element={<Login />} />
    
    <Redirect to="/">
~~~~
- la única diferencia con NavLink es que NavLink sirve para jugar con las clases CSS

- Copio un navbar de bootstrap
- Añado bootsrap al html en public
- La añado al AppRouter

- Voy

~~~~js

    export const AppRouter = () => {
      return (
          <BrowserRouter>
            <NavBar />        
            <Routes>
               
               
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
    
            </Routes>
        <BrowserRouter> 
      )
    }
~~~~
- Creo un userContext.js
- importo createContext
- createContext genera un contexto, lo almaceno en UserContext
- este UserContext puede contener elementos dentro, es un  "higher order component"
~~~~js
import {createContext} from 'react'

export const UserContext = createContext(null)

~~~~

- Si yo voy al main, y enmarco el AppRouter con el userContext
- Necesito el .Provider. Sirve para proveer la información
- Lo que quiero compartir se hace mediante la propiedad value

~~~~js
export const MainApp = () =>{

    const user = {
        id: 1234,
        name: "Fer",
        email: "sdldj@gmail.com"
    }


    return(
        <UserContext.Provider value={user}>
        
        <AppRouter />
        
        </UserContext.Provider>
    )
}

~~~~
- Si miro en la consola los componentes veo que ha cambiado 
- Puedo ver que hay una propiedad value con el objeto
- Si ahora necesito acceder al user desde el home por ejemplo?

~~~~js

export const HomeScreen = ()=>{
    const userContext = useContext(UserContext)
    return(
        <div>Home Screen</div>
    )
}
~~~~
- Uso el UserContext que definí.
Esto le dirá al useContext que use la primera instancia que definí en este arbol de componentes de tipo UserContext. Valor en el que guardé el contexto
- Ahora el userContext es el user que definí previamente que pasé alUserContext.provider como value
- Lo que ponga en el value va a ser accesible por aquellos elementos que estén dentro del contexto, en este caso UserContext
-----
# useContext
- Creo un useState
- Ahora el valor de user es un objeto vacío, lo puedo ver en components.

~~~~js
    export const MainApp = () =>{
        
        const [user, setUser] = useState({}) 
    
        return(
            <UserContext.Provider value={user}>
            
            <AppRouter />
            
            </UserContext.Provider>
        )
    }
~~~~
- Cómo hago para enviar más arghumentos al value para compartir?
- Puedo crearlo directamente como un objeto en el propio value
        
~~~js
        return(
            <UserContext.Provider value={{
                user,
                setUser,
            }}>
            
            <AppRouter />
            
            </UserContext.Provider>
        )
~~~
- Ahora tengo en values el user, el setUser, y el objeto vacío
- Si voy al home a hacer un console.log del userContext tengo el user y el setuser
- Uso la desestructuración para extraerlo
- Si lo imprimo tengo un objeto vacio
~~~~js
export const HomeScreen = ()=>{
    //const userContext = useContext(UserContext)
   const [user] = useContext(UserContext)
   return(
        <div>Home Screen</div>
    )
~~~~
- componente Login:
- Quiero aplicar el setUser con el botón del componente Login
~~~~js

export const LoginScreen = ()=>{


    return(
        <h1>Login</h1>
        <button></button>
    )
}
~~~~

~~~~js
export const LoginScreen = ()=>{

    const [setUser] = useContext(UserContext)

    return(
        <h1>Login</h1>
        <button onClick={()=>setUser({
            id: 123,
            name: "Yo mismo"
        })}></button>
    )
}
~~~~

- Si le doy click al botón y miro en consola, ya no tengo un objeto vacío
    - sino el 123 y Yo mismo

----
# Heroes App
- Borro todos los componentes que no voy a usar de la app.
- Borro lo innecesario del main hasta dejar solo el ReactDOM y las 2 importaciones
- Linkeo el bootstrap en el html de la carpeta public
- Creo la carpeta assets en src con las imágenes descargadas
- Creo un archivo como punto de entrada para renderizar en el index.js

~~~~js
import React from 'react'
import ReactDOM from 'react-dom'
import {HeroesApp} from './HeroesApp'


ReactDOM.render(
    <HeroesApp />,
    document.getElementById('root')
)

~~~~
## Creando un primer router

- Lo primero es definir las páginas a las que voy a navegar
- Esas páginas no son más que componentes , igual que lo demás
- Creo la carpeta components, con carpetas para DC, Marvel,Login,Search..
- En cada archivo monto un cascarón de componente
- MarvelScreen, DCScreen, LoginScreen, SearchScreen
- Tengo un navbar creado por bootstrap

## Para el manejo de las rutas me creo un directorio llamado routes


~~~~js
import {Routes, Route} from 'react-router-dom'
import {MarvelScreen} from './MarvelScreen'
import {DcScreen} from './DcScreen'
import {Login} from './LoginScreen'

export const AppRouter = ()=>{
    return(
        <div>
            <h1>Welcome to react router</h1>
            <Routes>
            <Route path="/" element ={<MarvelScreen />}>
            <Route path="/marvel" element ={<MarvelScreen />}>
            <Route path="/search" element ={<SearchScreen />}>
            <Route path="/dc" element ={<DcScreen />}>
            <Route path="/login" element ={<LoginScreen />}>
        </div>
    )
}

~~~~
Renderizo este AppRouter en mi HeroesApp
~~~~js
import {AppRouter} from './AppRouter'

export const HeroesApp = ()=>{
    return(
        <AppRouter />
    )
}

~~~~
- Error!: useRoutes solo puede ser usado en un contexto de Router component
- En el punto mas alto, hay que envolver la app con BrowserRouter


~~~js
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {MarvelScreen} from './MarvelScreen'
import {DcScreen} from './DcScreen'
import {Login} from './LoginScreen'
import {NavBar} from './NavBar'


export const AppRouter = ()=>{
    return(
        <BrowserRouter>
            <NavBar />
            
            <Routes>
            
            <Route path="/" element ={<MarvelScreen />}>
            <Route path="/marvel" element ={<MarvelScreen />}>
            <Route path="/search" element ={<SearchScreen />}>
            <Route path="/dc" element ={<DcScreen />}>
            <Route path="/login" element ={<LoginScreen />}>
        
            </Routes>

        </BrowserRouter>
    )
}
~~~
- ActiveClassName ya no existe. Esta coloca la clase activa cuando coincide la ruta con el link de enlace
- Creo un botón de Logout al final del NavBar
- Creo un handleLogout y lo pongo en el onClick del button
- Manejo el isActive que viene implícito en las props del NavLink
- Puedo transformar el className en una función de flecha, y desestructurar isActive de las props
- Hago un ternario diciendo si es active añade active si no, string vacío , no añadas active

- Si está en Marvel no esta en DC y viceversa
- Ahora necesito un segundo router donde este el usuario sin login, sin la navbar, todo distinto


~~~~js
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

	
	export const Navbar = () => {

		const handleLogOut =()=>{
			navigate('/login', {replace: true})
		}
		const navigate = useNavigate();
	    return (
	        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
	            
	            <Link 
	                className="navbar-brand" 
	                to="/"
	            >
	                Asociaciones
	            </Link>
	
	            <div className="navbar-collapse">
	                <div className="navbar-nav">
	
	            <NavLink
				 className={({isActive}) =>"nav-item nav-link" + (isActive? 'active': '')} 
	             to="/marvel">
	                        Marvel
	           </NavLink>
	
	             <NavLink 
	              className={({isActive}) =>"nav-item nav-link" + (isActive? 'active': '')} to="/dc">
	                        DC
	                    </NavLink>
	                </div>
	            </div>
	
	            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
	                <ul className="navbar-nav ml-auto">
						<span
						className="nav-item nav-link text-info">
							Fer
						</span>
	                    <button
							onClick = {handleLogOut}
	                        className="nav-item nav-link" 
	                        exact
	                        to="/login"
	                    >
	                        Logout
	                    </button>
	                </ul>
	            </div>
	        </nav>
	    )
	}
//NOTA: en este script ya está hecho el ejercicio del segundo router	
~~~~

- Creo el DashboardRoutes.js en routers
- Hago las importaciones necesarias, necesito todas las rutas excepto el login
- Añado un HeroeScreen
~~~~js
import {Routes, Route} from 'react-router-dom'
import {MarvelScreen} from '../components/Marvel/MarvelScreen'
import {DcScreen} from '../components/DC/DcScreen'
import {Heroe} from '../components/Heroe/Heroe'
import {SearchScreen} from '../components/Search/SearchScreen'
import {Navbar} from '../components/UI/NavBar'
import{HeroeScreen} from './components/HeroeScreen.js'

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
            <Route path="/Marvel" element={<MarvelScreen />} />
            <Route path="/Dc" element={<DcScreen />} />
            <Route path="/Search" element={<SearchScreen />} />
            <Route path="/" element={<MarvelScreen />} />
            <Route path="/Heroe" element={<Heroe />}  />
        </Routes>
    </>
  )
}
~~~~
- el AppRouter quedó así, sin el navbar ni las rutas
- Solo el login y creo una nueva ruta
- Estoy diciendo que todas las otras rutas desde / pasan por el DashboardRoutes
- El BrowserRouter  no se coloca en rutas hijas

~~~~js
import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {LoginScreen} from '../components/login/LoginScreen'

import { DashboardRoutes } from './DashboardRoutes'


export const AppRouter = () => {
  return (
      <BrowserRouter>
        
        <Routes>
           
           
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/*" element={<DashboardRoutes />} />


        </Routes>
    
    
    </BrowserRouter>

  )
}
~~~~
# Navigate y useNavigate
- Ahora voy a gestionar la navegación del login al navbar e inversa
- Creo un botón para el Login
- Los hooks facilitan el poder extraer lógica de una manera muy sencilla
- useNavigate me va a regresar el navigate. Me permite navegar a otras pantallas
- En el handleLogin uso navigate y especifico la ruta 
- replace en true para que reemplace el history y no poder volver atrás despues del login

~~~~js
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginScreen = () => {
  
  const navigate = useNavigate();
  
  const handleLogin =() =>{
    navigate("/Marvel", {
      replace: true  //que en lugar de hacer una nueva entrada ne el history la reemplace
    })
  }
 
  return (
    <div className="container mt-5">
        <h1>Login</h1>
    

      <button className="btn btn-primary"
      onClick ={handleLogin}
      >Login</button>
    </div>

  )
}
~~~~
- Ahora creo el handleLogOut, que ya se veia en eel navbar anteriormente y envío la ruta
- Ver NavBar anterior 
- Lo que va a servir realmente para navegar de esta manera son rutas privadas y rutas públicas






