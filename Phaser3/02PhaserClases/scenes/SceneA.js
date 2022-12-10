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

        for(let i = 0 ; i < 64; i++){
            const x = Phaser.Math.Between(0, 800)
            const y= Phaser.Math.Between(0, 600)

            const box = this.add.image(x,y,"crate").setInteractive()

            if(i %2){
                box
                 .setTint('0xff000')
                 .setData("badCrate", true)
            }
        }
        this.input.on("gameobjectup", this.clickHandler, this) //this es el contexto de la escena

    }

    clickHandler(pointer, box){
        if(this.lives === 0){
            return
        }
        
        box.setInteractive(false)
        box.setVisible(false)

        if(box.getData("badCrate")){
            this.lives--;
            this.registry.set("lives", this.lives)
        }else{
            this.score++
            this.registry.set("score", this.score)
        }
    }
    

}