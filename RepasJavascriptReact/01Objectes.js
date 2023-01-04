

document.write("Hola!")

const producte= {
    nom: "Tablet",
    preu: 300,
    disponible: true
}


console.log(producte.nom)

producte.descompte = "20%"

console.log(producte)


//Destructuring

const {nom, preu, disponible, descompte} = producte

console.log(preu)

//Object Literal Enhacement

const autenticat = true
const usuari = "John"

const nouObjecte = {
    autenticat,
    usuari
}

console.log(nouObjecte)