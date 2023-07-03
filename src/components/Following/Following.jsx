import "./Following.scss";
import { useSelector, useDispatch } from "react-redux";
import { setGetUser } from "../../Slices/appSlice";
import { setUser } from "../../Slices/authSlice";
import { useFollowUserMutation } from "../../Slices/userApiSlice";
import { useEffect } from "react";
import { useGetUserQuery } from "../../Slices/apiSlice";

const Following = () => {
  const user = useSelector((state) => state.app.getUser);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const username = window.location.href.split("/")[3];

  const dispatch = useDispatch();

  const { data } = useGetUserQuery(username);

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(setGetUser(data.user));
    }
  }, [username, dispatch, data]);

  const [followUser] = useFollowUserMutation();

  const handleFollow = async (userId) => {
    const res = await followUser(userId);

    if (res.data?.status === "success") {
      dispatch(setUser(res.data.currentuser));
    }
  };

  const renderBtn = (userId) => {
    if (currentUser.following.some((id) => id._id === userId)) {
      return <button className="profile-following-btn">following</button>;
    } else if (
      user.following.some(
        (id) => id._id === currentUser._id && id._id === userId
      )
    ) {
      return "";
    } else {
      return (
        <button
          className="profile-follow-btn"
          onClick={() => handleFollow(userId)}
        >
          follow
        </button>
      );
    }
  };

  return (
    <div className="info-followings">
      <section className="info-following-head">Followings</section>
      <section className="infoFollowing">
        {user.following.map(({ photo, username, _id }) => {
          return (
            <div className="info-following" key={_id}>
              <img src={photo} alt="" />
              <span className="username">{username}</span>

              <div className="dynamic-btn">{renderBtn(_id)}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Following;
