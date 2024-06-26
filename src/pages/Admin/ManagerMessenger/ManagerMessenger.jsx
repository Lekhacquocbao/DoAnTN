import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import GetToken from '~/Token/GetToken';
import classNames from 'classnames/bind';
import styles from './ManagerMessenger.module.scss';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

export default function Messenger() {
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idUser, setIdUser] = useState();
  const [chatUserName, setChatUserName] = useState('Chào mừng đến với Message PetShop');
  const [newMessage, setNewMessage] = useState('');
  const [chatUserId, setChatUserId] = useState();
  const [socket, setSocket] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchListMessage();
    fetchMe();
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchListMessage = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/message?limit=10&page=1', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      if (response.data.success && Array.isArray(response.data.conversations)) {
        setData(response.data.conversations);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailMessage = async (id, name) => {
    try {
      setChatUserId(id);

      // Khởi tạo socket khi vào chi tiết tin nhắn
      if (socket) {
        socket.disconnect();
      }

      const newSocket = io('https://2hm-store.click/');
      setSocket(newSocket);
      newSocket.on('connect', () => {
        console.log(newSocket.id);
      });
      newSocket.auth = {
        id: idUser,
      };
      newSocket.on('receive_message', (data) => {
        // data bao gồm id người gửi và content
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Math.random(),
            chatUser: { id: data.id_sender },
            content: data.content,
            createdAt: new Date().toISOString(),
          },
        ]);
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      });

      const response = await axios.get(`https://2hm-store.click/api/message/${id}?limit=100&page=1`, {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      if (response.data.success && Array.isArray(response.data.messages)) {
        setMessages(response.data.messages);
        setChatUserName(name);

        // Cuộn xuống cuối cùng sau khi cập nhật tin nhắn
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/user/profile/me', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      setIdUser(response.data.user.id);
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (message, chatUserId) => {
    if (socket) {
      socket.emit('send_message', {
        content: message,
        id_receiver: chatUserId,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random(), content: message, createdAt: new Date().toISOString() },
      ]);
      setNewMessage('');
      // Cuộn xuống cuối cùng sau khi gửi tin nhắn
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx('container')}>
      <div className={cx('sidebar')}>
        {data.map((chat) => {
          const isSender = chat.id_sender === idUser;
          const user = isSender
            ? { avatar: chat.reciever_avatar, firstname: chat.reciever_firstname, lastname: chat.reciever_lastname }
            : { avatar: chat.sender_avatar, firstname: chat.sender_firstname, lastname: chat.sender_lastname };
          const { avatar, firstname, lastname } = user;
          const name = `${firstname} ${lastname}`;
          return (
            <div
              key={isSender ? chat.id_reciever : chat.id_sender}
              className={cx('chat', { active: chat.id === idUser })}
              onClick={() => fetchDetailMessage(isSender ? chat.id_reciever : chat.id_sender, name)}
            >
              <img src={avatar} alt={name} className={cx('avatar')} />
              <div className={cx('chatInfo')}>
                <div className={cx('chatName')}>{name}</div>
                <div className={cx('chatMessage')}>{chat.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={cx('chatWindow')}>
        <div className={cx('chatHeader')}>
          <h2>{chatUserName}</h2>
        </div>

        <div className={cx('messageList')}>
          {messages.map((msg) => (
            <div key={msg.id} className={cx('message', !msg.chatUser ? 'sent' : 'received')}>
              <div className={cx('messageContent')}>{msg.content}</div>
              <div className={cx('messageTime')}>{format(new Date(msg.createdAt), 'PPpp')}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={cx('messageInput')}>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(newMessage, chatUserId);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
