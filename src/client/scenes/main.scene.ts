import { Player } from "../models";
import { InfoScene, INFO_SCENE_KEY, IInfoSceneData } from "./info.scene";

export const MAIN_SCENE_KEY = 'MAIN';
const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: MAIN_SCENE_KEY
};

export class MainScene extends Phaser.Scene {
    private player?: Player;

    constructor() {
        super(sceneConfig);
    }

    public init(): void {
        console.log('[Main][Init]');
    }

    public preload(): void {
        console.log('[Main][Preload]');

        this.load.image('ball', 'assets/img/sprites/ball.png');
        this.load.image('tiles', 'assets/tiles/chaos_1/tiles.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tiles/chaos_1/chaos_1.json');
    }

    public create(): void {
        console.log('[Main][Create]');

        // key of tilemapTiledJSON above
        const tileMap = this.make.tilemap({ key: 'tilemap' });
        // name of the tileset from chaos_1.json and key of tiles above
        const tileset = tileMap.addTilesetImage('tiles', 'tiles', 48, 48);

        // name of layers inside chaos_1.json
        const belowLayer = tileMap.createStaticLayer('Ground Layer', tileset, 0, 0);
        const worldLayer = tileMap.createStaticLayer('World Layer', tileset, 0, 0);

        // make 0, 0 the center
        const width = tileMap.widthInPixels;
        const height = tileMap.heightInPixels;
        const mapBoundX = (width / 2) * -1;
        const mapBoundY = (height / 2) * -1;

        // adjust the bounds of everything
        belowLayer.setX(mapBoundX);
        belowLayer.setY(mapBoundY);
        worldLayer.setX(mapBoundX);
        worldLayer.setY(mapBoundY);
        this.cameras.main.setBounds(mapBoundX, mapBoundY, width, height);
        this.physics.world.setBounds(mapBoundX, mapBoundY, width, height);

        // get a tile from the groundLayer where the worldLayer doesn't have a tile
        // in that same position
        let needValidGroundLayerTile = true;
        let playerStartingX = 0;
        let playerStartingY = 0;
        while (needValidGroundLayerTile) {
            const randomX = Math.floor(Math.random() * (width / 2)) * (Math.floor(Math.random() * 2) ? 1 : -1);
            const randomY = Math.floor(Math.random() * (height / 2)) * (Math.floor(Math.random() * 2) ? 1 : -1);
            console.log(randomX, randomY);

            const worldLayerTile = worldLayer.getTileAtWorldXY(randomX, randomY)
            if (!worldLayerTile) {
                needValidGroundLayerTile = false;
                playerStartingX = randomX;
                playerStartingY = randomY;
            }
        }


        this.player = new Player(this, playerStartingX, playerStartingY);
        this.player.registerNewScene(this);

        // set collision for all the tiles on worldLayer and then add collision between that layer and player
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player.sprite, worldLayer);

        // now add our info scene
        this.scene.add(INFO_SCENE_KEY, InfoScene, true, { parent: this, player: this.player } as IInfoSceneData);
    }

    public update(): void {
        this.player?.update();
    }
}
