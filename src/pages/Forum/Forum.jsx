import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Forum.module.scss'; // Use your forum specific styles
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForumList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/post/forum');
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
        <div key={index} className={cx('forumPost')}>
          <div className={cx('forumPostLeft')}>
            <img src={post.Account.inforUser.avatar || 'default-thumbnail.jpg'} alt={post.title} className={cx('avatar')} />
            <div className={cx('forumPostContent')}>
              <Link to={`/detailForum/${post.id}`} className={cx('forumTitle')}>{post.title}</Link>
              <div className={cx('forumMetaTitle')}>
                <span className={cx('author')}>{post.Account.inforUser.firstname + ' '+ post.Account.inforUser.lastname}</span> 
                {/* • <span>{new Date(post.createdAt).toLocaleDateString()}</span> */}
              </div>
              <div className={cx('forumExcerpt')}>{post.content ? post.content.slice(0, 100) + '...' : 'No content available.'}</div>
            </div>
          </div>
          <div className={cx('forumPostRight')}>
            <div className={cx('forumMeta')}>
              <div>Replies: {post.replyNum}</div>
              <div>Views: {post.view}</div>
            </div>
            <div className={cx('forumDateTime')}>
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumList;