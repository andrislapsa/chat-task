const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

const clientData = {};

wss.on('connection', function connection(ws, req) {
  console.log('someone connected!', req.url);

  const reqParams = new URLSearchParams(req.url.substr(1));
  clientData[req.headers['sec-websocket-key']] = { nickname: reqParams.get('nickname') };

  ws.on('message', function incoming(data) {
    const wrappedMessage = { nickname: clientData[req.headers['sec-websocket-key']].nickname, content: data };
    console.log('someone sent a message', wrappedMessage);

    wss.clients.forEach(function each(client) {
      if (/* client !== ws && */ client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(wrappedMessage));
      }
    });
  });
});
