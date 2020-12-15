import React from "react";
import axios from "axios";

function AdminHomeRightCard({ cars, searchInput }) {
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
                     <strong>&#8358;</strong>  <span className="text-success">{item.price}</span>
                    </td>
                    <td>
                      <strong><i className="fas fa-car"></i></strong> {item.manufacturer}
                    </td>
                    <td><strong>Model:</strong> {item.model}</td>
                  </tr>

                  <tr>
                    <td><strong>Body_Type:</strong> {item.body_type}</td>
                    <td><strong>State:</strong> {item.state}</td>
                    <td><strong>Status:</strong> {item.status}</td>
                  </tr>

                  <tr>
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
      {searchInput && searchInput.length > 0
        ? loadCars(searchInput)
        : loadCars(cars)}
    </div>
  );
}

export default AdminHomeRightCard;
