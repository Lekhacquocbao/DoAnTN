import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignature, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring';

import GetToken from '~/Token/GetToken';
import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import Profile from '~/layouts/Profile';
import Popup from '~/components/Popup';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

function Information() {
  const [infor, setInfor] = useState({});
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [payload1, setPayload1] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    avatar: '',
  });

  const [payload2, setPayload2] = useState({
    password: '',
    newPassword: '',
    againPassword: '',
  });

  useEffect(() => {
    const fetchAPIProfile = async () => {
      try {
        const response = await axios.get('https://2hm-store.click/api/user/profile/me', {
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
        });
        const user = response.data.user.inforUser;
        if (response.data.success === true) {
          setInfor(user);
          setImage(user.avatar);
        } else {
          setInfor({});
        }

        setPayload1((prevPayload1) => ({
          ...prevPayload1,
          firstName: user.firstname,
          lastName: user.lastname,
          phoneNumber: user.phoneNumber,
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    if(GetToken()) {
      fetchAPIProfile();
    }
  }, []);

  const handleUpdateInfor = async () => {
    try {
      const res = await axios.put(
        'https://2hm-store.click/api/user/updateProfile',
        {
          lastname: payload1.lastName,
          firstname: payload1.firstName,
          phoneNumber: payload1.phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      );

      toast.success(res.data.message);
      setInfor({ ...infor, payload1 });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'An error occurred.');
    }
  };

  const handleUpdateAva = async () => {
    const formData = new FormData();
    formData.append('image', avatar);
    const response = await fetch('https://2hm-store.click/api/user/update-avatar', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.success === true) {
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };

  const handleChangePassword = async (oldPass, newPass, againPass) => {
    await axios
      .put(
        'https://2hm-store.click/api/user/change-password',
        {
          Password: oldPass,
          NewPassword: newPass,
          AgainPassword: againPass,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      )
      .then((res) => {
        toast(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
    setAvatar(e.target.files[0]);
  };

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setPayload1({});
  };

  return (
    <Profile>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      <div className={cx('container')}>
        <div className={cx('main-header')}>Thông tin cá nhân</div>
        <div className={cx('information-field')}>
          <div className={cx('avatar-section')}>
            {image && <img src={image} className={cx('image')} alt="Ảnh đại diện" />}
            
            <label htmlFor="file-upload1" className={cx('upload-btn')}>
              <FontAwesomeIcon icon={faUpload} />
              <input id="file-upload1" type="file" onChange={(e) => handleImgChange(e)} />
            </label>

            <Button
              animation
              className={cx('upd-ava')}
              onClick={() => {
                handleUpdateAva();
              }}
            >
              Cập nhật ảnh
            </Button>
          </div>
          <div className={cx('info-section')}>
            <div className={cx('info-header')}>
              Họ và tên
            </div>
            {/* <div className={cx('description-field')}>
              <div>Update your avatar and information here</div>
            </div> */}
            <div className={cx('text-field')}>
              {/* <div className={cx('header')}>Full name</div> */}
              <div className={cx('input-field')}>
                <div className={cx('input-wrapper')}>
                  <InputForm
                    placeholder="Họ"
                    type="text"
                    value={payload1.firstName}
                    setValue={setPayload1}
                    name={'firstName'}
                    className={cx('input')}
                    leftIcon={faSignature}
                  />
                </div>
                <div className={cx('input-wrapper')}>
                  <InputForm
                    placeholder="Tên"
                    type="text"
                    value={payload1.lastName}
                    setValue={setPayload1}
                    name={'lastName'}
                    className={cx('input')}
                    leftIcon={faSignature}
                  />
                </div>
              </div>
            </div>
            <div className={cx('text-field')}>
              <div className={cx('header')}>Số điện thoại</div>
              <div className={cx('input-field')}>
                <div className={cx('input-wrapper')}>
                  <InputForm
                    placeholder="Số điện thoại"
                    type="text"
                    value={payload1.phoneNumber}
                    setValue={setPayload1}
                    name={'phoneNumber'}
                    className={cx('input')}
                    leftIcon={faPhone}
                  />
                </div>
              </div>
            </div>
            <div className={cx('buttons')}>
              <Button blue onClick={() => handleUpdateInfor()}>
                Lưu
              </Button>
              <Button primary onClick={openModal}>
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'500px'}>
        <animated.div style={modalAnimation}>
          <h2>Change password</h2>
          <div className={cx('header')}>Please enter your old password</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Old Password"
              type="password"
              value={payload2.password}
              setValue={setPayload2}
              name={'password'}
              className={cx('input')}
            />
          </div>
          <div className={cx('header')}>Please enter your new password</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="New Password"
              type="password"
              value={payload2.newPassword}
              setValue={setPayload2}
              name={'newPassword'}
              className={cx('input')}
            />
          </div>
          <div className={cx('header')}>Please enter your new password again</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Confirm Password"
              type="password"
              value={payload2.againPassword}
              setValue={setPayload2}
              name={'againPassword'}
              className={cx('input')}
            />
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() => {
                handleChangePassword(payload2.password, payload2.newPassword, payload2.againPassword);
              }}
              outline
            >
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </Profile>
  );
}

export default Information;