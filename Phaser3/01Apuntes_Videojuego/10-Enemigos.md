# Bombas de rebote

- Cuando se lancen todas las estrellas se lanzará una bomba que rebotará. Si toca al personaje muere
- A la segunda ronda se lanzará otra bomba
- Lo primero que se necesita es un grupo para la bomba y un par de colliders
- Voy a create dónde creo una nueva variable en la que almacenar el grupo bombas
- Hago que las bombas colisionen con las plataformas
- Lo mismo con el jugador, y le pasaré una función que aún no he creado hitBomb. Le paso null y this
    - Con hitBomb se detendrá el juego y se pintará el personaje de rojo

~~~js
 bombs= this.physics.add.group();
    this.physics.add.collider(bombs, platforms)
    this.physics.add.collider(player, bombs, hitBomb, null, this)
~~~

- Creo la función de hitBomb ( fuera de las otras funciones ). Le paso como parámetros el jugador y la bomba ( que aún no he creado )
- Con pause paro el juego 
- Con setTint lo tiño de un color ( rojo en este caso )
- Selecciono la posición mirando hacia adelante
- Creo la variable gameOver con true

~~~js
function hitBomb(player, bomb){
    this.physics.pause()

    player.setTint('0xff0000')
    player.anims.play('turn')

    gameOver= true;
}
~~~

- Declaro gameOver como false arriba de todo, junto a las otras variables fuera de las funciones
- En update() voy a ponser un if

~~~js
   if(gameOver){
        return
    }
~~~

- En collectStar no se ha escrito nada para que se lance una bomba cuando recoja la última estrella
- Se usará el método countActive para saber cuantas quedan
- Cuando no queden vuelvo a disparar el código de las estrellas al inicio para reiniciarlas y que vuelvan a caer al juego

~~~js
function collectStar(player, star){
    star.disableBody(true, true)

    score += 10
    scoreText.setText('Score: ' + score)

    if(stars.countActive(true)=== 0){
        stars.children.iterate(function(child){
            //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)) ESTO NO FUNCIONA
            child.enableBody(true, child.x, 0, true, true) //ESTO SI
        })
    }
}
~~~

- Ahora hay que seleccionar una coordenada (siempre aleatoria a dónde esté el jugador para darle una oportunidad) desde donde sale la bomba
- Creo la bomba
- Que rebote un 1% con setBounce (un montón)
- que rebote contra los límites de la pantalla
- Le cambio la velocidad

~~~js
function collectStar(player, star){
    star.disableBody(true, true)

    score += 10
    scoreText.setText('Score: ' + score)

    if(stars.countActive(true)=== 0){
        stars.children.iterate(function(child){
            child.enableBody(true, child.x, 0, true, true)
        })
        var x= (player >400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(400,800)
    
        var bomb = bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200,200), 20)
    }

}
~~~