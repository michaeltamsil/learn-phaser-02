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
        });

        this.load.spritesheet("power-up", "./assets/spritesheets/power-up.png", {
            frameHeight: 16,
            frameWidth: 16
        });

        this.load.spritesheet("player", "./assets/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24
        });

        this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
            frameHeight: 16,
            frameWidth: 16
        });

        this.load.bitmapFont("pixelFont", "assets/font/font.png","assets/font/font.xml");

        this.load.audio("audio_beam", ["./assets/sounds/beam.ogg", "./assets/sounds/beam.mp3"]);
        this.load.audio("audio_explosion", ["./assets/sounds/explosion.ogg", "./assets/sounds/explosion.mp3"]);
        this.load.audio("audio_pickup", ["./assets/sounds/pickup.ogg", "./assets/sounds/pickup.mp3"]);
        this.load.audio("music", ["./assets/sounds/sci-fi_platformer12.ogg", "./assets/sounds/sci-fi_platformer12.mp3"]);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");

        this.anims.create({
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            key: "ship1_anim",
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            key: "ship2_anim",
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            key: "ship3_anim",
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            hideOnComplete: true,
            key: "explode",
            repeat: 0
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            key: 'red',
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("power-up", {
                start:2,
                end: 3
            }),
            frameRate: 20,
            key: 'gray',
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            key: 'thrust',
            repeat: -1
        });

        this.anims.create({
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            key: "beam_anim",
            repeat: -1
        });
    }
}