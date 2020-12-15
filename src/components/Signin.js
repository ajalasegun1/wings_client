import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";

function Signin(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { setCentralUser, setIsLoggedIn } = useContext(AuthContext);
  

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("click")
    axios
      .post("/auth/signin", user)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data)
          if(res.data.data.is_admin){
            setIsLoggedIn(true)
            setTimeout(()=> {
              props.history.push("/admin")
            }, 1000)
          }else{
            setIsLoggedIn(true)
            setTimeout(()=> {
              props.history.push("/")
            }, 1000)
          }
          setCentralUser(res.data.data);
          setSuccess(true)
          setError(null)
          setUser({email: "", password: ""})
          /*setTimeout(()=> {
            props.history.push("/")
          }, 1000)*/
        }
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data === "Unauthorized"){
          setError("Incorrect email or password")
        }
      });
  };

  return (
    <div className="login_form">
      <form onSubmit={onSubmit}>
        <h3>Sign in</h3>
        <br />
        {success ? (
          <div className="alert alert-success" role="alert">
            Sign in successful... 
          </div>
        ) : null}

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error} 
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={user.email}
            required
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            required
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signin;
