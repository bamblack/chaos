const HOST = location.origin.replace(/^http/, 'ws')
const ws: WebSocket = new WebSocket(HOST);
