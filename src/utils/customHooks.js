import { useState, useEffect } from "react";
import Upload from "./upload";

export const useFileUrl = (file) => {
  const [isFile, setIsFile] = useState();

  useEffect(() => {
    const handleSelectedFile = async () => {
      const fileUrl = file ? await Upload(file) : null;
      setIsFile(fileUrl);
    };
    handleSelectedFile();
  }, [file]);

  return isFile;
};
