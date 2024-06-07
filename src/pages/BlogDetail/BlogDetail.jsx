import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './BlogDetail.module.scss';
import GetToken from '~/Token/GetToken';


const cx = classNames.bind(styles);

function DetailBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

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


  if (!blog) {
    return <div>Loading...</div>;
  } 

  return (
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
  );
}

export default DetailBlog;