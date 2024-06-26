import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageForum.module.scss'; // Use your forum specific styles
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const cx = classNames.bind(styles);

const ForumList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/post/forum');
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

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, { SAFE_FOR_TEMPLATES: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div>
        <Link to="/admimCreatePost" className={cx('createPostButton')}>
          Thêm bài viết
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/adminCreatePost" className={cx('createPostButton')}>
        Thêm bài viết
      </Link>
      <div className={cx('forumContainer')}>
        {data.map((post, index) => (
          <div key={index} className={cx('forumPost')}>
            <div className={cx('forumPostLeft')}>
              <Link to={`/adminOtherProfiles/${post.Account.id}`}>
                <img
                  src={post.Account.inforUser.avatar || 'default-thumbnail.jpg'}
                  alt={post.title}
                  className={cx('avatar')}
                />
              </Link>
              <div className={cx('forumPostContent')}>
                <Link to={`/adminDetailForum/${post.id}`} className={cx('forumTitle')}>
                  {post.title}
                </Link>
                <div className={cx('forumMetaTitle')}>
                  <Link to={`/adminOtherProfiles/${post.Account.id}`}>
                    <span className={cx('author')}>
                      {post.Account.inforUser.firstname + ' ' + post.Account.inforUser.lastname}
                    </span>
                  </Link>
                </div>
                <div
                  className={cx('forumExcerpt')}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(
                      post.content ? post.content.slice(0, 100) + '...' : 'No content available.',
                    ),
                  }}
                ></div>
              </div>
            </div>
            <div className={cx('forumPostRight')}>
              <div className={cx('forumMeta')}>
                <div>Trả lời: {post.replyNum}</div>
                <div>Lượt xem: {post.view}</div>
              </div>
              <div className={cx('forumDateTime')}>{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ForumList;
