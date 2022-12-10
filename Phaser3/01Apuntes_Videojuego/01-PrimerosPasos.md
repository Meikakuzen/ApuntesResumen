# Primeros pasos

- Descargo Phaser (la versión min.js o el archivo de js sin comprimir)
- Enlazo el archivo en el html y enlazo también el script.js que he creado
- Queda tal que así:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            margin: 0;
            background: #000
        }
    </style>
</head>
<body>
    
    <script src="phaser.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
~~~

- También se puede instalar con npm (no hace falta importar Phaser)

> npm install phaser@3.55.2

- Hay que usar Live Server para poder visualizar los cambios
- Ahora voy al script.js
- Todo juego en Phaser se configura con una variable de tipo JSON
- Es necesario asignar una instancia de un objeto Phaser.Game a una variable local
- En la variable config, en el type puede ser 
    - Phaser.CANVAS
    - Phaser.WEBGL
    - Phaser.AUTO
- Usar AUTO significa que intentará usar WEBGL y si no puede usará CANVAS. Es el recomendado
- A continuación establezco las medidas de la pantalla
- Creo la escena con 3 propiedades: 
    - preload
    - create
    - update
- Creo las funciones

~~~js
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:{
        preload,
        create,
        update
    }
}

var game = new Phaser.Game(config)

function preload(){

}

function create(){

}

function update(){
    
}
~~~

- En preload es dónde voy a cargar todo lo que se necesita antes de iniciar el juego 
- En create es añadir los distintos objetos, sea las plataformas, el fondo, etc
- En update para estar viendo si el jugador se mueve a la izquierda, derecha, si está saltando, etc.
    - Se actualiza a cada segundo para poder captar lo que está haciendo el usuario