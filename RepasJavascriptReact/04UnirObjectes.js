

const producte= {
    nom: "Tablet",
    preu: 300,
    disponible: true
}

const client = {
    nom: "Juan",
    premium: true
}

//const nouObjecte = Object.assign(producte, client) //Això te un problema, modifica l'original

//console.log(nouObjecte) //Com nom es igual esborra el nom de producte

//Millor utilitzar l'spread!!!

const nouObjecte2 = {
    producte: {...producte},
    client: {...client}
}

console.log(nouObjecte2)


