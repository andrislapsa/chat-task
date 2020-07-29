import React, { useState } from 'react';
import styles from './LandingPage.module.scss';


const ErrorMessage = ({ message }) => message && (
  <div className={styles.errorMessage}>
    {message}
  </div>
);

export function LandingPage({ onConnect, connectionError }) {
  const [nickname, setNickname] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    onConnect(nickname);
  }

  return (
    <div className={styles.root}>
      <h1>Intro page!</h1>
      <ErrorMessage message={connectionError} />
      <form onSubmit={onSubmit}>
        <label htmlFor="userNickname">
          Nickname:
        </label>
        <input
          type="text"
          onChange={({ target }) => setNickname(target.value)}
          placeholder='Enter your name and join the chat!'
          autoFocus
          id="userNickname"
        />
        <button type="submit">Connect</button>
      </form>
    </div>
  );
}
