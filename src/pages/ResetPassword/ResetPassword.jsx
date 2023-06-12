import "./ResetPassword.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate, useLocation } from "react-router-dom";
import NewRequest from "../../utils/newRequest";
import { useState } from "react";

const ResetPassword = () => {
  const [error, setError] = useState(false);
  const token = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("Required")
        .min(8, "at least 8 characters or more"),
      confirmPassword: yup
        .string()
        .required("Required")
        .min(8, "at least 8 characters or more")
        .oneOf([yup.ref("password")], "Password Must Match"),
    }),

    onSubmit: async (values) => {
      try {
        const res = await NewRequest.patch(`/user/resetPassword/${token}`, {
          ...values,
        });
        if (res.data.status === "success") {
          navigate("/");
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });
  return (
    <div className="resetPassword">
      <section className=" form-head">
        <span className="form-logo">Instaverse</span>{" "}
        <span>* Reset Password</span>
      </section>
      <form onSubmit={formik.handleSubmit} className="reset-form">
        <FormInput
          placeholder="Password"
          id="password"
          {...formik.getFieldProps("password")}
          onClick={() => setError(false)}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="input-error">{formik.errors.password}</div>
        ) : (
          ""
        )}
        <FormInput
          placeholder="ConfirmPassword"
          id="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
          onClick={() => setError(false)}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="input-error">{formik.errors.confirmPassword}</div>
        ) : (
          ""
        )}

        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
      {error && <span className="message-err">{error}</span>}
    </div>
  );
};

export default ResetPassword;
