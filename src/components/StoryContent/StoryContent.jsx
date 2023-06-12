import { useSelector } from "react-redux";
import "./StoryContent.scss";
import NewRequest from "../../utils/newRequest";

const StoryContent = ({ story }) => {
  const user = useSelector((state) => state.user);
  const handleDeleteStory = async () => {
    try {
      const res = await NewRequest.delete(`/story/${story._id}`);
      if (res.data.status === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="story-content">
      <img className="content" src={story.story} alt="" />
      {user.username === story.user.username && (
        <span className="material-symbols-outlined" onClick={handleDeleteStory}>
          delete
        </span>
      )}
    </div>
  );
};

export default StoryContent;
