import "./Register.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import NewRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
      password: yup
        .string()
        .required("Required")
        .min(8, "at least 8 characters or more"),
      email: yup.string().email("Invalid Email").required("Required"),
      name: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await NewRequest.post("/user/register", {
          ...values,
        });
        if (res.data.status === "success") {
          dispatch(setUser(res.data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="register">
      <section className=" form-head">
        <span className="form-logo">Instaverse</span>{" "}
        <span>* Register New User</span>
      </section>
      <form onSubmit={formik.handleSubmit} className="register-form">
        <FormInput
          placeholder="Name"
          id="name"
          type="name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="input-error">{formik.errors.name}</div>
        ) : (
          ""
        )}
        <FormInput
          placeholder="Email"
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="input-error">{formik.errors.email}</div>
        ) : (
          ""
        )}
        <FormInput
          placeholder="Username"
          id="username"
          {...formik.getFieldProps("username")}
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
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="input-error">{formik.errors.password}</div>
        ) : (
          ""
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
