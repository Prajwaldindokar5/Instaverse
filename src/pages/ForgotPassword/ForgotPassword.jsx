import "./ForgotPassword.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { useState } from "react";
import { useForgotPasswordMutation } from "../../Slices/userApiSlice";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const res = await forgotPassword(values);

      if (res.data.status === "success") {
        setSuccess("Mail Send To Your Registered Email");
      } else {
        setError("Unable To send Mail");
        console.log(error);
      }
    },
  });
  const handleMessage = () => {
    setError(false);
    setSuccess(false);
  };
  return (
    <div className="forgotPassword">
      <section className=" form-head">
        <span className="form-logo">Instaverse</span>{" "}
        <span>* Enter Username</span>
      </section>
      <form onSubmit={formik.handleSubmit} className="forgot-form">
        <FormInput
          placeholder="Username"
          id="username"
          {...formik.getFieldProps("username")}
          onClick={handleMessage}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="input-error">{formik.errors.username}</div>
        ) : (
          ""
        )}

        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
      {success && <span className="message success">*{success}</span>}
      {error && <span className="message error">*{error}</span>}
    </div>
  );
};

export default ForgotPassword;
