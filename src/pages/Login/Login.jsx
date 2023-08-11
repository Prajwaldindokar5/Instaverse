import "./Login.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/authSlice";
import { useState } from "react";
import { useLoginMutation } from "../../Slices/userApiSlice";

const Login = () => {
  const [error, setError] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const res = await login(values);

      if (res.data?.status === "success") {
        const { user } = res.data;
        dispatch(setUser(user));
        window.location.reload();
      } else {
        setError(res.error.data.message);
      }
    },
  });
  return (
    <>
      <div className="login">
        <span className=" form-head">Instaverse</span>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <FormInput
            placeholder="Username"
            id="username"
            {...formik.getFieldProps("username")}
            onClick={() => setError(false)}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="input-error">{formik.errors.username}</div>
          ) : (
            ""
          )}
          <FormInput
            placeholder="Password"
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            onClick={() => setError(false)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="input-error">{formik.errors.password}</div>
          ) : (
            ""
          )}

          <button type="submit" className="login-btn">
            Login
          </button>

          <Link className="link forgot-link" to="/account/forgotPassword">
            forgot password?
          </Link>
        </form>

        {error && <span className="error-message">{error}</span>}
      </div>
      <div className="dont-have-account-sec">
        <span>Don't have a account?</span>
        <Link className="link register-link" to="/account/register">
          Signup
        </Link>
      </div>
    </>
  );
};

export default Login;
