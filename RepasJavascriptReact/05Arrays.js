const tecnologies = ["mongo", "node", "react", "angular"]

console.log(tecnologies[1])

console.log(tecnologies.length)
console.log(tecnologies.toString())

//Afegir , eliminar i reemplaçar elements sense modificar l'original
const nouArreglo =  [...tecnologies, "GraphQL"]

//.pop() y .shift() elimina del final i del principi respectivament, però altera l'original


//tecnologies.splice(1,3) //splice elimina desde un punt a un altre PERÒ TAMBÉ MODIFICA L¡ORIGINAL


//****************************FILTER*************************************** */

//Retorna un nou array

const novesTecnologies= tecnologies.filter((tech) =>(tech !=="mongo"))
console.log(novesTecnologies)

/***************************MAP**********************************************/

const novesTecnologies2 = tecnologies.map((tech) =>{
    if(tech == "mongo"){ 
        return "HTML"}else{
                    return tech}})

console.log(novesTecnologies2)






