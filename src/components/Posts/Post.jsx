import { useEffect, useState } from "react";
import "./Post.scss";
import NewRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts, setUser } from "../../state/slice";
import Comments from "../Comments/Comments";

const Post = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await NewRequest.get("/post");
      dispatch(setAllPosts(res.data.posts));
    };
    fetchPosts();
  }, [dispatch]);

  const posts = useSelector((state) => state.allPosts);

  const handleLikeManagement = async (postId) => {
    try {
      const res = await NewRequest.post(`/post/${postId}/manageLike`);

      if (res.data.status === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFavouriteIcon = (id) => {
    handleLikeManagement(id);
  };

  const manageSave = async (postId) => {
    try {
      const res = await NewRequest.post(`/user/${postId}/manageSave`);
      dispatch(setUser(res.data.user));
      if (res.data.status === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveIcon = (postId) => {
    setIsSaved(!isSaved);
    manageSave(postId);
  };

  const handleChange = (e) => {
    const string = e.target.value.split("");
    setCommentValue(e.target.value);
    if (string.length > 0) {
      setIsTyping(true);
    } else if (string.length === 0) {
      setIsTyping(false);
    }
  };

  const handleComment = async (postID) => {
    try {
      const res = await NewRequest.post(`/post/${postID}/createComment`, {
        comment: commentValue,
      });

      if (res.data.status === "succes") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentClick = (post) => {
    setComments(!comments);
    setCommentData(post.comments);
  };

  return (
    <>
      <div className="post-container">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <section className="user-info-container">
                <Link className="link user-info" to={post?.user.username}>
                  <img src={post?.user.photo} alt="" className="post-profile" />
                  <span className="post-name">{post?.user.username}</span>
                </Link>
              </section>
              <section className="post-content">
                <img src={post?.content} alt="" className="content-img" />
              </section>
              <section className="post-activity">
                {post?.likes?.includes(user?.id) ? (
                  <span
                    className="material-symbols-outlined activity-icons like-icon"
                    onClick={() => handleFavouriteIcon(post.id)}
                  >
                    favorite
                  </span>
                ) : (
                  <img
                    className="activity-icons "
                    src="../img/likeIcon.svg"
                    alt=""
                    onClick={() => handleFavouriteIcon(post.id)}
                  />
                )}

                <img
                  className="activity-icons comment-icon"
                  src="../img/commentIcon.svg"
                  alt=""
                />
                {user?.saved.some((save) => save._id === post._id) ? (
                  <span
                    className="material-symbols-outlined activity-icons save-icon"
                    onClick={() => handleSaveIcon(post.id)}
                  >
                    bookmark
                  </span>
                ) : (
                  <img
                    className="activity-icons"
                    src="../img/saveIcon.svg"
                    alt=""
                    onClick={() => handleSaveIcon(post.id)}
                  />
                )}
              </section>
              <section className="content-info">
                <span className="post-likes">{post?.likesQuantity} likes</span>
                <span className="caption">
                  <strong>{post?.user.username}</strong> {post?.caption}
                </span>
              </section>
              <section className="comment">
                <span
                  className="comment-info"
                  onClick={() => handleCommentClick(post)}
                >
                  View All {post?.commentsQuantity} comments
                </span>
                {comments && (
                  <>
                    <Comments comments={commentData} />

                    <div className="overlay-comment"></div>
                    <span
                      className="material-symbols-outlined info-closeIcon"
                      onClick={() => setComments(false)}
                    >
                      close
                    </span>
                  </>
                )}
                <div className="comment-activity">
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="add a comment"
                    onChange={handleChange}
                  />
                  {isTyping && (
                    <span onClick={() => handleComment(post.id)}>Post</span>
                  )}
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
