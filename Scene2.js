class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create() {
        const halfWidth = config.width / 2;
        const halfHeight = config.height / 2;

        // this.background = this.add.image(0, 0, "background");
        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);

        this.ship1 = this.add.image(halfWidth - 50, halfHeight, "ship");
        this.ship2 = this.add.image(halfWidth, halfHeight, "ship2");
        this.ship3 = this.add.image(halfWidth + 50, halfHeight, "ship3");

        // this.ship1.setScale(2);
        // this.ship1.flipY = true;

        this.add.text(20, 20, "Playing game", {
            fill: "yellow",
            font: "25px Arial"
        })
    }

    update() {
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;
    }


    moveShip(ship, speed){
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        const randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }
}