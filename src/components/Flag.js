import React, { useState, useEffect } from "react";
import axios from "axios";

function Flag({ ad_id, getAdId, getFlags }) {
  //handle flagClick
  const [flagCount, setFlagCount] = useState("");
  const [checker, setChecker] = useState(true);
  useEffect(() => {
    console.log("I'm called");

      axios
        .get(`/flag/${ad_id}`)
        .then((data) => {
          setFlagCount(data.data.length);
          getFlags(data.data);
        })
        .catch((err) => {
          return null;
        });

    return () => {
      setChecker(!checker);
     
    };
  },[ad_id, checker, getFlags]);

  return (
    <div>
      <i
        className="fas fa-flag flag-color"
        data-toggle="modal"
        data-target="#flagModal"
        onClick={() => {
          getAdId(ad_id);
        }}
      ></i>{" "}
      <span className="badge badge-pill badge-primary pill-button">
        {flagCount}
      </span>
    </div>
  );
}

export default Flag;
