import { useRef, useState } from "react";
import "./Create.scss";
import { useNavigate } from "react-router-dom";
import { useFileUrl } from "../../utils/customHooks";
import { useAddPostMutation } from "../../Slices/apiSlice";

const Create = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");
  const isFile = useFileUrl(file);
  const [caption, setCaption] = useState("");
  const handleButtonClick = async (e) => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();

  const [addPost] = useAddPostMutation();

  const handlePostClick = async () => {
    const data = {
      content: isFile,
      caption: caption,
    };
    await addPost(data);
    navigate("/");
  };
  return (
    <div className="create-container ">
      {isFile ? (
        <>
          <img className="selected-img" src={isFile} alt=""></img>
          <input
            placeholder="Enter Caption for Post"
            type="text"
            className="caption"
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="post-button" onClick={handlePostClick}>
            Post
          </button>
        </>
      ) : (
        <>
          <section className="create-header">Create New Post</section>
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

export default Create;
