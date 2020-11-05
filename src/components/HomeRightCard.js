import React from "react";
import axios from "axios";

function HomeRightCard({ cars }) {

  const deleteAd = (id) => {
    axios
      .delete(`/car/${id}`)
      .then((res) => {
        console.log(res.data._id);
        console.log(`item: ${res.data._id} deleted`)
      })
      .catch((err) => {
        console.log(err);
      });
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
                      <i className="fas fa-car"></i> {item.model}
                    </td>
                    <td>Body_Type: {item.body_type}</td>
                  </tr>

                  <tr>
                    <td>State: {item.state}</td>
                    <td>
                      Status:{item._id}{" "}
                      <span className="text-success">{item.status}</span>
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
                        onClick={() => deleteAd(item._id)}
                      >
                        <i className="far fa-trash-alt"></i>
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
