# Pruebas Unitarias

- Unitarias: enfocadas en pequeñas funcionalidades
- Integración: cómo funcionan varias piezas en conjunto
-------
- Ejemplo del coche:
    - unitarias: que la llanta gire bien, que sea una llanta, la resistencia es o no es la adecuada
    - integración: cojo 4 llantas, las monto en la carrocería y lo evaluo en conjunto el motor, las ventanas, el chasis, etc


---
- Tienen que ser:
    - Fáciles de escribir
    - Fáciles de leer
    - Confiables
    - Rápidas
    - Principalmente unitarias
---
Se aplican en tres pasos 
## AAA
    - Arrange---> Arreglar: preparamos el estado inical, el sujeto a probar. Se inician las constantes, las impoprtaciones, etc
    - Act-------> Actuar: aplicamos acciones o estímulos al sujeto. Llamar métodos, simular clics
    - Assert----> Afirmar: observar el comportamiento resultante: que algo cambie o no

            Las pruebas no son una prueba de que no haya errores. Estan hechas por human@s y l@s human@s cometemos errores
            Las pruebas pueden fallar
- Las librerías no son lo que se prueba, lo que se preban son las interacciones con esa librería que trabajen como se espera

- No hay que probarlo todo
- Se puede probar lo esencial si hay poco tiempo
- Los conceptos de las pruebas son aplicables en cualquier framework-lenguaje-librería
--------
### NOTA: en las anotaciones anteriores se usó useState como nombre de la función para explicar su funcionamiento, esto puede dar error. Cambiar a usState
-----
- npm i para reconstruir los módulos de node 
- npm start para iniciar la app 
-------
- Creo la capeta test en src
- Creo un nuevo archivo llamado demo.test.js
- El nombre no es importante, lo importante es la cola .test.js
- Debo hacer las importaciones en el archivo
- Ene l package JSON puedo ver en la seccion scripts, test: react-scripts test, preconfigurado para jest
# Jest-Expect- ToBe

- El snippet es test
- El comando para ejecutar es:
    - npm run test
- En el punto 3, la docu oficial anota muchos métodos para el expect
    Para comparar usaré el toBe
~~~~js

test('probando, probando...deben ser iguales los strings', ()=>{
    //punto 1, iniciar

    const mensa = "Hola Mundo!"

    //punto2, aplicar estimulo

    const mensa2: `Hola mundo!`

    //punto3
    
    expect(mensa).toBe(mensa2);

})


~~~~
- Pasa la prueba
- Al final de lo que escupe la consola, hay varias opciones tecleando w con una tecla, a,f q, p, t, Enter. Usar las flechas para elegir

- Coloco el test dentro del describe, por costumbre. Es opcional pero aconsejable

~~~~js
describe('Pruebas en el archivo demo.test.js', ()=>{

test('probando, probando...deben ser iguales los strings', ()=>{
    //punto 1, iniciar

    const mensa = "Hola Mundo!"

    //punto2, aplicar estimulo

    const mensa2: `Hola mundo!`

    //punto3
    
    expect(mensa).toBe(mensa2);

 })

})

~~~~

## Pruebas 

- Archivo a testear 02
- Para poder testear la función, es necesario exportarla usando export
- Archivo 02:
~~~js
const nombre = "Fer"
const apell = 'Kandinski'

const nombreCompleto = `${nombre} ${apellido}`

export function getSaludo(nombre){
    return 'Hola '+ nombre}
~~~
- test:
    - Guardo el getSaludo en una constante para poder manejarlo en el expect
    - Para poder usar las ayudas importar jest-dom 

~~~js
import '@testing-library/jest-dom'
import {getSaludo} from '../../02-template-strings';

describe('test de pruebas en el archivo 02', ()=>{

    test('probando que getSaludo retorna Hola + nombre', ()=>{

         const nombre: 'Fer'
         const saludo = getSaludo(nombre)
        
        //console.log(saludo)

        expect(saludo).toBe('Hola '+ nombre) 
        

    })
    

})
~~~

- Usando la tecla p al final del test y seleccionando el archivo en cuestión ejecuta solo ese archivo.
- Ahora pongamos que añado Carlos como valor por defecto en el archivo origen como nombre y quiero que
    -getSaludo debe de retornar hola Carlos si no hay argumento nombre

~~~js
import '@testing-library/jest-dom'
import {getSaludo} from '../../02-template-strings';

describe('test de pruebas en el archivo 02', ()=>{

    test('probando que getSaludo retorna Hola + nombre', ()=>{

         const nombre: 'Fer'
         const saludo = getSaludo(nombre)
        
        //console.log(saludo)

        expect(saludo).toBe('Hola '+ nombre) 
    }),
    test('getSaludo debe de retornar hola Carlos si no hay argumento nombre'()=>{
        const saludo = getSaludo()
        expect(saludo).toBe('Hola Carlos') 

    })

    

})
~~~

## toEqual

- Archivo a testear 05
~~~~js

export const getUser = () =>({
    uid: 'ABC123'
    username: 'SuperStar'
})

export const getUsuarioActive = (nombre) => ({
    uid: 'ABC567'
    username: nombre
})
~~~~
- archivo test:
- Importar getUSer y la libreria jest-dom
- Exportar la dfunción en el archivo origen con export
~~~~js
import '@testing-library/jest-dom'
import {getUser, getUsuarioActive} from '.....'

