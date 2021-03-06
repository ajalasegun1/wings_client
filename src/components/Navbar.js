import React, { useContext } from "react";
import wings from "../wings.png";
import { Link} from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

const Navbar = (props) => {
  const { centralUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  console.log(centralUser, isLoggedIn);

  const loggedOutNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="signup" className="nav-link">
            Sign up
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/signin" className="nav-link">
            Sign in
          </Link>
        </li>
      </ul>
    );
  };

  const loggedInNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li>
          <form onSubmit={onSubmit}>
            <button
              className="btn btn-secondary"
              type="submit"
              onClick={onSubmit}
            >
              Logout
            </button>
          </form>
        </li>
      </ul>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.get("/auth/signout").then((res) => {
      setIsLoggedIn(false);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <Link to="/" className="navbar-brand">
        <img
          src={wings}
          width="70"
          height="35"
          className="d-inline-block align-top"
          alt="Logo"
          loading="lazy"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse navFont" id="navbarNavDropdown">
        
        {isLoggedIn === false && loggedOutNav()}
        {isLoggedIn === true && loggedInNav()}
      </div>
    </nav>
  );
};

export default Navbar;
