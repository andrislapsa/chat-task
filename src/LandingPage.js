import React, { useState } from 'react';


export function LandingPage({ onConnect }) {
  const [nickname, setNickname] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    onConnect(nickname);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Nickname:
        <input
          type="text"
          onChange={({ target }) => setNickname(target.value)}
          autoFocus
        />
      </label>
      <button type="submit">Connect</button>
    </form>
  );
}
