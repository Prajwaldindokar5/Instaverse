import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import Explore from "./pages/Explore/Explore";
import Register from "./pages/Register/Register";
import "./App.scss";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  const Layout = () => {
    const cookie = document.cookie;
    if (!cookie) {
      return <Login />;
    }
    return (
      <div className="app">
        <Navbar />

        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/:username", element: <Profile /> },
        { path: "/explore", element: <Explore /> },
        { path: "/account/editProfile", element: <EditProfile /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/account/register", element: <Register /> },
    { path: "/account/forgotPassword", element: <ForgotPassword /> },
    { path: "/account/resetPassword/:token", element: <ResetPassword /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
