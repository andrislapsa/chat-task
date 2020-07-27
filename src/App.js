import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { ChatPage } from './ChatPage';
import './App.css';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [nickname, setNickname] = useState('');

  function onConnect(chosenNickname) {
    setIsConnected(true);
    setNickname(chosenNickname);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  return (
    <div className="App">
      {isConnected ?
        <ChatPage
          onDisconnect={onDisconnect}
          nickname={nickname}
        /> :
        <LandingPage
          onConnect={onConnect}
        />
      }
    </div>
  );
}

export default App;
