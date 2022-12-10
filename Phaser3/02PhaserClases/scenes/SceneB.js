export class SceneB extends Phaser.Scene{
    
    constructor(){
        super({key : "UIScene", active: true});
    }

    create(){
        const score= this.scene.get("GameScene").score
        const lives= this.scene.get("GameScene").lives

        this.scoreText = this.add.text(10,10, `Score: ${score}` , {font: "32px", fill: "#000"}) //los primeros parámetros son las coordenadas
        this.livesText = this.add.text(10,48, `Lives: ${lives}`, {font:"32px", fill: "#000"})

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