describe('Test en 05 funciones', ()=>{
    test('getUser debe de retornar un objeto', ()=>{

        const userTest={
            uid: 'ABC123'
            username: 'SuperStar'
        }
        const user = getUser()
        //console.log(user)

       // expect( user ).toBe(userTest)
       
       expect( user ).toEqual(userTest)
    })
    test('geUsuarioActive debe de retornar un objeto', ()=>{

        const nombre = 'Juan'
        const user = getUsuarioActive(nombre)

        expect(user).toEqual){
            uid: 'ABC567'
            username: nombre
        }
    })
})
~~~~
## El toBe en este caso dará error. Si tu comparas dos objetos vacíos como iguales {} === {} da false, porque apuntan a lugares distintos de memoria.
- Hay que usar el toEqual para comparar dos objetos


# Pruebas en el 07

- Archivo a testear:
~~~~js
export const retornaArreglo = ()=>{
    return ['ABC', 123]
}

const [letras, numeros] = retornaArreglo();
~~~~

- test, hacer las importaciones pertinentes
~~~~js
    describe('pruebas a 07', ()=>{
        test('Debe de retornar un string y un numero', ()=>{
                //primero preparo el ambiente, el sujeto a testear
               const arr =  retornaArreglo;
               expect(arr).toEqual (['ABC', 123])

        })
    })
~~~~
- Podría desestructurar arr con [letras, numeros] y usar dos expects más concretos
~~~~js

expect( letras ).toBe('ABC');
expect( type of letras ).toBe('string')

expect( numeros ).toBe(123);
expect( type of numeros ).toBe('number')
~~~~

# Pruebas en 08

- Hay una dependencia de data.heroes que no está, hay que volver a crear el archivo en data/heroes.js con el arreglo de objetos de superhéroes
- Importar heroes e importar getHeroeById y getHeroesByOwner
~~~~js
export const getHeroeById = (id) => heroes.find((heroe)=> heroe.id === heroe);

export const getHeroesByOwner = (owner) => heroes.find((heroe)=>heroe.owner === owner);
~~~~

~~~js
test('debe de retornar un heroe por id', ()=>{

    const id = 1;
    const heroe = getHeroeById(id)
    const heroeData= heroes.find( h => h.id === id) //esto arroja la data de heroe por id

    expect( heroe ).toEqual(heroeData)

})

~~~
- Podría mandar un id que no existiera, debe de retornar undefined
~~~js
    const id = 10
    const heroe = getHeroeById(id)
    const heroeData= heroes.find( h => h.id === id) //esto arroja la data de heroe por id

    expect( heroe ).toBe(undefined)  //al ser un primitivo se puede usar el toBe
~~~
~~~~js
test('debe de retornar un arreglo con los héroes de DC')
    const owner = DC
    const heroes = getHeroesByOwner(owner)

    const heroesData = heroes.filter((heroe)=>heroe.owner === owner)

    expect(heroes).toEqual(heroes.data
    )
~~~~
- Puedo evaluar si es correcto sabiendo que solo hay dos heroes de marvel con el .length
~~~js
expect(heores.length).toBe(2)
~~~

# Pruebas con tareas asíncronas
- Archivo 09
~~~~js
import {getHeroeById} from '.....'
export const getHeroeByIdAsync = (id) =>{
    
    return new Promise((resolve, reject)=>{
        
        setTimeout(()=>{
            const p1 = getHeroeById( id)
        if (p1){
            resolve(p1)
        }else{
            reject( 'No se encontró el héroe')
        }
       }, 200)
    })
}


~~~~

- test:
- getHeroe.. devuelve una promesa, espero que me devuelva el heroe
~~~~js

test('getHeroe debe de retornar un heroe', ()=>{

    const id = 2;
    heroe = getHeroeByIdAsync(id)
    .then(heroe=>{
        
        expect(true).toBe(false)
    })
})

~~~~
- Por increible que parezca , esta prueba pasa porque así se ejecutan de manera síncrona. No se ejecuta el código del expect

- Se le puede mandar un argumento al callback, en este caso done
    - Esto le dirá a mi test suite cuando debe de terminar la prueba

~~~~js
test('getHeroe debe de retornar un heroe', (done)=>{

    const id = 2;
    heroe = getHeroeByIdAsync(id)
    .then(heroe=>{
        
        expect(heroe).toBe(heroes.id);
        done();
    })
})
~~~~
- Si el heroe no existe mandaría el reject de 'No se encontró el héroe'

- Para manejar el error, cuando hay tareas asíncronas, hay que mandar el done e invocarlo

~~~~js

test('debe de retornar un error si heroe no existe', (done)=>{
    const id= 132;
    getHeroeByIdAsync(id).
    catch(error =>{
        expect(error).toEqual('No se encontró el héroe')
        done()
    })

})
~~~~

# Prueba con async-await

## NOTA: faltaba la desestructurarión de la url en el archivo original

~~~~javascript
    const getImagen = async()=>{

        try{
            
            const apiKey = '1234abc';
            const resp = await fetch(`http:endpoint.random?apikey=${ apiKey}`);
            const {data} = await resp.json();
            
            const {url} = data.images.original
            //el mismo código para crear la imagen en el html

            const img = document.createElement('img')
                img.src= url;
                document.body.append( img )
        
    }catch(error){
        console.error(error)
    }
}
getImagen()
 ~~~~       

- archivo de test: importar la función, la librería jest-dom para ver las ayudas 
- Si lleva async es que retorna una promesa
~~~~js
test('debe de retornar la url de la imagen', async ()=>{

    const url = await getImagen(); //este url es una promesa
    expect(url.includes('https://')).toBe(true)
})




~~~~























