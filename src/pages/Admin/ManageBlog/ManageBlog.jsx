import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageBlog.module.scss';
import { Icon } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-mdi/delete';
import GetToken from '~/Token/GetToken';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function ManageBlog() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://2hm-store.click/api/post`, {
        headers: { Authorization: `Bearer ${GetToken()}`},
      });
      if (response.data.success && Array.isArray(response.data.result)) {
        setData(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  const fetchDelete = async (id_post) => {
    try {
      await axios.delete(`https://2hm-store.click/api/post/delete/${id_post}`, {
        headers: { Authorization: `Bearer ${GetToken()}`},
      });
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  const handleDelete = (index, id_post) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    fetchDelete(id_post);
  };

  const handleGoToAddBlog = () => {
      navigate('/addBlog',);
  };

  return (
    <div className={cx('tableContainer')}>
      <div className={cx('tableHeader')} >
        <div className={cx('actions')} >
          <button className={cx('btn')} onClick={handleGoToAddBlog}>
            Thêm bài viết
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td>
                  <img src={row.thumbnail} alt="Thumbnail" className={cx('styles.thumbnail')} />
                </td>
                <td>{row.title}</td>
                <td>{format(new Date(row.createdAt), 'dd/MM/yyyy')}</td>
                <td>
                  <div className={cx('actions')}>
                    <button className={cx('actionBtn','delete')} onClick={() => handleDelete(index, row.id)}>
                      <Icon icon={baselineDeleteForever} width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className={cx('noData')}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageBlog;