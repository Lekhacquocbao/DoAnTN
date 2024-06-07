// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import GetToken from '~/Token/GetToken';


// const BlogPost = ({ postId }) => {
//   const [post, setPost] = useState('');

//   useEffect(() => {
//     const getApiPost = async () => {
//       const response = await axios.get('http://localhost:8000/api/post', {
//         headers: { Authorization: `Bearer ${GetToken()}` },
//       });
//       setPost(response.data.result);
//       // console.log("respen cccc nhé", response); 
//     };
//     getApiPost();
//   }, []);

//   return (
//     <div dangerouslySetInnerHTML={{ __html: post }} />
//   );
// };

// export default BlogPost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Blog.module.scss';
import GetToken from '~/Token/GetToken';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/post', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      if (response.data.success && Array.isArray(response.data.result)) {
        setData(response.data.result);
        console.log("post haha", response);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No blog posts available.</div>;
  }

  return (
    <div className={cx('blogContainer')} >
      {data.map((post, index) => (
        <div key={index} className={cx('blogPost')} >
        <img src={post.thumbnail || 'default-thumbnail.jpg'} alt={post.title} className={cx('thumbnail')} />
          <div className={cx('blogContent')} >
            <h2 className={cx('blogTitle')} >{post.title}</h2>
            <p className={cx('blogExcerpt')} >{post.content ? post.content.slice(0, 100) + '...' : 'No content available.'}</p>
            <div className={cx('blogMeta')} >
              <span className={cx('blogDate')} >{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;