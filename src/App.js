import React, { useState, useCallback } from 'react';
import { LandingPage } from './LandingPage';
import { MessagesSource } from './MessagesSource';
import { ChatPage } from './ChatPage';


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [nickname, setNickname] = useState('');
  const [connectionError, setConnectionError] = useState(null);

  function onConnect(chosenNickname) {
    setIsConnecting(true);
    setNickname(chosenNickname);
  }

  const onConnected = useCallback(() => {
    setIsConnected(true);
    setIsConnecting(false);
    setConnectionError(null);
  }, []);

  const onDisconnect = useCallback((reason) => {
    setConnectionError(reason);
    setIsConnected(false);
  }, []);

  return (
    <>
      {!isConnected && (
        <LandingPage
          onConnect={onConnect}
          connectionError={connectionError}
        />
      )}
      {(isConnecting || isConnected) && (
        <MessagesSource
          onConnected={onConnected}
          onDisconnect={onDisconnect}
          nickname={nickname}
        >
          <ChatPage />
        </MessagesSource>
      )}
    </>
  );
}

export default App;
