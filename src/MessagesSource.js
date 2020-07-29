import React, { useEffect, useState, useRef } from 'react';


export function MessagesSource({ nickname, onDisconnect, onConnected, children }) {
  const URL = 'ws://localhost:3030';
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(`${URL}?nickname=${encodeURIComponent(nickname)}`);

    webSocket.current.onopen = () => {
      onConnected();
    }

    webSocket.current.onmessage = evt => {
      const message = JSON.parse(evt.data);
      setMessages(prev => prev.concat(message));

      // wait for at least one message before deciding that we can show chat room
      setIsLoading(false);
    }

    webSocket.current.onerror = () => {
      webSocket.current.onclose = () => {};
      onDisconnect('Cannot connect due to server error, try again later');
    }

    webSocket.current.onclose = (evt) => {
      onDisconnect(evt.reason || 'Disconnected due to server going offline');
    }
  }, [nickname, onConnected, onDisconnect]);

  function onSend(message) {
    webSocket.current.send(message);
  }

  function onTriggerDisconnect() {
    webSocket.current.onclose = () => {};
    webSocket.current.close();
    onDisconnect('You have left the chat');
  }

  if (isLoading) return null;

  return React.cloneElement(children, {
    nickname,
    messages,
    onSend,
    onTriggerDisconnect,
  });
}
