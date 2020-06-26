import * as Phaser from 'phaser';
import { MainScene, MAIN_SCENE_KEY } from './scenes';
import { Player } from './models/Player';

export class ChaosGame {
    private game: Phaser.Game;

    constructor(
        private ws: WebSocket
    ) {
        const gameConfig: Phaser.Types.Core.GameConfig = {
            title: 'Chaos',
            type: Phaser.WEBGL,
            scale: {
                mode: Phaser.Scale.ScaleModes.RESIZE,
                width: 800,
                height: 800
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true
                }
            },
            parent: 'game',
            backgroundColor: 0x333333
        };

        this.game = new Phaser.Game(gameConfig);
        this.game.scene.add(MAIN_SCENE_KEY, MainScene, true)
    }
}
