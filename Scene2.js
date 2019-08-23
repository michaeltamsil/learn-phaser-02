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

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
 
        this.input.on('gameobjectdown',this.destroyShip , this);
     
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

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

        this.player = this.physics.add.sprite(halfWidth - 8, halfHeight + 64, "player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    update() {
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if(this.player.active){
                this.shootBeam();
            }
        }

        for(let i = 0; i < this.projectiles.getChildren().length; i++){
            const beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    hitEnemy(projectile, enemy) {
        let explosion = new Explosion(this , enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        
        this.score += 15;
        const scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated;

        

    }

    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);
        if (this.player.alpha<1){
            return;
        }
        var explosion = new Explosion(this, player.x, player.y);
        player.disableBody(true, true);
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        })
        // this.resetPlayer();
        // player.x = config.width / 2 -8;
        // player.y = config.height - 64;

    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityX(0);
        }

        if (this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityY(0);
        }
    }

    moveShip(ship, speed){
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
    }

    resetPlayer(){
        var x = config.width / 2 -8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            callbackScope: this,
            duration: 1500,
            ease: 'Power1',
            onComplete: function(){
                this.player.alpha = 1;
            },
            repeat: 0,
            targets: this.player,
            y: config.height - 64
        })
    }

    resetShipPos(ship) {
        ship.y = 0;
        const randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    shootBeam(){
        // const beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
        const beam = new Beam(this)
    }

    zeroPad(number, size) {
        let stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}