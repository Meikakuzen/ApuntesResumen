
const producte= {
    nom: "Tablet",
    preu: 300,
    disponible: true
}

//Object.freeze(producte)           d'aquesta manera es fa l'objecte inalterable


//Object.seal(producte)             d'aquesta manera nomes puc modificar les propietats existents pero no afegir ni eliminar
producte.nom = "Monitor 36"
producte.imatge = "imatge.jpg"

delete producte.disponible

console.log(producte)