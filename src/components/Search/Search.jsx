import { useDispatch, useSelector } from "react-redux";
import "./Search.scss";
import { useState } from "react";
import { setAllUsers } from "../../state/slice";
import NewRequest from "../../utils/newRequest";
import { setIsSearch, setNavShrink } from "../../state/slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Search = () => {
  const users = useSelector((state) => state.allUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await NewRequest.get("/user");
      dispatch(setAllUsers(res.data.users));
    };
    fetchData();
  }, [dispatch]);

  const [searchString, setSearchString] = useState("");
  const [isLength, setIsLength] = useState(false);

  const handleChange = (e) => {
    const string = e.target.value;
    setSearchString(string.toLowerCase());
    const length = string.split("");
    if (length.length >= 2) {
      setIsLength(true);
    } else {
      setIsLength(false);
    }
  };

  const searchResults = users.filter((user) =>
    user.username.toLowerCase().includes(searchString)
  );

  const handleResultClick = (username) => {
    navigate(`/${username}`);
    dispatch(setIsSearch(false));
    dispatch(setNavShrink(false));
  };

  return (
    <div className="search-container">
      <section className="search-header">
        <h1 className="search-heading">Search</h1>
        <input
          type="search"
          className="search-input"
          placeholder="search..."
          onChange={handleChange}
        />
      </section>
      <section className={`search-results ${isLength ? "" : "hide"}`}>
        {searchResults.map(({ username, photo, id }) => {
          return (
            <div
              className="result"
              key={id}
              onClick={() => handleResultClick(username)}
            >
              <img src={photo} alt="" />
              <span className="result-username">{username}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default Search;
