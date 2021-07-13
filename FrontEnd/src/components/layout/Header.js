import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== typeof "undefined") {
      setUser(token);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <>
      <div className="logo">
        <Link to="/">
          <h1>INVENTORY</h1>
        </Link>
      </div>

      <div className="btns">
        <ul>
          <li>
            {user && (
              <div>
                <Link to="/admin">Admin</Link>
                <button className="btn headerbtn" onClick={logOut}>
                  Log Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
