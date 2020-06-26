const SPEED = 250;
export class Player {
    public sprite: Phaser.GameObjects.Sprite;

    private keys: Phaser.Types.Input.Keyboard.CursorKeys;
    private scene: Phaser.Scene;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        this.scene = scene;
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A
        });

        this.sprite = scene.physics.add
            .sprite(x, y, 'ball')
            .setScale(0.5)
            .setSize(35, 35)
            .setCollideWorldBounds(true);

        scene.cameras.main.startFollow(this.sprite);
    }

    public destroy(): void {
        this.sprite?.destroy();
    }

    public registerNewScene(scene: Phaser.Scene): void {

    }

    public update(): void {
        const spriteBody = this.sprite.body as Phaser.Physics.Arcade.Body;
        spriteBody.setVelocity(0);

        if (this.keys.up?.isDown) {
            spriteBody.setVelocityY(-SPEED);
        } else if (this.keys.down?.isDown) {
            spriteBody.setVelocityY(SPEED);
        }

        if (this.keys.left?.isDown) {
            spriteBody.setVelocityX(-SPEED);
        } else if (this.keys.right?.isDown) {
            spriteBody.setVelocityX(SPEED);
        }

        spriteBody.velocity.normalize().scale(SPEED);
    }
}
