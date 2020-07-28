import React from 'react';


export function Message({ type, nickname, isMe, message }) {
  if (type === 'system') {
    return (
      // TODO add style
      <div className='system'>
        {message}
      </div>
    );
  }

  return (
    <div>
      {isMe ? <strong>{nickname}</strong> : nickname} says: {message}
    </div>
  );
}
