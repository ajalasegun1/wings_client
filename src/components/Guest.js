import React, { useState, useEffect } from "react";
import axios from "axios";
import GuestContent from "./GuestContent";
import Pagination from "./Pagination";

function Guest() {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/car/guest").then((res) => {
      setLoading(false);
      setAds(res.data);
    });
    return () => {};
  }, []);

  //get current post
  const indexOfLastAd = currentPage * adPerPage;
  const indexOfFirstAd = indexOfLastAd - adPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
  //changepage
  const paginate = (pageNumber) => {
    return setCurrentPage(pageNumber)
  }

  return (
    <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-8">
        <GuestContent ads={currentAds} loading={loading} />
        <Pagination
          adsPerPage={adPerPage}
          totalAd={ads.length}
          paginate={paginate}
        />
      </div>

      <div className="col-md-2"></div>
    </div>
  );
}

export default Guest;
