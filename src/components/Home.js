import React from "react";
import "./Home.css";
import HomeLeft from "./HomeLeft"
import HomeRight from "./HomeRight";

function Home() {
  return (
    <div>
      <div className="container spaceTop">
        <div className="row">
          <div className="col-4 border-right-color home-left-column">
            <HomeLeft />
          </div>
          <div className="col-8 home-right-column">
            <HomeRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
