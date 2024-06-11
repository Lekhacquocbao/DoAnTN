// src/components/ProfileCard.js
import React from 'react';
import './ProfileCard.scss';
import profileImg from '../assets/profile.png'; // Đừng quên đặt hình ảnh vào thư mục tương ứng

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-picture">
        <img src={profileImg} alt="Profile" />
      </div>
      <h2>Ayodele Oluwaseyi <span className="verified">&#x2705;</span></h2>
      <p className="email">AyodeleIwaseyi@gmail.com</p>
      <p className="phone">08064743833</p>
      <p className="join-date">join at 20/12/2002</p>
      <div className="points">
        <div className="point-label">
          <i className="icon">&#x1F4B0;</i>
          <span>point</span>
        </div>
        <div className="point-value">300</div>
      </div>
      <input type="text" className="message-input" placeholder="ENTER MESSAGE HERE......" />
      <button className="send-message">send message</button>
    </div>
  );
};

export default ProfileCard;