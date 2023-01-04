const tecnologies = ["mongo", "node", "react", "angular"]

const newArray = tecnologies.filter((tech)=>(tech !== "mongo")) //Important!: el return implicit amb parèntesi

console.log(newArray)


const novesTecnologies2 = tecnologies.map((tech) =>{
    if(tech == "mongo"){ 
        return "HTML"}else{
                    return tech}})


const result = tecnologies.includes("node")

console.log(result)

//.some diu si almenys un dels elements cumpleix amb una condició

const numeros = [1,2,3,4,5,6,7,8,9]

console.log(numeros.some(numero => numero > 8)); //true

//per tornar el primer element que cumpleixi la condició utilitza find

console.log(numeros.find((num)=> num > 7))

//every retorna true o false si tots cumpleixen la condició

const resul= numeros.every((num)=> num > 0)

console.log(resul)

//reduce
console.log('*************************************************************')
const reducer = numeros.reduce((total, num)=>(total+ num, 10)) //0 es el numero en el que inicia**???

console.log(reducer)

tecnologies.forEach(tech=> console.log(tech))

const novesTech = tecnologies.map(tech=>{  
    if(tech === "react"){
        return "MySql"
    }else{
        return tech
    }})

    console.log(novesTech)