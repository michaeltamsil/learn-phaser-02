class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        
        const x = scene.player.x;
        const y = scene.player.y;

        super(scene, x, y, "beam");
        scene.projectiles.add(this);
        scene.add.existing(this);
        
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;
    }

    update() {
        if(this.y < -32  ) {
            this.destroy();
        }

    }
}