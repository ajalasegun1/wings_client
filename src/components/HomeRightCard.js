import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./modals/EditModal";
import FlagModal from "./modals/FlagModal";
import FlagCountModal from "./modals/FlagCountModal";

function HomeRightCard({ cars, searchInput }) {
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [adId, setAdId] = useState("");
  const [flags, setFlags] = useState([]);
  const [displayReport, setDisplayReport] = useState(null);

  useEffect(() => {
    axios.get("/flag").then((res) => {
      setFlags(res.data);
    });
  }, [cars, searchInput]);

  //Handle delete button
  const deleteAd = (id) => {
    axios
      .delete(`/car/${id}`)
      .then((res) => {
        console.log(res.data._id);
        console.log(`item: ${res.data._id} deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                        <i
                          className="far fa-edit"
                          style={{ marginLeft: "5px" }}
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                      >
                        Mark as Sold
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteAd(item._id)}
                      >
                        Delete Ad
                        <i
                          className="far fa-trash-alt"
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

      {searchInput && searchInput.length > 0
        ? loadCars(searchInput)
        : loadCars(cars)}
    </div>
  );
}

export default HomeRightCard;
