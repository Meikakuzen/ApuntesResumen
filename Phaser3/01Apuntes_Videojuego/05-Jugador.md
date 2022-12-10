# El Jugador

- Creo la variable player
- Utilizo las fisicas y el método sprite
    - El primer argumento es el eje x, el segundo y, el tercero el nombre del sprite

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    platforms.create(600,400, 'platform')
    platforms.create(50,250, 'platform')
    platforms.create(750,220, 'platform')

    player= this.physics.add.sprite(100, 450, 'dude')
}
~~~

- El jugador cae porque no le hemos indicado que colisione con los limites del juego

~~~js
player.setCollideWorldBounds(true)
~~~

- Con esto respeta los límites de la pantalla pero aún no respeta las plataformas
- Cae demasiado brusco
- Le puedo colocar un valor desde el 0 al 1 para modificar esto

~~~js
player.setBounce(0.2)
~~~

- Falta crear las animaciones para moverlo de izquierda a derecha
- Hay 9 fotogramas en total ( en este caso )
    - 4 para correr hacia la izquierda
    - 1 para mirar hacia la cámara
    - 4 para correr a la derecha
- dentro de la función this.anims.create creo un objeto
    - Dentro del objeto creo una key para poder hallar esta animación a la hora de usarla luego
    - Creo la propiedad frame. En su función hay dos parámetros:
        - 1-el sprite que quiero usar
        - 2- un objeto donde le indico en qué fotograma quiero que empiece y en cual quiero que termine
    - También creo el frameRate en 10 (10 fotogramas por segundo) y el repeat en -1 (la animación debe volver a empezar cuando termine)

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    platforms.create(600,400, 'platform')
    platforms.create(50,250, 'platform')
    platforms.create(750,220, 'platform')

    player= this.physics.add.sprite(100, 450, 'dude')

    player.setCollideWorldBounds(true)
    player.setBounce(0.2)

    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end:3}),
        frameRate: 10,
        repeat: -1
    })
}
~~~

- Ahora hay que crear las otras dos animaciones: 
    - cuando se quede quieto. Lo llamo turn. En frame le indico que sprite y qué fotograma abriendo llaves dentro de corchetes. 20 frames por segundo y este no se repite
    - cuando vaya a la derecha. Le indico los frames correspondientes y que se repita

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    
    platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    platforms.create(600,400, 'platform')
    platforms.create(50,250, 'platform')
    platforms.create(750,220, 'platform')

    player= this.physics.add.sprite(100, 450, 'dude')

    player.setCollideWorldBounds(true)
    player.setBounce(0.2)

    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end:3}),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key:'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
    })
    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end:8}),
        frameRate: 10,
        repeat: -1
    })
}
~~~