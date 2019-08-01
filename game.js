/// <reference path="./libs/phaser.d.ts"/>

window.onload = () => {
    const config = {
        backgroundColor: 0x000000,
        height: 600,
        scene: [Scene1, Scene2],
        width: 800
    }
    const game = new Phaser.Game(config);
}  