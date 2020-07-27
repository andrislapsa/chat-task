import React, { useState } from 'react';


export function SendMessage({ onSend }) {
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
