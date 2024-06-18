// import React, { useState, useEffect } from 'react';
// import styles from './Question.module.scss';
// import classNames from 'classnames/bind';
// import axios from 'axios';

// const cx = classNames.bind(styles);

// const ChatGPTUI = () => {
//   const [questionAns, setQuestionAns] = useState([]);
//   const [question, setQuestion] = useState('');

//   const handleSubmit = async (prompt) => {
//     // const response = await axios.post('https://2hm-store.click/api/research', {
//     //   prompt: prompt,
//     // });

//     // const newAnswer = response.data.result; 
//     const newAnswer = "hhee " + Math.random()
//     const newQuestionAns = { question: prompt, answer: newAnswer };

//     // Add the new question and answer to the array
//     setQuestionAns((prevQuestionAns) => [
//       ...prevQuestionAns,
//       newQuestionAns
//     ]);

//     // Clear the input field after sending the question
//     setQuestion('');
//   };

//   // Log questionAns whenever it changes
//   useEffect(() => {
//     console.log('questionAns', questionAns);
//   }, [questionAns]);

//   return (
//     <div className={cx('chatgpt-ui')}>
//       <div className={cx('header')}>
//         <img src="https://via.placeholder.com/50" alt="Profile" className={cx('profile-picture')} />
//         <div className={cx('welcome-text')}>
//           <h1>Hello, Bảo Lê</h1>
//           <p>How can I help you today?</p>
//         </div>
//       </div>

//       <div className={cx('chat-history')}>
//         {questionAns.map((qa, index) => (
//           <div key={index} className={cx('chat-message')}>
//             <div className={cx('question')}>Q: {qa.question}</div>
//             <div className={cx('answer')}>A: {qa.answer}</div>
//           </div>
//         ))}
//       </div>

//       <div className={cx('chat-input')}>
//         <span className={cx('plus-icon')}>+</span>
//         <input
//           type="text"
//           placeholder="Send a Message..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               handleSubmit(question);
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatGPTUI;


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
          <h1>Hello, BH store's customer</h1>
          <p>How can I help you today?</p>
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
          placeholder="Send a Message..."
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