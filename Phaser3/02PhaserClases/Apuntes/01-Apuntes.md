# Phaser con clases

- Enlazo los archivos .js con el html
- Creo el archivo de configuración en index.js
- La SceneA es un archivo que he creado yo 

~~~js
import { SceneA } from "./scenes/SceneA.js"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    parent: 'phaser-example',
    scene: [SceneA]
}

let game = new Phaser.Game(config)
~~~

- Creo y exporto la clase
- Extiendo de Phaser.Scene
- En el constructor uso super para poder usar el constructor padre y usar GameScene
- Inicio la puntuación y las vidas
- En la función preload cargo las imágenes
- En create añado la imágen del cielo (bg=background)


~~~js
export class SceneA extends Phaser.Scene{
    constructor(){
        super("GameScene")

        this.score= 0
        this.lives= 6
    }

    preload(){
        this.load.image('bg', './assets/sky.png')
        this.load.image('crate', './assets/star.png')
    }

    create(){
        this.registry.set("score", this.score)
        this.registry.set("lives", this.lives)

        this.add.image(400,300, "bg")
    }
}
~~~

- Guardo el score y las vidas en el registro del juego (algo parecido al localStorage)
- Añado el background (para ello debo haberla precargado antes)
- Creo un bucle para generar varias estrellas con .Math.Between para dispersarlas aleatoriamente
- Uso setTint para colorear algunas


~~~js
    create(){
        this.registry.set("score", this.score)
        this.registry.set("lives", this.lives)

        this.add.image(400,300, "bg")

        for(let i = 0 ; i < 64; i++){
            const x = Phaser.Math.Between(0, 800) //da un número ENTRE 0 y 800
            const y= Phaser.Math.Between(0, 600)

            const box = this.add.image(x,y,"crate").setInteractive() //permite que se pueda interactuar con el objeto

            if(i %2){
                box
                  .setTint('0xff000') // si box es par lo coloreo
                  .setData("badCrate", true) //le añado data para quitar vidas
            }
        }
    }
~~~

- Creo algo similar a un addEventListener con la función clickHandler que todavía no he creado
- Escucho un evento de Phaser y le digo el método que quiero ejecutar

~~~js
this.input.on("gameobjectup", this.clickHandler, this) //this es el contexto de la escena
~~~

- Fuera de create creo la función clcikHandler

~~~js
    clickHandler(pointer, box){
        
        if(this.lives===0){
            return
        }
        
        box.setInteractive(false);
        box.setVisible(false) //deja de ser interactivo y visible

        if(box.getData("badCrate")){
            this.lives--;
            this.registry.set("lives", this.lives) //Las coloreadas quitan vida
        }else{
            this.score++;
            this.registry.set("score", this.score)
        }
    }
~~~

- SceneB

~~~js
export class SceneB extends Phaser.Scene{
    
    constructor(){
        super({key : "UIScene", active: true});

       
    }

    create(){
        const score= this.scene.get("GameScene").score
        const lives= this.scene.get("GameScene").lives

        this.scoreText = this.add.text(10,10, `Score: ${score}`, {font: "32px", fill: "#000"}) //los primeros parámetros son las coordenadas
        this.livesText = this.add.text(10,40, `Lives: ${lives}` , {font:"32px", fill: "#000"})

        this.registry.events.on("changedata", this.updateData, this)

    }

    updateData(parent,key,data){
        if(key === "score"){
            this.scoreText.setText("Score: " + data)
        }else if ( key === "lives"){
            this.livesText.setText("Lives: " + data)
        }
    }
}
~~~