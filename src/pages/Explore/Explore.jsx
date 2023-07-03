import { useSelector } from "react-redux";
import "./Explore.scss";

const Explore = () => {
  const posts = useSelector((state) => state.app.allPosts);
  return (
    <div className="explore">
      <div className="explore-posts">
        {posts.map(({ content, _id }) => {
          return (
            <img src={content} alt="" className="explore-post" key={_id} />
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
