import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { ChatPage } from './ChatPage';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [nickname, setNickname] = useState('');

  function onConnect(chosenNickname) {
    setIsConnected(true);
    setNickname(chosenNickname);
  }

  function onDisconnect(reason) {
    console.log('got disconnected because', reason);
    setIsConnected(false);
  }

  return (
    <>
      {isConnected ?
        <ChatPage
          onDisconnect={onDisconnect}
          nickname={nickname}
        /> :
        <LandingPage
          onConnect={onConnect}
        />
      }
    </>
  );
}

export default App;
