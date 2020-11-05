import React, { useState } from "react";
import axios from "axios";
import EditModal from "./modals/EditModal";

function HomeRightCard({ cars }) {
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
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
      <div className="card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/02/Jaguar_XJR_Sonderedition_front_20080811.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  &#8358; <span className="text-success">12850</span>
                </td>
                <td>
                  <i className="fas fa-car"></i> Model: XJ6-1999
                </td>
                <td>Body_Type: 4-doors</td>
              </tr>

              <tr>
                <td>State: Used</td>
                <td>
                  Status: <span className="text-success">Available</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm"
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                  >
                    Sold
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {loadCars(cars)}
    </div>
  );
}

export default HomeRightCard;
