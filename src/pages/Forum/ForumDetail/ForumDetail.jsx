import classNames from 'classnames/bind';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ForumDetail.module.scss';
import GetToken from '~/Token/GetToken';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const cx = classNames.bind(styles);

function DetailForum() {
  const { id } = useParams();
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        const forumResponse = await axios.get(`https://2hm-store.click/api/post/forum/${id}`, {
          headers: { Authorization: `Bearer ${GetToken()}` },
        });
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

  const getRecentPosts = (num) => {
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, num);
  };

  const recentPosts = getRecentPosts(5);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://2hm-store.click/api/post/forum/comment`,
        {
          content: newComment,
          id_post: id,
        },
        { headers: { Authorization: `Bearer ${GetToken()}` } },
      );
      // console.log("commet", response);
      toast.success('Comment posted successfully!');
      setNewComment('');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // setComments([...comments, response.data.result]);
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to post comment.');
    }
  };

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, { SAFE_FOR_TEMPLATES: true });
  };

  const handleLinkClick = (postId) => {
    window.location.href = `/detailForum/${postId}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          <div className={cx('forum-info')}>
            <h1 className={cx('forum-title')}>{forum.title}</h1>
            <p className={cx('forum-date')}>{new Date(forum.createdAt).toLocaleDateString()}</p>
            <div className={cx('forum-img')}>
              {forum.thumbnail && <img src={forum.thumbnail} alt={forum.title} className={cx('thumbnail')} />}
            </div>
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
                  <img
                    src={comment.Account.inforUser.avatar || 'default-thumbnail.jpg'}
                    alt={comment.title}
                    className={cx('avatar')}
                  />
                  <div className={cx('commentMeta')}>
                    <span className={cx('commentAuthor')}>
                      {comment.Account.inforUser.firstname + ' ' + comment.Account.inforUser.lastname}
                    </span>
                    <p className={cx('commentContent')}>{comment.content}</p>
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
            <button type="submit" className={cx('commentButton')}>
              Submit Comment
            </button>
          </form>
        </div>
      </div>

      <div className={cx('forumContainerRencent')}>
        <h3 className={cx('rencent')}>Recent Posts</h3>
        {recentPosts.map((post, index) => (
          <div key={index} className={cx('forumPostRencent')}>
            <div className={cx('forumPostLeftRencent')}>
              <Link to={`/otherProfiles/${post.Account.id}`}>
                <img
                  src={post.Account.inforUser.avatar || 'default-thumbnail.jpg'}
                  alt={post.title}
                  className={cx('avatarRencent')}
                />
              </Link>
              <div className={cx('forumPostContentRencent')}>
              <a
                href={`/detailForum/${post.id}`}
                className={cx('forumTitleRencent')}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(post.id);
                }}
              >
                {post.title}
              </a>
                <div className={cx('forumMetaTitleRencent')}>
                  <Link to={`/otherProfiles/${post.Account.id}`}>
                    <span className={cx('authorRencent')}>
                      {post.Account.inforUser.firstname + ' ' + post.Account.inforUser.lastname}
                    </span>
                  </Link>
                </div>
                <div
                  className={cx('forumExcerptRencent')}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(
                      post.content ? post.content.slice(0, 100) + '...' : 'No content available.',
                    ),
                  }}
                ></div>
              </div>
            </div>
            <div className={cx('forumPostRightRencent')}>
              <div className={cx('forumMetaRencent')}>
                <div>Replies: {post.replyNum}</div>
                <div>Views: {post.view}</div>
              </div>
              <div className={cx('forumDateTimeRencent')}>{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DetailForum;
