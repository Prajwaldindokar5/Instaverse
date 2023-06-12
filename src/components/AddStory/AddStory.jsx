import { useEffect, useRef, useState } from "react";
import "./AddStory.scss";
import Upload from "../../utils/upload";
import NewRequest from "../../utils/newRequest";

const AddStory = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");
  const [isFile, setIsFile] = useState();

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

  const handleAddClick = async () => {
    try {
      const res = await NewRequest.post("/story/addStory", {
        story: isFile,
      });

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
