# Cargar la escena

- Guardo en una variable llamada platforms lo que serán las físicas de la plataforma de tipo estático
    - Hay de tipo estático y de tipo dinámico
    - Como las plataformas no se moverán son de tipo estático

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()
}
~~~

- En config creo las físicas

~~~js
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: "arcade",
        arcade:{
            gravity: {y: 300},
            debug: false
        }
    },
    scene:{
        preload,
        create,
        update
    }
}
~~~ 

- Ahora ya puedo usar physics con las imagenes
- Uso setScale para aumentar al doble su tamaño, porque mide 400 x 32. Si la escalo por 2 tengo 800 x 64

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2)
}
~~~

- Ubico tres plataformas más

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2)
    platforms.create(600,400, 'platform')
    platforms.create(50,250, 'platform')
    platforms.create(750,220, 'platform')
}
~~~



