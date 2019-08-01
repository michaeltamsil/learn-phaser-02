/// <reference path="./libs/phaser.d.ts"/>

class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootgame");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}