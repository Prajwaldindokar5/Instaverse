import axios from "axios";

const Upload = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "gjvio4oy");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dljzenvs4/image/upload",
    data
  );

  const { url } = res.data;
  return url;
};

export default Upload;
