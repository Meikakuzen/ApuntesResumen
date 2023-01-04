

const producte= {
    nom: "Tablet",
    preu: 300,
    disponible: true
}

const client = {
    nom: "Juan",
    premium: true
}


const {nom, preu, disponible} = producte
//Si fiag destructuring de client tindré dos variables anomenades nom

const {nom: nomClient, premium}= client

console.log(nomClient)