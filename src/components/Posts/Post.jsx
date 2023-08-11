import { useEffect, useState } from "react";
import "./Post.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts, setFollowingPosts } from "../../Slices/appSlice";
import { setUser } from "../../Slices/authSlice";
import Comments from "../Comments/Comments";

import {
  useAddCommentMutation,
  useAllPostsQuery,
  useManageLikeMutation,
  useManageSaveMutation,
} from "../../Slices/apiSlice";

const Post = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { data, isLoading } = useAllPostsQuery();

  useEffect(() => {
    dispatch(setAllPosts(data?.posts));
  }, [data, dispatch]);

  const posts = useSelector((state) => state.app.allPosts);
  const followingUserPosts = useSelector((state) => state.app.followingPosts);

  const [manageLike] = useManageLikeMutation();

  const handleLikeManagement = async (postId) => {
    try {
      await manageLike(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavouriteIcon = (id) => {
    handleLikeManagement(id);
  };

  const [managesave] = useManageSaveMutation();

  const manageSave = async (postId) => {
    const res = await managesave(postId, commentValue);
    if (res.data?.status === "success") {
      const user = res.data.user;
      dispatch(setUser(user));
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

  const [addComment] = useAddCommentMutation();

  const handleComment = async (postID) => {
    const comment = {
      comment: commentValue,
    };
    await addComment({ postID, comment });
    setIsTyping(false);
    setCommentValue("");
  };

  const handleCommentClick = (post) => {
    setComments(!comments);
    setCommentData(post.comments);
  };

  const followingPosts = () => {
    let filteredPosts = [];
    let followingUserIds = [];

    // Assuming 'user' and 'posts' are defined somewhere in your code
    user?.following?.forEach((idObject) => {
      followingUserIds.push(idObject.id);
    });

    filteredPosts = posts?.filter((post) => {
      return followingUserIds.includes(post.user.id);
    });

    dispatch(setFollowingPosts(filteredPosts));
  };

  useEffect(() => {
    followingPosts();
  }, [posts]);

  return (
    <>
      <div className="post-container">
        {isLoading ? (
          <div className="post">...loading</div>
        ) : (
          <>
            {followingUserPosts?.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <section className="user-info-container">
                    <Link className="link user-info" to={post?.user.username}>
                      <img
                        src={post?.user.photo}
                        alt=""
                        className="post-profile"
                      />
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
                    <span className="post-likes">
                      {post?.likesQuantity} likes
                    </span>
                    <span className="caption">
                      <strong>{post?.user.username}</strong> {post?.caption}
                    </span>
                  </section>
                  <section className="comment">
                    <span
                      className="comment-info"
                      onClick={() => handleCommentClick(post)}
                    >
                      View All {post?.comments.length} comments
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
                        value={commentValue}
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
          </>
        )}
      </div>
    </>
  );
};

export default Post;
