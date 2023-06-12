import "./EditProfile.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { useRef, useState } from "react";
import NewRequest from "../../utils/newRequest";
import Upload from "../../utils/upload";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../../state/slice";

const EditProfile = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      photo: "",
      bio: user.bio,
      email: user.email,
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email"),
    }),
    onSubmit: async (values) => {
      const fileUrl = file ? await Upload(file) : user.photo;
      try {
        const res = await NewRequest.patch("/user/updateProfile", {
          ...values,
          photo: fileUrl,
        });

        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="edit-profile">
      <span className="heading">Edit profile</span>
      <section className="edit-img">
        <div className="info">
          <img src={user.photo} alt="" />
          <span>_iam_prajwal</span>
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="change-btn" onClick={handleButtonClick}>
          Change profile photo
        </span>
      </section>
      <form onSubmit={formik.handleSubmit} className="edit-form">
        <FormInput label="Name" id="name" {...formik.getFieldProps("name")} />
        <FormInput
          label="Username"
          id="username"
          {...formik.getFieldProps("username")}
        />
        <FormInput label="Bio" id="bio" {...formik.getFieldProps("bio")} />
        <FormInput
          label="Email"
          id="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="input-error">{formik.errors.email}</div>
        ) : null}

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
