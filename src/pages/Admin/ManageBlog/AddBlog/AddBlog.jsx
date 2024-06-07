import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import GetToken from '~/Token/GetToken';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {toast } from 'react-toastify';

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
      'http://localhost:8000/api/post/add',
      {
        title: title,
        thumbnail:thumbnail,
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
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  return (
    <div>
      <div>
        Title: <input value={title} onChange={handleChangeTitle} type="text" />
      </div>
      <div>
        Thumbnail URL: <input value={thumbnail} onChange={handleChangeThumbnail} type="text" />
      </div>
      <div>
        Content:
        <ReactQuill value={content} onChange={handleChangeContent} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBlog;
