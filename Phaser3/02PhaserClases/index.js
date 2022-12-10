import { SceneA } from "./scenes/SceneA.js"
import { SceneB } from "./scenes/SceneB.js"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene:[SceneA, SceneB]
}

let game = new Phaser.Game(config)