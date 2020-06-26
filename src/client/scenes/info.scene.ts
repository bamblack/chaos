import { Player } from "../models";

export const INFO_SCENE_KEY = 'INFO';
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: INFO_SCENE_KEY
};

export interface IInfoSceneData {
    parent: Phaser.Scene;
    player: Player
}

export class InfoScene extends Phaser.Scene {
    private parent?: Phaser.Scene;
    private player?: Player;
    private playerCoordsText?: Phaser.GameObjects.Text;

    constructor() {
        super(sceneConfig);
    }

    public init(data: IInfoSceneData): void {
        console.log('[Info][Init]');

        this.parent = data.parent;
        this.player = data.player;
    }

    public preload(): void {
        console.log('[Info][Preload]');
    }

    public create(data: IInfoSceneData): void {
        console.log('[Info][Create]');

        this.playerCoordsText = this.add.text(0, 5, '')
            .setFontSize(20)
            .setStroke('111111', 3);
    }

    public update(): void {
        const x = this.player?.sprite.x.toFixed(0);
        const y = this.player?.sprite.y.toFixed(0);
        this.playerCoordsText?.setText(`X: ${x}, Y: ${y}`);

        // reposition it to be centered
        const playerCoordsTextWidth = this.playerCoordsText?.width || 0;
        const centerX = this.scale.width / 2;
        const playerCoordsX = centerX - (playerCoordsTextWidth / 2);

        this.playerCoordsText?.setX(playerCoordsX);
    }
}
