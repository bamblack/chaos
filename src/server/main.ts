const PORT = process.env.PORT || 3000;
const express = require('express');
const { Server } = require('ws');
const path = require('path');

const server = express()
    .use(express.static(path.resolve(__dirname, 'public')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws: any) => {
    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));
});
