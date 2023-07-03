import { useSelector } from "react-redux";
import "./StoryContent.scss";
import { useDeleteStoryMutation } from "../../Slices/apiSlice";

const StoryContent = ({ story }) => {
  const user = useSelector((state) => state.auth.userInfo);
  const [deleteStory] = useDeleteStoryMutation();
  const handleDeleteStory = async () => {
    const res = await deleteStory(story._id);
    if (res.data.status === "success") {
      window.location.reload();
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
