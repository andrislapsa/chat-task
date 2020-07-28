const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

const clientData = {};

function formatMessage(type, message, nickname) {
  const m = JSON.stringify({ type, message, nickname });
  console.log('formatted msg', m);
  return m;
}

function excludeClient(clients, client) {
  return [...clients].filter((c) => c !== client);
}

function notifyClients(clients, message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', function connection(ws, req) {
  console.log('someone connected!', req.url);

  const reqParams = new URLSearchParams(req.url.substr(1));
  const nickname = reqParams.get('nickname');
  clientData[req.headers['sec-websocket-key']] = { nickname };

  // clients excluding the current one (who sent the message)
  const otherClients = excludeClient(wss.clients, ws);
  notifyClients(otherClients, formatMessage('system', `${nickname} has joined the chat!`));

  ws.on('message', function incoming(data) {
    notifyClients(wss.clients, formatMessage('user', data, nickname));
  });
});
