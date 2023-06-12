import { useEffect, useRef, useState } from "react";
import "./Create.scss";
import Upload from "../../utils/upload";
import NewRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");
  const [isFile, setIsFile] = useState();
  const [caption, setCaption] = useState("");
  const handleButtonClick = async (e) => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const handleSelectedFile = async () => {
      const fileUrl = file ? await Upload(file) : null;
      setIsFile(fileUrl);
    };
    handleSelectedFile();
  }, [file]);

  const navigate = useNavigate();

  const handlePostClick = async () => {
    try {
      const res = await NewRequest.post("/post", {
        content: isFile,
        caption,
      });
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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