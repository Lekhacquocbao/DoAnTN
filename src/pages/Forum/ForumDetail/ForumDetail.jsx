// import classNames from 'classnames/bind';
// import axios from 'axios';
// import { Flip, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import styles from './ForumDetail.module.scss';
// import GetToken from '~/Token/GetToken';


// const cx = classNames.bind(styles);

// function DetailForum() {
//   const { id } = useParams();
//   const [forum, setForum] = useState({});

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/post/forum/${id}`, {
//           headers: { Authorization: `Bearer ${GetToken()}` },
//         });
//         console.log("response hé hé", response);
//         setForum(response.data.result);
//       } catch (error) {
//         console.error('Error fetching forum details:', error);
//       }
//     };

//     fetchBlogDetails();
//   }, [id]);


//   if (!forum) {
//     return <div>Loading...</div>;
//   } 

//   return (
//     <div className={cx('forumContainer')}>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         transition={Flip}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className={cx('forumPost')}>
//         <div className={cx('forum-img')}>
//           {forum.thumbnail && <img src={forum.thumbnail} alt={forum.title} className={cx('thumbnail')} />}
//         </div>
//         <div className={cx('forum-info')}>
//           <h1 className={cx('forum-title')}>{forum.title}</h1>
//           <p className={cx('forum-date')}>{new Date(forum.createdAt).toLocaleDateString()}</p>
//           <div className={cx('forum-content')} dangerouslySetInnerHTML={{ __html: forum.content }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DetailForum;


import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ForumDetail.module.scss';
import GetToken from '~/Token/GetToken';

const cx = classNames.bind(styles);

function DetailForum() {
  const { id } = useParams();
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchForumDetails = async () => {
        try {
          const forumResponse = await axios.get(`http://localhost:8000/api/post/forum/${id}`, 
            { headers: { Authorization: `Bearer ${GetToken()}` } });
          setForum(forumResponse.data.result);
          setComments(forumResponse.data.result.comments);
        } catch (error) {
          console.error('Error fetching forum details or comments:', error);
        } finally {
          setLoading(false);
          setLoadingComments(false);
        }
    };    

    fetchForumDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/api/post/forum/comment`, 
      { 
        content: newComment,
        id_post: id,
      },
      { headers: { Authorization: `Bearer ${GetToken()}` } });
      console.log("commet", response);
      toast.success('Comment posted successfully!');
      setNewComment('');
      // setComments([...comments, response.data.result]);
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to post comment.');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx('forumContainer')}>
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
      <div className={cx('forumPost')}>
        <div className={cx('forum-img')}>
          {forum.thumbnail && <img src={forum.thumbnail} alt={forum.title} className={cx('thumbnail')} />}
        </div>
        <div className={cx('forum-info')}>
          <h1 className={cx('forum-title')}>{forum.title}</h1>
          <p className={cx('forum-date')}>{new Date(forum.createdAt).toLocaleDateString()}</p>
          <div className={cx('forum-content')} dangerouslySetInnerHTML={{ __html: forum.content }} />
        </div>
      </div>
      <div className={cx('commentsSection')}>
        <h2>Comments</h2>
        {loadingComments ? (
          <div>Loading comments...</div>
        ) : comments.length === 0 ? (
          <div>No comments yet.</div>
        ) : (
          <ul className={cx('commentList')}>
            {comments.map((comment, index) => (
              <li key={index} className={cx('comment')}>
                <img src={comment.Account.inforUser.avatar || 'default-thumbnail.jpg'} alt={comment.title} className={cx('avatar')} />
                <p className={cx('commentContent')}>{comment.content}</p>
                <div className={cx('commentMeta')}>
                  <span className={cx('commentAuthor')}>{comment.Account.inforUser.firstname+ ' '+comment.Account.inforUser.lastname }</span>
                  <span className={cx('commentDate')}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <form onSubmit={handleCommentSubmit} className={cx('commentForm')}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={cx('commentInput')}
            placeholder="Write your comment here..."
            required
          />
          <button type="submit" className={cx('commentButton')}>Submit Comment</button>
        </form>
      </div>
    </div>
  );
}

export default DetailForum;