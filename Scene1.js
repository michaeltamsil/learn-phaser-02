/// <reference path="./libs/phaser.d.ts"/>

class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootgame");
    }

    preload(){
        this.load.image("background", "./assets/images/background.png")        
        
        this.load.spritesheet("ship", "./assets/spritesheets/ship.png", {
            frameHeight: 16,
            frameWidth: 16
        });
        
        this.load.spritesheet("ship2", "./assets/spritesheets/ship2.png", {
            frameHeight: 16,
            frameWidth: 32
        })
        
        this.load.spritesheet("ship3", "./assets/spritesheets/ship3.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
            frameHeight: 16,
            frameWidth: 16
        })
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}