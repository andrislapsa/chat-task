import React, { useRef, useEffect } from 'react';
import { Message } from './Message';
import { SendMessage } from './SendMessage';
import styles from './ChatPage.module.scss';


export function ChatPage({ nickname, onSend, messages, onTriggerDisconnect }) {
  const afterMessagesEl = useRef();

  useEffect(() => {
    afterMessagesEl.current.scrollIntoView();
  }, [messages])

  return (
    <div className={styles.root}>
      <div className={styles.messages}>
        <div>Welcome to chat <strong>{nickname}</strong>!</div>
        {messages.map((message, index) => (
          <Message
            isMe={message.nickname === nickname}
            {...message}
            key={index}
          />
        ))}
        <div ref={afterMessagesEl} />
      </div>
      <div className={styles.sendMessage}>
        <SendMessage onSend={onSend} onDisconnect={onTriggerDisconnect} />
      </div>
    </div>
  );
}
