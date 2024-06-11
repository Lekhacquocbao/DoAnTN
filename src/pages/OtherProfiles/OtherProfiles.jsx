// src/components/ProfileCard.js
import React, { useState, useEffect } from 'react';
import styles from './OtherProfiles.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const cx = classNames.bind(styles);

const ProfileCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

 
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/profile/${id}`);
        console.log("response hú hú: " + JSON.stringify(response));
        if (response.data.success && (response.data.user)) {
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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className={cx('profile-card')}>
        <img className={cx('profile-picture')} src={data.inforUser.avatar} alt="Profile" />
      <h2>{data.inforUser.firstname + ' '+ data.inforUser.lastname}</h2>
      <div className={cx('epj')}>
        <p className={cx('email')}>Email: {data.email}</p>
        <p className={cx('phone')}>Phone number: {data.inforUser.phoneNumber}</p>
        <p className={cx('join-date')}>Joined: {data.createdAt}</p>
      </div>
      <div className={cx('points')} >
        <div className={cx('point-label')} > 
          <i className={cx('icon')} >&#x1F4B0;</i>
          <span>point</span>
        </div>
        <div className={cx('point-value')}>{data.point}</div>
      </div>
      <input type="text" className={cx('message-input')} placeholder="ENTER MESSAGE HERE......" />
      <button className={cx('send-message')}>Send message</button>
      </div>
  );
};

export default ProfileCard;