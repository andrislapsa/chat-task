import React, { useEffect, useState, useRef } from 'react';


function Message({ nickname, isMe, content }) {
  return (
    <div>
      {isMe ? <strong>{nickname}</strong> : nickname} says: {content}
    </div>
  );
}

function SendMessage({ onSend }) {
  const [message, setMessage] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    onSend(message);
    setMessage('');
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Message:
        <input
          type="text"
          onChange={({ target }) => setMessage(target.value)}
          value={message}
          autoFocus
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

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
