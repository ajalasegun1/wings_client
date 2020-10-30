import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

function Signup(props) {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
  });

  const [err, setErr] = useState({});

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  //functions
  const validateNames = (name) => {
    name = name.trim();
    name = name.toLowerCase();
    const re = /(\b[a-z](?!\s))/g;
    name = name.replace(re, function (x) {
      return x.toUpperCase();
    });
    const regex = /^[a-zA-Z ]{2,30}$/;
    if (regex.test(name)) {
      return name;
    } else {
      setErr({ ...err, first_name: "Enter a valid name" });
      return "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    user.first_name = validateNames(user.first_name);
    user.last_name = validateNames(user.last_name);
    if (user.first_name === "" || user.last_name === "") {
      return;
    } else {
      axios
        .post("/auth/signup", user)
        .then((res) => {
          if (res.data.status === 200) {
            setSuccess(true);
            setTimeout(() => {
              props.history.push("/signin");
            }, 2000);
          }
          if(res.data.status === 404){
            setError(res.data.error)
          }
        })
        .catch((err) => setError("Something went wrong"));
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="register_form">
      <form onSubmit={onSubmit}>
        <h3>Sign up</h3>
        <br />
        {success ? (
          <div className="alert alert-success" role="alert">
            Signup successful...
          </div>
        ) : null}

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            aria-describedby="emailHelp"
            name="first_name"
            required
            onChange={onChange}
            value={user.first_name}
          />
          <small id="emailHelp" className="form-text text-muted">
            {err.first_name && err.first_name}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="emailHelp"
            name="last_name"
            required
            onChange={onChange}
            value={user.last_name}
          />
          <small id="emailHelp" className="form-text text-muted">
            {err.first_name && err.first_name}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            required
            onChange={onChange}
            value={user.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Address</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            name="address"
            required
            onChange={onChange}
            value={user.address}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            onChange={onChange}
            value={user.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
