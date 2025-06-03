import { PlayScene } from "./scene.js";
import { game_measures as measures } from "./resources.js";

var config = {
    type: Phaser.AUTO,
    domCreateContainer: true,
    width: measures.width,
    height: measures.height,
    backgroundColor: 0x00000, 
    transparent: true,            
    parent: 'game',
    scene: [PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);


