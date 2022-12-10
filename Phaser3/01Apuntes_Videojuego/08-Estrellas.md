# Estrellas

- Dentro de create creo un nuevo grupo llamado stars en la función create
- Como rebotan será un grupo dinámico, le agrego la física
- Pongo que se repita 11 veces
- Establezco la posición que forma el grupo
    - Cada estrella se colocará en x:12 e y :0
    - stepX: 70 esto significa que el primer elemento se situará en x: 12 e y 0, y al segundo se le sumará a X estos 70
    - step son una manera muy útil para separar los elementos de un grupo en su creación

~~~js
    stars= this.physics.add.group({
        key:'star',
        repeat: 11,
        setXY:{x:12, y :0, stepX:70}
    })
~~~

- Este código que sigue, recorre todos los elementos del grupo y les da a cada uno un valor de rebote en Y aleatorio entre 0.4 y 0.8
-El rango es de 0 a 1
- Al empezar y en 0 se ve como aparecen desde arriba las estrellas pero hay que habilitar que choquen con las plataformas

~~~js
  stars.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(stars,platforms)
~~~

- Ahora se puede apreciar como tienen un rebote hasta que la gravedad las deja inmóviles en las plataformas
- Hay que crear una función para que cada vez que toque una estrella desaparezca (función aparte de preload, create y update)

~~~js
function collectStar(player, star){
    star.disableBody(true, true)
}
~~~

- Voy a create y creo una nueva física con overlap

~~~js
 this.physics.add.overlap(player,stars, collectStar, null, true)
~~~
