import { useSelector, useDispatch } from "react-redux";
import { setGetUser } from "../../Slices/appSlice";
import {
  useFollowUserMutation,
  useRemoveFollowerMutation,
} from "../../Slices/userApiSlice";
import { useEffect } from "react";
import "./Followers.scss";
import { setUser } from "../../Slices/authSlice";
import { useGetUserQuery } from "../../Slices/apiSlice";

const Followers = () => {
  const user = useSelector((state) => state.app.getUser);
  const currentuser = useSelector((state) => state.auth.userInfo);
  const usernamePath = window.location.href.split("/")[3];

  const dispatch = useDispatch();

  const { data } = useGetUserQuery(usernamePath);

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(setGetUser(data.user));
    }
  }, [usernamePath, dispatch, data]);

  const [followUser] = useFollowUserMutation();

  const handleFollow = async (userId) => {
    const res = await followUser(userId);

    if (res.data?.status === "success") {
      dispatch(setUser(res.data.currentuser));
    }
  };

  const [removeFollower] = useRemoveFollowerMutation();
  const handleRemoveFollower = async (userId) => {
    const res = await removeFollower(userId);
    if (res.data?.status === "success") {
      dispatch(setUser(res.data.currentuser));
    }
  };

  const renderBtn = (userId) => {
    if (currentuser.username === usernamePath) {
      return (
        <button
          className="remove-btn "
          onClick={() => handleRemoveFollower(userId)}
        >
          Remove
        </button>
      );
    } else if (currentuser.following.some((id) => id._id === userId)) {
      return (
        <button
          className="profile-following-btn "
          onClick={() => handleRemoveFollower(userId)}
        >
          following
        </button>
      );
    } else if (
      user.followers.some(
        (id) => id._id === currentuser._id && id._id === userId
      )
    ) {
      return "";
    } else {
      return (
        <button
          className="profile-follow-btn "
          onClick={() => handleFollow(userId)}
        >
          follow
        </button>
      );
    }
  };
  return (
    <div className="followers-info">
      <section className="followers-info-head">Followers</section>
      <section className="followersInfo">
        {user.followers.map(({ username, _id, photo }) => {
          return (
            <div className="follower-info" key={_id}>
              <img src={photo} alt="" />
              <span className="username">{username}</span>
              {renderBtn(_id)}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Followers;
