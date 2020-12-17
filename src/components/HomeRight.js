import React, { useState, useEffect, useContext } from "react";
import HomeRightCard from "./HomeRightCard";
import axios from "axios";
import Pusher from "pusher-js";
import FilterRow from "./FilterRow";
import {AuthContext} from "../contexts/authContext"

function HomeRight() {
  const [cars, setCars] = useState(null);
  const [checker, setChecker] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const {centralUser} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get("/car")
      .then((result) => setCars(result.data.reverse()))
      .catch((err) => {
        console.log(err.response);
      });
  }, [checker]);

  useEffect(() => {
    //Pusher.logToConsole = true;
    const pusher = new Pusher("8f1c1b41141be45abd07", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("cars");
    const channelFlags = pusher.subscribe("flags");
    channel.bind("inserted", function (data) {
      //alert(JSON.stringify(data));
      setCars([data, ...cars]);
      setChecker(!checker);
    });

    channel.bind("deleted", function (data) {
      setChecker(!checker);
    });

    channel.bind("updated", function (data) {
      setChecker(!checker);
    });

    channelFlags.bind("inserted", function (data) {
      setChecker(!checker);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channelFlags.unbind_all();
      channelFlags.unsubscribe();
    };
  }, [cars, checker]);

  const getSearchInput = (data) => {
    setSearchInput(data);
  };
  return (
    <div className="home-right-container">
      <FilterRow getSearchInput={getSearchInput} />
      <HomeRightCard cars={cars} searchInput={searchInput} centralUser={centralUser}/>
    </div>
  );
}

export default HomeRight;
