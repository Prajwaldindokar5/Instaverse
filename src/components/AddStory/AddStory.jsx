import { useRef, useState } from "react";
import "./AddStory.scss";
import { useFileUrl } from "../../utils/customHooks";
import { useAddStoryMutation } from "../../Slices/apiSlice";

const AddStory = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");
  const isFile = useFileUrl(file);

  const handleButtonClick = async (e) => {
    fileInputRef.current.click();
  };

  const [addStory] = useAddStoryMutation();

  const handleAddClick = async () => {
    const data = {
      story: isFile,
    };
    const res = await addStory(data);
    if (res.data?.status === "success") {
      window.location.reload();
    }
  };
  return (
    <div className="create-container ">
      {isFile ? (
        <>
          <img className="selected-img" src={isFile} alt=""></img>

          <button className="post-button" onClick={handleAddClick}>
            Add to Story
          </button>
        </>
      ) : (
        <>
          <section className="create-header">Add New Story</section>
          <section className="create">
            <img src="../img/photoIcon.svg" alt="" className="create-Icon" />

            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleButtonClick} className="select-button">
              Select Photo From Device
            </button>
          </section>{" "}
        </>
      )}
    </div>
  );
};

export default AddStory;
