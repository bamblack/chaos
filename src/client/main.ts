import { ChaosGame } from './game';

let chaos: ChaosGame;
const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);

ws.onopen = (e: Event) => {
    chaos = new ChaosGame(ws);
}
