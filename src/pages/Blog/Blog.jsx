import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Blog.module.scss';
import GetToken from '~/Token/GetToken';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';


const cx = classNames.bind(styles);

const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://2hm-store.click/api/post', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      if (response.data.success && Array.isArray(response.data.result)) {
        setData(response.data.result);
        // console.log("post haha", response );
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
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
    return <div>No blog posts available.</div>;
  }

  return (
    <>
      <div className={cx('blogContainer')} >
        {data.map((post, index) => (
          <Link to={`/detailBlog/${post.id}`} key={index} className={cx('blogPost')}>
        
          <img src={post.thumbnail || 'default-thumbnail.jpg'} alt={post.title} className={cx('thumbnail')} />
            <div className={cx('blogContent')} >
              <h2 className={cx('blogTitle')} >{post.title}</h2>
              <p className={cx('blogExcerpt')} dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content ? post.content.slice(0, 100) + '...' : 'No content available.') }} />
              <div className={cx('blogMeta')} >
                <span className={cx('blogDate')} >{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogList;