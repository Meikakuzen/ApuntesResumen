# Cuerpos y Velocidad

- Cuando se crea un sprite con físicas se le asigna unas propiedades al body, que es una referencia el cuerpo físico dentro del sistema de arcade de Phaser
- Body tiene muchas propiedades y métodos con los que jugar
- Con player.body.setGravityY() puedo cambiar la gravedad del personaje
    - Cuanto mayor sea el valor más denso será el objeto y más rápido caerá
    - Si le pongo 2 parece que esté en el espacio
    - Lo dejo en 300 que es la gravedad que seteé en physics
- Para hacer que el personaje colisione con las plataformas hayq ue crear un objeto collider
    - hay que indicarle entre que dos objetos se toquen y mantengan sus físicas

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

    player.body.setGravityY(300);

    this.physics.add.collider(player,platforms)
}
~~~

- Ahora el personaje respeta el suelo