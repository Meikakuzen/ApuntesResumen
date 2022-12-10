# Controlando personaje

- Phaser tiene un gestor de teclado incorporado
- Creo la variable cursors
- esta línea crea el objeto cursor con cuatro propiedades: arriba, abajo, izquierda, derecha

~~~js
cursors= this.input.keyboard.createCursorKeys()
~~~

- Ahora, para controlar que tecla se esta presionando voy a la función update
- Uso el if
- Cambio su velocidad al moverse. Cómo quiero que se mueva a la izquierda le aplico un número negativo
- Además de moverse quiero aplicarle la animación que he creado anteriormente
- anims.play tiene 2 parámetros
    - primero la animación creada
    - luego un true para que se ejecute

~~~js
function update(){
    if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true)
    }else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true)
    }else{
        player.setVelocityX(0);
        player.anims.play('turn', true)
    }
}
~~~

- Ahora falta saltar
- Verifico que la tecla arriba esté pulsada y que el personaje toque el suelo
- Le aplico una velocidad en Y negativa

~~~js
function update(){
    if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true)
    }else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true)
    }else{
        player.setVelocityX(0);
        player.anims.play('turn', true)
    }

    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330)
    }
}
~~~




