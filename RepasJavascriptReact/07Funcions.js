//Function Declaration

suma(3,4)   // Puc invocar-la abans de crearla pel funcionament de javascript de primer creació i dsprés execució

function suma( a, b ){
    console.log( a+ b ) 
}


function resta( a=10, b= 4 ){ //paràmetres per defecte
    console.log(a-b)
}


resta(10, 20) //podria no passar-li arguments i agafaria els de per defecte (a=10, b=4)

resta(5) //agafa només el primer paràmetre

/*Per extreure el valor puc guardar-lo en una variable o fer desestructuració*/


function suma(a=8, b=4){
    return [a+b, "hola"]
}

const resultat = suma()

const [resultat1, hola] = suma()

console.log(resultat1, hola)

//Podria retornar-ho com un objecte

function resta(a=3,b=2){
    return{
        resultat: a-b,
        missatge: "hola mòn!"
    }
}

const {resultat: resul, missatge} = resta()

console.log(resul, missatge)