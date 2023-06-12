import { useSelector, useDispatch } from "react-redux";
import { setGetUser } from "../../state/slice";
import NewRequest from "../../utils/newRequest";
import { useEffect } from "react";
import "./Followers.scss";
import { setUser } from "../../state/slice";

const Followers = () => {
  const user = useSelector((state) => state.getUser);
  const currentuser = useSelector((state) => state.user);
  const usernamePath = window.location.href.split("/")[3];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await NewRequest.get(`/user/profile/${usernamePath}`);

      dispatch(setGetUser(res.data.user));
    };
    fetchData();
  }, [usernamePath, dispatch]);

  const handleFollow = async (userId) => {
    try {
      const res = await NewRequest.post(`/user/manageFollow/${userId}`);
      dispatch(setUser(res.data.currentuser));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFollower = async (userId) => {
    try {
      const res = await NewRequest.post(`/user/removeFollower/${userId}`);
      dispatch(setUser(res.data.currentuser));
    } catch (error) {
      console.log(error);
    }
  };

  const renderBtn = (userId) => {
    if (currentuser.username === usernamePath) {
      return (
        <button
          className="remove-btn"
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
              <div className="dynamic-btn">{renderBtn(_id)}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Followers;
