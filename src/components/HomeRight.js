import React, { useState, useEffect } from "react";
import HomeRightCard from "./HomeRightCard";
import axios from "axios";
import Pusher from "pusher-js";
import FilterRow from "./FilterRow";

function HomeRight() {
  const [cars, setCars] = useState(null);
  const [checker, setChecker] = useState(false)

  useEffect(() => {
    console.log("I'm called")
    axios
      .get("/car")
      .then((result) => setCars(result.data.reverse()))
      .catch((err) => {
        console.log(err.response);
      });
  }, [checker]);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("8f1c1b41141be45abd07", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("cars");
    const channelFlags = pusher.subscribe("flags")
    channel.bind("inserted", function (data) {
      //alert(JSON.stringify(data));
      setCars([data, ...cars]);
      setChecker(!checker)
    });

    channel.bind("deleted", function (data){
      setChecker(!checker)
      console.log(data)
    })

    channelFlags.bind("inserted", function(data){
      setChecker(!checker)
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channelFlags.unbind_all();
      channelFlags.unsubscribe();
    };
  }, [cars, checker]);

  return (
    <div className="home-right-container">
      <FilterRow />
      <HomeRightCard cars={cars} />
    </div>
  );
}

export default HomeRight;
