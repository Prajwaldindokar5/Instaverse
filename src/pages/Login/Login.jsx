import "./Login.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import NewRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/slice";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);

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
      try {
        const res = await NewRequest.post("/user/login", {
          ...values,
        });
        dispatch(setUser(res.data.user));
        window.location.reload();
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });
  return (
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
        <span className="or">or</span>

        <Link className="link register-link" to="/account/register">
          Don't have an account.
        </Link>

        <Link className="link forgot-link" to="/account/forgotPassword">
          forgot password?
        </Link>
      </form>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Login;
