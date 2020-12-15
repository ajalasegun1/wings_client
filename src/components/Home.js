import React, { useContext, useEffect } from "react";
import "./Home.css";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
import { AuthContext } from "../contexts/authContext";

function Home(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const displayPage = () => {
    return (
      <div className="container spaceTop">
        <div className="row">
          {
            <div className="col-4 border-right-color home-left-column">
              <HomeLeft />
            </div>
          }
          <div className="col-8 home-right-column">
            <HomeRight />
          </div>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/guest");
    }
    return () => {};
  });
  return <div>{displayPage()}</div>;
}

export default Home;
