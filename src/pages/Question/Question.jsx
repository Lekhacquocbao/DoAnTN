// src/components/ChatGPTUI.js
import React from 'react';
import styles from './Question.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const ChatGPTUI = () => {

  return (
    <div className={cx('chatgpt-ui')}>
      <div className={cx('header')}>
        <img src="https://via.placeholder.com/50" alt="Profile" className={cx('profile-picture')} />
        <div className={cx('welcome-text')}>
          <h1>Hello, Bảo Lê</h1>
          <p>How can I help you today?</p>
        </div>
      </div>

      <div className={cx('chat-input')}>
        <span className={cx('plus-icon')}>+</span>
        <input type="text" placeholder="Send a Message" />
      </div>
    </div>
  );
};

export default ChatGPTUI;