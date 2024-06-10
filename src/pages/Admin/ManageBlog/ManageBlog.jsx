import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageBlog.module.scss';
import { Icon } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-mdi/delete';
import GetToken from '~/Token/GetToken';
import { useNavigate } from 'react-router-dom';


function ManageBlog() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post`, {
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
      await axios.delete(`http://localhost:8000/api/post/delete/${id_post}`, {
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
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={handleGoToAddBlog}>
            Add Post
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td>
                  <img src={row.thumbnail} alt="Thumbnail" className={styles.thumbnail} />
                </td>
                <td>{row.title}</td>
                <td>{row.createdAt}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(index, row.id)}>
                      <Icon icon={baselineDeleteForever} width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className={styles.noData}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageBlog;