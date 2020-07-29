import React from 'react';
import classnames from 'classnames';
import styles from './Message.module.scss';


export function Message({ type, nickname, isMe, message }) {
  if (type === 'system') {
    return (
      <div className={styles.system}>
        {message}
      </div>
    );
  }

  return (
    <div className={classnames(styles.user, { [styles.me]: isMe })}>
      <strong>{nickname}</strong> says: {message}
    </div>
  );
}
