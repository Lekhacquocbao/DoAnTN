import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import GetToken from '~/Token/GetToken';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import styles from './AddPost.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AddPost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeThumbnail = (event) => {
    setThumbnail(event.target.value);
  };

  const handleSubmit = async () => {
    if (!GetToken())
      {
        toast.error('Vui lòng đăng nhập để thực hiện chức năng này');
      }
    await axios
      .post(
        'https://2hm-store.click/api/post/forum/add',
        {
          title: title,
          thumbnail: thumbnail,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
        },
      )
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = `/forum`;
        }, 2000);
      })
      
      .catch((error) => {
        // toast.error(error.message);
      });
  };

  return (
    <div className={cx('addPostContainer')}>
    <ToastContainer
            position="top-right"
            autoClose={4000}
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
      <div className={cx('formGroup')}>
        <label>Tiêu đề:</label>
        <input value={title} onChange={handleChangeTitle} type="text" className={cx('formControl')} />
      </div>
      <div className={cx('formGroup')}>
        <label>Thumbnail URL:</label>
        <input value={thumbnail} onChange={handleChangeThumbnail} type="text" className={cx('formControl')} />
      </div>
      <div className={cx('formGroup')}>
        <label>Nội dung:</label>
        <ReactQuill value={content} onChange={handleChangeContent} className={cx('formControl')} />
      </div>
      <button onClick={handleSubmit} className={cx('submitButton')}>
        Đăng bài
      </button>
    </div>
  );
};

export default AddPost;