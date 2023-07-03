import { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Create from "../create/Create";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch, setNavShrink } from "../../Slices/appSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Slices/authSlice";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../../Slices/userApiSlice";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);
  const isSearch = useSelector((state) => state.app.isSearch);
  const navShrink = useSelector((state) => state.app.navShrink);
  const [logout] = useLogoutMutation();

  const handleSearchClick = () => {
    dispatch(setIsSearch(!isSearch));
    dispatch(setNavShrink(!navShrink));
  };
  const handleLogoutClick = async () => {
    try {
      const res = await logout();
      if (res.data?.status === "success") {
        dispatch(logoutUser(null));
        navigate("/");
        Cookies.remove("jwt");
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <>
      <div className={`navbar ${navShrink ? "shrink" : ""}`}>
        <section className="logo">
          <Link className="link">
            {navShrink ? (
              <img src="../img/logoIcon.svg" alt="" className="logo-icon" />
            ) : (
              <span className="navLogo">Instaverse</span>
            )}
          </Link>
        </section>
        <section className="navItems">
          <Link className="link" to={"/"}>
            {navShrink ? (
              <img src="../img/homeIcon.svg" alt="" className="nav-icon" />
            ) : (
              <>
                <img src="../img/homeIcon.svg" alt="" className="nav-icon" />
                <span className="icon-text">Home</span>
              </>
            )}
          </Link>
          <Link className="link" to={"#"} onClick={handleSearchClick}>
            {navShrink ? (
              <img src="../img/searchIcon.svg" alt="" className="nav-icon" />
            ) : (
              <>
                <img src="../img/searchIcon.svg" alt="" className="nav-icon" />
                <span className="icon-text">Search</span>
              </>
            )}
          </Link>
          <Link className="link" to={"/explore"}>
            {navShrink ? (
              <img src="../img/exploreIcon.svg" alt="" className="nav-icon" />
            ) : (
              <>
                <img src="../img/exploreIcon.svg" alt="" className="nav-icon" />
                <span className="icon-text">Explore</span>
              </>
            )}
          </Link>
          <Link
            className="link"
            to={"#"}
            onClick={() => setIsCreate(!isCreate)}
          >
            {navShrink ? (
              <img src="../img/createIcon.svg" alt="" className="nav-icon" />
            ) : (
              <>
                <img src="../img/createIcon.svg" alt="" className="nav-icon" />
                <span className="icon-text">Create</span>
              </>
            )}
          </Link>
          <Link className="link" to={`/${user?.username}`}>
            {navShrink ? (
              <img src={user?.photo} alt="" className="nav-icon profile-icon" />
            ) : (
              <>
                <img
                  src={user?.photo}
                  alt=""
                  className="nav-icon profile-icon"
                />
                <span className="icon-text">Profile</span>
              </>
            )}
          </Link>
        </section>

        <section className="menu">
          {isMenu && (
            <div className="menu-box">
              <Link className="saved link" to={`/${user?.username}`}>
                <img src="../img/saveIcon.svg" alt="" className="saved-icon" />
                <span className="menu-text">Saved</span>
              </Link>

              <span className="logout" onClick={handleLogoutClick}>
                Logout
              </span>
            </div>
          )}
          <div className="menu-options" onClick={() => setIsMenu(!isMenu)}>
            {navShrink ? (
              <img src="../img/menuIcon.svg" alt="" className="menu-icon" />
            ) : (
              <>
                <img src="../img/menuIcon.svg" alt="" className="menu-icon" />
                <span className="icon-text">Menu</span>
              </>
            )}
          </div>
        </section>
      </div>
      {isSearch && <Search />}
      {isCreate && (
        <>
          <Create />
          <div className="overlay"></div>
          <span
            className="material-symbols-outlined closeIcon"
            onClick={() => setIsCreate(false)}
          >
            close
          </span>
        </>
      )}
    </>
  );
};

export default Navbar;
