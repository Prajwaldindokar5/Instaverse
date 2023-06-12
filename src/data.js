export const story = [
  {
    content: "../img/default.jpg",
    username: "username",
    key: 0,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 1,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 2,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 3,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 4,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 5,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 6,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 7,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 8,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 9,
  },
  {
    content: "../img/default.jpg",
    username: "username",
    key: 10,
  },
];

export const posts = [
  { img: "../img/default.jpg", key: 1 },
  { img: "../img/default.jpg", key: 2 },
  { img: "../img/default.jpg", key: 3 },
  { img: "../img/default.jpg", key: 4 },
  { img: "../img/default.jpg", key: 5 },
  { img: "../img/default.jpg", key: 6 },
  { img: "../img/default.jpg", key: 7 },
  { img: "../img/default.jpg", key: 8 },
  { img: "../img/default.jpg", key: 9 },
  { img: "../img/default.jpg", key: 10 },
  { img: "../img/default.jpg", key: 11 },
];

// import "./Profile.scss";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Followers from "../../components/Followers/Followers";
// import Following from "../../components/Following/Following";
// import { useSelector, useDispatch } from "react-redux";
// import { setGetUser, setUser } from "../../state/slice";
// import NewRequest from "../../utils/newRequest";

// const Profile = () => {
//   const [isSaved, setIsSaved] = useState(false);
//   const [savedIsActive, setSavedIsActive] = useState(false);
//   const [postIsActive, setPostIsActive] = useState(true);
//   const [isFollowers, setisFollowers] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [following, setFollowing] = useState(false);

//   const handleSavedClick = () => {
//     setIsSaved(true);
//     setSavedIsActive(true);
//     setPostIsActive(false);
//   };
//   const handlePostClick = () => {
//     setIsSaved(false);
//     setSavedIsActive(false);
//     setPostIsActive(true);
//   };

//   const currentUser = useSelector((state) => state.user);
//   const user = useSelector((state) => state.getUser);
//   const saved = user.saved;

//   const posts = [...user.posts].sort((a, b) => {
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });

//   const dispatch = useDispatch();
//   const username = window.location.href.split("/")[3];

//   useEffect(() => {
//     setIsLoading(true);
//     const fetchData = async () => {
//       const res = await NewRequest.get(`/user/profile/${username}`);
//       if (res.data.status === "success") {
//         setIsLoading(false);
//       }
//       dispatch(setGetUser(res.data.user));
//     };
//     fetchData();
//   }, [username, dispatch]);

//   const handleFollow = async (userId) => {
//     try {
//       const res = await NewRequest.post(`/user/manageFollow/${userId}`);
//       dispatch(setUser(res.data.currentuser));
//       console.log(res.data.currentuser);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <div className={`profile ${isLoading ? "load" : ""}`}>
//         <section className="profile-head">
//           <img src={user?.photo} alt="" className="profile-img" />
//           <div className="profile-info">
//             <section className="upper-info">
//               <span className="username">{user?.username}</span>
//               {currentUser.username === username ? (
//                 <Link className="link" to="/account/editProfile">
//                   <button className="edit-btn ">Edit Profile</button>
//                 </Link>
//               ) : (
//                 <button
//                   className="profile-follow-btn "
//                   onClick={() => handleFollow(user._id)}
//                 >{`${
//                   currentUser.following.some((id) => id._id === user._id)
//                     ? "Following"
//                     : "Follow"
//                 }`}</button>
//               )}
//             </section>
//             <section className="middle-info">
//               <span className="posts">
//                 <strong>{user?.posts?.length}</strong> posts
//               </span>
//               <span
//                 className="followers show"
//                 onClick={(e) => setisFollowers(!isFollowers)}
//               >
//                 <strong>{user?.totalFollowers}</strong> followers
//               </span>
//               <span
//                 className="following show"
//                 onClick={(e) => setIsFollowing(!isFollowing)}
//               >
//                 <strong>{user?.totalFollowing}</strong> following
//               </span>
//             </section>
//             <section className="lower-info">
//               <strong className="name">{user?.name}</strong>
//               <span className="bio">{user?.bio}</span>
//             </section>
//           </div>
//         </section>
//         <section className="posts-section">
//           <section className="heading">
//             <div
//               className={`post-heading ${postIsActive ? "active" : ""}`}
//               onClick={handlePostClick}
//             >
//               <img src="../img/postIcon.svg" alt="" className="postIcon" />
//               <span>POSTS</span>
//             </div>
//             <div
//               className={`post-heading ${savedIsActive ? "active" : ""}`}
//               onClick={handleSavedClick}
//             >
//               <img src="../img/saveIcon.svg" alt="" className="postIcon" />
//               <span>SAVED</span>
//             </div>
//           </section>
//           {isSaved ? (
//             <>
//               <div className="posts">
//                 {saved?.map(({ content, _id }) => {
//                   return (
//                     <img src={content} alt="" className="post" key={_id} />
//                   );
//                 })}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="posts">
//                 {posts.map(({ content, _id }) => {
//                   return (
//                     <img src={content} alt="" className="post" key={_id} />
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </section>
//       </div>
//       {isFollowers && (
//         <>
//           <Followers />
//           <div className="overlay"></div>
//           <span
//             className="material-symbols-outlined info-closeIcon"
//             onClick={() => setisFollowers(false)}
//           >
//             close
//           </span>
//         </>
//       )}
//       {isFollowing && (
//         <>
//           <Following />
//           <div className="overlay"></div>
//           <span
//             className="material-symbols-outlined info-closeIcon"
//             onClick={() => setIsFollowing(false)}
//           >
//             close
//           </span>
//         </>
//       )}
//     </>
//   );
// };

// export default Profile;

export const saved = [
  { img: "../img/saved.jpg", key: 1 },
  { img: "../img/saved.jpg", key: 2 },
  { img: "../img/saved.jpg", key: 3 },
  { img: "../img/saved.jpg", key: 4 },
  { img: "../img/saved.jpg", key: 5 },
  { img: "../img/saved.jpg", key: 6 },
  { img: "../img/saved.jpg", key: 7 },
  { img: "../img/saved.jpg", key: 8 },
  { img: "../img/saved.jpg", key: 9 },
  { img: "../img/saved.jpg", key: 10 },
  { img: "../img/saved.jpg", key: 11 },
];
