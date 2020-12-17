import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./modals/EditModal";
import FlagModal from "./modals/FlagModal";
import FlagCountModal from "./modals/FlagCountModal";
import OfferModal from "./modals/OfferModal";

function HomeRightCard({ cars, searchInput, centralUser }) {
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [adId, setAdId] = useState("");
  const [flags, setFlags] = useState([]);
  const [displayReport, setDisplayReport] = useState(null);
  const [owner, setOwner] = useState(null);
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    axios.get("/flag").then((res) => {
      setFlags(res.data);
    });
  }, [cars, searchInput]);

  //get price
  const getPrice = (price, id) => {
    if (price) {
      setPrice(price);
    }

    if (id) {
      setId(id);
    }
  };
  //display flags
  const showFlags = (data, dataId) => {
    return data.filter((item) => {
      return item.car_id === dataId;
    });
  };

  const showFlagHandler = (id) => {
    setDisplayReport(
      showFlags(flags, id)
        .filter((data) => {
          return data.car_id === id;
        })
        .reverse()
    );
  };

  const whatButtonToShow = (loggedInUser, adOwner, item) => {
    if (loggedInUser === adOwner) {
      return (
        <tr>
          <td>
            <button
              type="button"
              className="btn btn-outline-warning btn-sm"
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => getPrice(item.price, item._id)}
            >
              Edit Price
              <i className="far fa-edit" style={{ marginLeft: "5px" }}></i>
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-toggle="modal"
              data-target="#offerModal"
              onClick={() => getPrice(item.price, item._id)}
            >
              View Offers
              <i
                className="fas fa-money-bill-alt"
                style={{ marginLeft: "5px" }}
              ></i>
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-toggle="modal"
              data-target="#offerModal"
              onClick={() => {
                setOwner(item.owner);
                setAdId(item._id);
                setCarDetails(
                  `${item.manufacturer} ${item.model} ${item.body_type} Amount: ${item.price}`
                );
              }}
            >
              Make offer
              <i
                className="fas fa-money-bill-alt"
                style={{ marginLeft: "5px" }}
              ></i>
            </button>
          </td>
          <td>
            <i
              className="fas fa-flag flag-color"
              data-toggle="modal"
              data-target="#flagModal"
              onClick={() => {
                setAdId(item._id);
              }}
            ></i>{" "}
            <span
              className="badge badge-pill badge-primary pill-button"
              onClick={() => showFlagHandler(item._id)}
              data-toggle="modal"
              data-target="#flagCountModal"
            >
              {
                flags.filter((flag) => {
                  return flag.car_id === item._id;
                }).length
              }
            </span>
          </td>
        </tr>
      );
    }
  };
  const loadCars = (cars) => {
    if (cars) {
      return cars.map((item) => {
        return (
          <div className="card" key={item._id}>
            <img src={item.imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      &#8358; <span className="text-success">{item.price}</span>
                    </td>
                    <td>
                      <i className="fas fa-car"></i> {item.manufacturer}
                    </td>
                    <td>Model: {item.model}</td>
                  </tr>

                  <tr>
                    <td>Body_Type: {item.body_type}</td>
                    <td>State: {item.state}</td>
                    <td>Status: {item.status}</td>
                  </tr>

                  {whatButtonToShow(centralUser._id, item.owner, item)}
                </tbody>
              </table>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <EditModal price={price} id={id} />
      <FlagModal adId={adId} />
      <FlagCountModal displayReport={displayReport} />
      <OfferModal
        owner={owner}
        buyer={centralUser._id}
        buyer_name={centralUser.first_name + " " + centralUser.last_name}
        adId={adId}
        carDetails={carDetails}
      />

      {searchInput && searchInput.length > 0
        ? loadCars(searchInput)
        : loadCars(cars)}
    </div>
  );
}

export default HomeRightCard;
