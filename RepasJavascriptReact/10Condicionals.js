const num1= 10
const num2 = "10"

console.log(num1 == num2)

if(num1 === Number(num2)){
    console.log("son iguals")
}else{
    console.log("No son iguals")
}


const autenticado = true
if(autenticado){
    console.log("Está autenticado")
}

const saldo = 600;
const pagar = 300;
const tarjeta= true

if(saldo > pagar && tarjeta){
    console.log("Si puedes pagar")
}else{
    console.log("No, no pots pagar")
}

if(saldo < pagar || tarjeta){
    console.log("Puedes pagar con tarjeta")
}else{
    console.log("No puedes pagar")
}

//TERNARIOS

const condicion = tarjeta ? "Bieeeen!": "NO"

console.log(condicion)