import { useEffect, useState } from "react";
import "./Story.scss";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../../Slices/appSlice";
import AddStory from "../AddStory/AddStory";
import StoryContent from "../StoryContent/StoryContent";
import { useGetStoriesQuery } from "../../Slices/apiSlice";

const Story = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(true);
  const [addStory, setAddStory] = useState(false);
  const [isStory, setIsStory] = useState(false);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const stories = useSelector((state) => state.app.stories);
  const user = useSelector((state) => state.auth.userInfo);

  //function for increasing slide no
  const handNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  //function for decreasing slide no
  const handPreviewSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  // use effect hook for hinding button according to the condition
  useEffect(() => {
    setActiveLeft(currentSlide >= 1);
    setActiveRight(currentSlide < stories.length - 9);
  }, [currentSlide, stories]);

  const { data, isLoading } = useGetStoriesQuery();
  useEffect(() => {
    if (data?.status === "success") {
      dispatch(setStories(data.stories));
    }
  }, [dispatch, data]);

  const filterStories = stories?.filter(
    (story) => story.user._id !== user?._id
  );
  const userStory = stories?.filter((story) => story.user._id === user?._id);

  const handleStatusClick = (story) => {
    setIsStory(true);
    setContent(story);
  };

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <div className="status-section">
            <div
              className="slider"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {userStory?.length > 0 ? (
                <div
                  className="status"
                  key={user?._id}
                  onClick={() => handleStatusClick(userStory[0])}
                >
                  <img src={user?.photo} alt="" className="status-img" />
                  <span className="status-text">{user?.username}</span>

                  {/* <span className="material-symbols-outlined add-icon">add</span> */}
                </div>
              ) : (
                <div
                  className="status"
                  key={user?._id}
                  onClick={() => setAddStory(!addStory)}
                >
                  <img src={user?.photo} alt="" className="status-img" />
                  <span className="status-text">{user?.username}</span>

                  <span className="material-symbols-outlined add-icon">
                    add
                  </span>
                </div>
              )}

              {filterStories.map((story) => {
                return (
                  <div
                    className="status"
                    key={story?._id}
                    onClick={() => handleStatusClick(story)}
                  >
                    <img
                      src={story?.user.photo}
                      alt=""
                      className="status-img"
                    />
                    <span className="status-text">{story?.user.username}</span>
                  </div>
                );
              })}
            </div>

            {activeLeft && (
              <button
                className="slider-btn slide-btn-left"
                onClick={handPreviewSlide}
              >
                <img src="../img/leftIcon.svg" alt="" />
              </button>
            )}

            {activeRight && (
              <button
                className="slider-btn slide-btn-right"
                onClick={handNextSlide}
              >
                <img src="../img/rightIcon.svg" alt="" />
              </button>
            )}
          </div>
          {addStory && (
            <>
              <AddStory />
              <div className="overlay"></div>
              <span
                className="material-symbols-outlined closeIcon"
                onClick={() => setAddStory(false)}
              >
                close
              </span>
            </>
          )}
          {isStory && (
            <>
              <StoryContent story={content} />
              <div className="content-overlay"></div>
              <span
                className="material-symbols-outlined closeIcon"
                onClick={() => setIsStory(false)}
              >
                close
              </span>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Story;
