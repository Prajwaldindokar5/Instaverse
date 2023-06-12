import "./Following.scss";
import { useSelector, useDispatch } from "react-redux";
import { setGetUser, setUser } from "../../state/slice";
import NewRequest from "../../utils/newRequest";
import { useEffect } from "react";

const Following = () => {
  const user = useSelector((state) => state.getUser);
  const currentUser = useSelector((state) => state.user);
  const username = window.location.href.split("/")[3];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await NewRequest.get(`/user/profile/${username}`);

      dispatch(setGetUser(res.data.user));
    };
    fetchData();
  }, [username, dispatch]);

  const handleFollow = async (userId) => {
    try {
      const res = await NewRequest.post(`/user/manageFollow/${userId}`);
      dispatch(setUser(res.data.currentuser));
    } catch (error) {
      console.log(error);
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
