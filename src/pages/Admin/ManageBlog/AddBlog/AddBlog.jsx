import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import GetToken from '~/Token/GetToken';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AddBlog.module.scss';
import { Flip, ToastContainer, toast } from 'react-toastify';
import config from '~/config';

const cx = classNames.bind(styles);


const AddBlog = () => {
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
    console.log(title);
    console.log(thumbnail);
    await axios
      .post(
        'https://2hm-store.click/api/post/add',
        {
          title: title,
          thumbnail: thumbnail,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  };

  return (
    <div className={cx('addBlogForm')}>
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
      <div className={cx('formGroup')}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          className={cx('formControl')}
          value={title}
          onChange={handleChangeTitle}
          type="text"
        />
      </div>
      <div className={cx('formGroup')}>
        <label htmlFor="thumbnail">Thumbnail URL:</label>
        <input
          id="thumbnail"
          className={cx('formControl')}
          value={thumbnail}
          onChange={handleChangeThumbnail}
          type="text"
        />
      </div>
      <div className={cx('formGroup')}>
        <label htmlFor="content">Content:</label>
        <ReactQuill
          id="content"
          className="quillEditor"
          value={content}
          onChange={handleChangeContent}
        />
      </div>
      <button className={cx('submitButton')} onClick={() => window.location.replace(config.routes.manageBlog)}>
        Return
      </button>

      <button className={cx('submitButton')} onClick={handleSubmit}>
        Submit
      </button>
      
    </div>
  );
};

export default AddBlog;
