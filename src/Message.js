import React from 'react';


export function Message({ nickname, isMe, content }) {
  return (
    <div>
      {isMe ? <strong>{nickname}</strong> : nickname} says: {content}
    </div>
  );
}
