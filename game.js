/// <reference path="./libs/phaser.d.ts"/>

const config = {
    backgroundColor: 0x000000,
    height: 272,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    },
    scene: [Scene1, Scene2],
    width: 256
}
const game = new Phaser.Game(config);