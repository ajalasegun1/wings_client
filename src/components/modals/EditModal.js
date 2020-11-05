import React, { useState, useEffect } from "react";
import axios from "axios";

function EditModal({ price, id }) {
  const [newPrice, setNewPrice] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (price) {
      setNewPrice(price);
    }
  }, [price]);

  const onChange = (e) => {
    setNewPrice(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let price = newPrice;
    price = Number(price);
    if (isNaN(price)) {
      setPriceError(true);
    } else {
      setPriceError(false);
      setNewPrice(price);
      let data = {
        price,
      };
      axios
        .patch(`/car/${id}/price`, data)
        .then((res) => {
          if (res.data._id) {
            setSuccess(true);
          }
        })
        .catch((err) => {
          if (err) {
            setFail(true);
          } else {
            setFail(false);
          }
          console.log(err.response);
        });
      setNewPrice("");
    }
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              Edit Price {id}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={onSubmit}>
              {success && (
                <div className="alert alert-success" role="alert">
                  Price edited...
                </div>
              )}
              {fail && (
                <div className="alert alert-danger" role="alert">
                  You are unauthorized
                </div>
              )}

              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Price"
                value={newPrice}
                onChange={onChange}
              />
              <small className="text-danger">
                {priceError && "Enter a valid price"}
              </small>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-warning"
              onClick={onSubmit}
            >
              Edit Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
