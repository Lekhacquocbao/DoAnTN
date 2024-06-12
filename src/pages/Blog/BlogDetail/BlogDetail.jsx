import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './BlogDetail.module.scss';
import GetToken from '~/Token/GetToken';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';


const cx = classNames.bind(styles);

function DetailBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/post/${id}`, {
          headers: { Authorization: `Bearer ${GetToken()}` },
        });
        setBlog(response.data.result);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/post', {
        headers: { Authorization: `Bearer ${GetToken()}` },
      });
      if (response.data.success && Array.isArray(response.data.result)) {
        setData(response.data.result);
        // console.log("post haha", response );
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getRecentPosts = (num) => {
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, num);
  };

  const recentPosts = getRecentPosts(5);

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, { SAFE_FOR_TEMPLATES: true });
  };

  if (!blog) {
    return <div>Loading...</div>;
  } 

  return (
    <>
    <div className={cx('container')}>
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
      <div className={cx('blog')}>
        <div className={cx('blog-img')}>
          {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} className={cx('img')} />}
        </div>
        <div className={cx('blog-info')}>
          <h1 className={cx('blog-title')}>{blog.title}</h1>
          <p className={cx('blog-date')}>{new Date(blog.createdAt).toLocaleDateString()}</p>
          <div className={cx('blog-content')} dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </div>

      <div className={cx('blogContainer')} >
      <h3 className={cx('rencent')}>Recent Posts</h3>
      {recentPosts.map((post, index) => (
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
}

export default DetailBlog;