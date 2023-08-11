import "./Profile.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Followers from "../../components/Followers/Followers";
import Following from "../../components/Following/Following";
import { useSelector, useDispatch } from "react-redux";
import { setGetUser } from "../../Slices/appSlice";
import { setUser } from "../../Slices/authSlice";
import { useGetUserQuery } from "../../Slices/userApiSlice";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../Slices/userApiSlice";

const Profile = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedIsActive, setSavedIsActive] = useState(false);
  const [postIsActive, setPostIsActive] = useState(true);
  const [isFollowers, setisFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleSavedClick = () => {
    setIsSaved(true);
    setSavedIsActive(true);
    setPostIsActive(false);
  };
  const handlePostClick = () => {
    setIsSaved(false);
    setSavedIsActive(false);
    setPostIsActive(true);
  };

  const currentUser = useSelector((state) => state.auth.userInfo);
  const user = useSelector((state) => state.app.getUser);
  const saved = user?.saved;

  const posts = [...(user?.posts || [])].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const username = location.pathname.split("/")[1];
  const { data, isLoading } = useGetUserQuery(username);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(setGetUser(data.user));
    }
  }, [username, dispatch, data, followUser, unfollowUser]);

  const handleFollow = async (userId) => {
    const res = await followUser(userId);

    if (res.data?.status === "success") {
      dispatch(setUser(res.data.currentuser));
    }
  };
  const handleUnFollow = async (userId) => {
    const res = await unfollowUser(userId);

    if (res.data?.status === "success") {
      dispatch(setUser(res.data.currentuser));
    }
  };
  if (isLoading) {
    return <div className="profile">...loading</div>;
  }
  return (
    <>
      <div className="profile">
        <section className="profile-head">
          <img src={user?.photo} alt="" className="profile-img" />
          <div className="profile-info">
            <section className="upper-info">
              <span className="username">{user?.username}</span>
              {currentUser?.username === username ? (
                <Link className="link" to="/account/editProfile">
                  <button className="edit-btn ">Edit Profile</button>
                </Link>
              ) : (
                <div>
                  {currentUser?.following.some((id) => id._id === user?._id) ? (
                    <button
                      className="profile-following-btn "
                      onClick={() => handleUnFollow(user?._id)}
                    >
                      following
                    </button>
                  ) : (
                    <button
                      className="profile-follow-btn "
                      onClick={() => handleFollow(user?._id)}
                    >
                      {currentUser?.followers.some((id) => id._id === user?._id)
                        ? "follow back"
                        : "follow"}
                    </button>
                  )}
                </div>
              )}
            </section>
            <section className="middle-info">
              <span className="posts">
                <strong>{user?.posts?.length}</strong> posts
              </span>
              <span
                className="followers show"
                onClick={(e) => setisFollowers(!isFollowers)}
              >
                <strong>{user?.totalFollowers}</strong> followers
              </span>
              <span
                className="following show"
                onClick={(e) => setIsFollowing(!isFollowing)}
              >
                <strong>{user?.totalFollowing}</strong> following
              </span>
            </section>
            <section className="lower-info">
              <strong className="name">{user?.name}</strong>
              <span className="bio">{user?.bio}</span>
            </section>
          </div>
        </section>
        <section className="posts-section">
          <section className="heading">
            <div
              className={`post-heading ${postIsActive ? "active" : ""}`}
              onClick={handlePostClick}
            >
              <img src="../img/postIcon.svg" alt="" className="postIcon" />
              <span>POSTS</span>
            </div>
            <div
              className={`post-heading ${savedIsActive ? "active" : ""}`}
              onClick={handleSavedClick}
            >
              {currentUser.username === username && (
                <>
                  {" "}
                  <img src="../img/saveIcon.svg" alt="" className="postIcon" />
                  <span>SAVED</span>{" "}
                </>
              )}
            </div>
          </section>
          {isSaved && currentUser.username === username ? (
            <>
              <div className="posts">
                {saved?.map(({ content, _id }) => {
                  return (
                    <img src={content} alt="" className="post" key={_id} />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="posts">
                {posts.map(({ content, _id }) => {
                  return (
                    <img src={content} alt="" className="post" key={_id} />
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
      {isFollowers && (
        <>
          <Followers />
          <div className="overlay"></div>
          <span
            className="material-symbols-outlined info-closeIcon"
            onClick={() => setisFollowers(false)}
          >
            close
          </span>
        </>
      )}
      {isFollowing && (
        <>
          <Following />
          <div className="overlay"></div>
          <span
            className="material-symbols-outlined info-closeIcon"
            onClick={() => setIsFollowing(false)}
          >
            close
          </span>
        </>
      )}
    </>
  );
};

export default Profile;
