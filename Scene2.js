class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create() {
        const halfWidth = config.width / 2;
        const halfHeight = config.height / 2;

        this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
        this.background.setOrigin(0,0);

        this.ship1 = this.add.sprite(halfWidth - 50, halfHeight, "ship");
        this.ship2 = this.add.sprite(halfWidth, halfHeight, "ship2");
        this.ship3 = this.add.sprite(halfWidth + 50, halfHeight, "ship3");

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
        })

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();
 
        this.input.on('gameobjectdown',this.destroyShip , this);

     
        this.add.text(20, 20, "Playing game", {
            fill: "yellow",
            font: "25px Arial"
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

        this.powerUps = this.physics.add.group();

        let maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }

            powerUp.setVelocity(100,100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }
    }

    update() {
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
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