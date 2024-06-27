import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import classNames from 'classnames/bind';
import config from '~/config';
import styles from './LoginSuccess.module.scss';

const cx = classNames.bind(styles);

function LoginSuccess() {
  const { id } = useParams();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(`https://2hm-store.click/api/user/login-success/${id}`);
        const data = response.data;
        // console.log("dataa", data);
        const { accessToken, role } = data;
        // Lưu accessToken vào cookie
        document.cookie = `token=${accessToken};path=/;`;
        // localStorage.setItem('token', accessToken);
        localStorage.setItem('Role', role);
        // console.log("role", role);
        // console.log("token", accessToken);

        toast.success('Login successful', {
          onClose: () => {
            // Chuyển hướng người dùng sau khi toast đóng
            if (role === 'admin') {
              window.location.replace(config.routes.adminPending);
            } else {
              window.location.replace(config.routes.home);
            }
          },
        });
      } catch (error) {
        console.error('Error fetching the access token:', error);
        toast.error('Login failed. Please try again.');
      }
    };

    fetchAccessToken();
  }, [id]);

  return (
    <div className={cx('wrapper')}>
      <ToastContainer
        position="top-right"
        autoClose={500}
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
        <h2 className={cx('title')}>Loading...</h2>
      </div>
    </div>
  );
}

export default LoginSuccess;
