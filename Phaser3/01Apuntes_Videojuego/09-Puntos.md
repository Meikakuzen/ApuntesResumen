# Puntos y Puntuación

- Declaro dos variables: el score y la del objeto Phaser de tipo texto. (Fuera de las funciones)

~~~js
var score= 0;
var scoreText;
~~~

- El objeto de texto se configura en la función create, por lo que voy abajo de esta función y escribo
- Los dos primeros parámetros es la ubicación, el tercero es el texto en si y luego un objeto JSON con el tamaño y color de la fuente

~~~js
scoreText= this.add.text(16,16, 'score:0', {fontSize: '32px', fill: '#000'})
~~~

- Hay que hacer un incremento en la función collectStar
- También seteo el texto con setText

~~~js
function collectStar(player, star){
    star.disableBody(true, true)

    score += 10
    scoreText.setText('Score: ' + score)
}
~~~
