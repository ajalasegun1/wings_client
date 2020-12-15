import React, { useContext, useEffect } from "react";
import HomeLeft from "./HomeLeft";
import AdminHomeRight from "./AdminHomeRight";
import { AuthContext } from "../contexts/authContext";

function Admin(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const displayPage = () => {
    return (
      <div className="container spaceTop">
        <div className="row">
          {
            <div className="col-4  home-left-column">
              <HomeLeft />
            </div>
          }
          <div className="col-8 home-right-column">
            <AdminHomeRight />
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
  return <div>{isLoggedIn === true && displayPage()}</div>;
}

export default Admin;
