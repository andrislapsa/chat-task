import React, { useState } from 'react';
import styles from './LandingPage.module.scss';


export function LandingPage({ onConnect }) {
  const [nickname, setNickname] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    onConnect(nickname);
  }

  return (
    <div className={styles.root}>
      <h1>Intro page!</h1>
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
