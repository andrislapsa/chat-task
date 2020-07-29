import React, { useState } from 'react';
import styles from './SendMessage.module.scss';


export function SendMessage({ onSend, onDisconnect }) {
  const [message, setMessage] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    onSend(message);
    setMessage('');
  }

  return (
    <form className={styles.root} onSubmit={onSubmit} >
      <label htmlFor="messageToSend">
        Message:
      </label>
      <input
        type="text"
        onChange={({ target }) => setMessage(target.value)}
        value={message}
        id="messageToSend"
        autoFocus
        placeholder="Write your message here and hit send"
      />
      <button type="submit">Send</button>
      <button type="button" onClick={onDisconnect}>Disconnect</button>
    </form>
  );
}
