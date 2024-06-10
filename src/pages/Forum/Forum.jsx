import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Forum.module.scss'; // Use your forum specific styles
import GetToken from '~/Token/GetToken';
import classNames from 'classnames/bind';
import { Link, json } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForumList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/post/forum', 
      //   {
      //   headers: { Authorization: `Bearer ${GetToken()}` },
      // }
    );
      console.log("response hú hú : " +response.data.result);
      if (response.data.success && Array.isArray(response.data.result)) {
        setData(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching forum posts: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No forum posts available.</div>;
  }

  return (
    <div className={cx('forumContainer')}>
      <Link to="/createPost" className={cx('createPostButton')}>
        Thêm bài viết
      </Link>
      {data.map((post, index) => (
        <Link to={`/detailForum/${post.id}`} key={index} className={cx('forumPost')}>
        <img src={post.thumbnail || 'default-thumbnail.jpg'} alt={post.title} className={cx('thumbnail')} />
          <div className={cx('forumContent')}>
            <h2 className={cx('forumTitle')}>{post.title}</h2>
            <p className={cx('forumExcerpt')}>{post.content ? post.content.slice(0, 100) + '...' : 'No content available.'}</p>
            <div className={cx('forumMeta')}>
              <span className={cx('forumReplies')}>Replies: {post.replyNum}</span>
            </div>
            <div className={cx('forumMeta')}>
            <span className={cx('forumViews')}>Views: {post.view}</span>
            <span className={cx('forumDate')}>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ForumList;