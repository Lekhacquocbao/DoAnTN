// src/components/ProfileCard.js
import React, { useState, useEffect } from 'react';
import styles from './AdminOtherProfiles.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GetToken from '~/Token/GetToken';
import { Flip, ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ProfileCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://2hm-store.click/api/user/profile/${id}`);
        console.log('response hú hú: ' + JSON.stringify(response));
        if (response.data.success && response.data.user) {
          setData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching forum posts: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSendMessage = async (message, chatUserId) => {
    await axios
      .post(
        `https://2hm-store.click/api/message`,
        {
          content: message,
          id_reciever: chatUserId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setNewMessage('');
      })
      .catch((e) => {
        toast.success(e);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={cx('profile-card')}>
        <img className={cx('profile-picture')} src={data.inforUser.avatar} alt="Profile" />
        <h2>{data.inforUser.firstname + ' ' + data.inforUser.lastname}</h2>
        <div className={cx('epj')}>
          <p className={cx('email')}>Email: {data.email}</p>
          <p className={cx('phone')}>Số điện thoại: {data.inforUser.phoneNumber}</p>
          <p className={cx('join-date')}>Tham gia vào: {data.createdAt}</p>
        </div>
        <div className={cx('points')}>
          <div className={cx('point-label')}>
            <i className={cx('icon')}>&#x1F4B0;</i>
            <span>Điểm</span>
          </div>
          <div className={cx('point-value')}>{data.point}</div>
        </div>
        <input
          type="text"
          placeholder="Gửi tin nhắn......"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={cx('message-input')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(newMessage, id);
            }
          }}
        />
        <button className={cx('send-message')} onClick={() => handleSendMessage(newMessage, id)}>
          Nhắn tin
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
