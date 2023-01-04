const tecnologies= ["HTML", "Node", "React", "PHP", "Angular"]

const [html, node,,,angular] = tecnologies

//El destructuring als arrays son posicionals

console.log(html)
console.log(angular)

/*ITERADORS*/

//ForEach itera pero no crea un nuevo arreglo


tecnologies.forEach((tech)=>console.log(tech))

//map SI crea un nuevo arreglo

const newTecnologies= tecnologies.map((tech)=>"Minimoni")

console.log(newTecnologies)