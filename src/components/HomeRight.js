import React, { useState, useEffect } from "react";
import HomeRightCard from "./HomeRightCard";
import axios from "axios";
import Pusher from "pusher-js"

function HomeRight() {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    axios
      .get("/car")
      .then((result) => setCars(result.data.reverse()))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('8f1c1b41141be45abd07', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('cars');
    channel.bind('inserted', function(data) {
      //alert(JSON.stringify(data));
      setCars([data, ...cars])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [cars])

  return (
    <div className="home-right-container">
      <HomeRightCard cars={cars} />
    </div>
  );
}

export default HomeRight;
