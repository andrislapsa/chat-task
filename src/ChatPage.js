import React, { useEffect, useState, useRef } from 'react';
import { Message } from './Message';
import { SendMessage } from './SendMessage';


export function ChatPage({ nickname }) {
  const URL = 'ws://localhost:3030';
  const [messages, setMessages] = useState([]);
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(`${URL}?nickname=${nickname}`);
    console.log('WS inst created');

    webSocket.current.onopen = () => {
      console.log('connected');
    }

    webSocket.current.onmessage = evt => {
      const message = JSON.parse(evt.data);
      console.log('on message', message);
      setMessages(prev => prev.concat(message));
    }

    webSocket.current.onclose = () => {
      console.log('disconnected');
    }

    window.ACTIVE_WS = webSocket.current;
  }, [nickname]);

  function onSend(message) {
    webSocket.current.send(message);
  }

  return (
    <div>
      Welcome {nickname}
      <div>
        {messages.map((message, index) => (
          <Message
            nickname={message.nickname}
            isMe={message.nickname === nickname}
            content={message.content}
            key={index}
          />
        ))}
      </div>
      <SendMessage onSend={onSend} />
    </div>
  );
}
