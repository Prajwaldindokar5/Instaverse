import "./Home.scss";
import Story from "../../components/Story/Story";
import Post from "../../components/Posts/Post";

const Home = () => {
  return (
    <div className="home">
      <Story />
      <Post />
    </div>
  );
};

export default Home;
