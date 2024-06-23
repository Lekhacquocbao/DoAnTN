import React, { useState, useEffect } from 'react';
import styles from './Question.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

const ChatGPTUI = () => {
  const [questionAns, setQuestionAns] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false); // Thêm state để quản lý loader

  const handleSubmit = async (prompt) => {
    setLoading(true); // Hiển thị loader khi bắt đầu gửi câu hỏi
    setQuestion('');
    try {
      const response = await axios.post('https://2hm-store.click/api/research', { prompt });
      const newAnswer = response.data.result
        .replace(/## (.*?)(?=\n|$)/g, '<h2>$1</h2>')
        .replace(/### (.*?)(?=\n|$)/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\* (.*?)(?=\n|$)/g, '<li>$1</li>')
        .replace(/\n/g, '<br/>')
        .replace(/```(.*?)```/g, '<pre><code>$1</code></pre>');
      const newQuestionAns = { question: prompt, answer: newAnswer };
      setQuestionAns((prevQuestionAns) => [...prevQuestionAns, newQuestionAns]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false); // Ẩn loader sau khi hoàn thành
  };

  useEffect(() => {
    console.log(loading);
    console.log('questionAns', questionAns);
  }, [questionAns, loading]);

  return (
    <div className={cx('chatgpt-ui')}>
      <div className={cx('header')}>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"
          alt="Profile"
          className={cx('profile-picture')}
        />
        <div className={cx('welcome-text')}>
          <h1>Xin chào quý khách hàng của cửa hàng</h1>
          <p>Hôm nay tôi giúp gì được cho bạn?</p>
        </div>
      </div>

      <div className={cx('chat-history')}>
        {questionAns.map((qa, index) => (
          <div key={index} className={cx('chat-message')}>
            <div className={cx('question')}>Q: {qa.question}</div>
            <div className={cx('answer')}>
              <div dangerouslySetInnerHTML={{ __html: qa.answer }} />
            </div>
          </div>
        ))}
      </div>

      <div className={cx('chat-input')}>
        <span className={cx('plus-icon')}>+</span>
        <input
          type="text"
          placeholder="Gửi tin nhắn..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(question);
            }
          }}
        />
        {loading && <div className={cx('loader')}></div>}
      </div>
    </div>
  );
};

export default ChatGPTUI;