import React, { useState } from "react";
import axios from "axios";

function OfferModal({ owner, buyer, adId, carDetails, buyer_name }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setAmount(e.target.value);
    setError(false);
  };

  const onSubmit = (e) => {
    let price = Number(amount);
    console.log(amount);
    let data = {
      owner,
      buyer,
      buyer_name,
      amount,
      car_details: carDetails,
      car_id: adId,
      status: "pending",
    };
    if (isNaN(price)) {
      setError(true);
    } else {
      axios
        .post("/order", data)
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="modal fade"
      id="offerModal"
      aria-labelledby="flagModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="flagModalLabel">
              Make an offer
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
              <p>
                Owner:{owner} Buyer:{buyer} AdId: {adId}
              </p>
              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  Offer made successfully
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              {error && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  Enter a valid amount
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              <h6>I'm willing to pay</h6>
              <input
                type="text"
                placeholder="Amount"
                className="form-control form-control-sm"
                onChange={onChange}
                value={amount}
                name="amount"
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={onSubmit}
            >
              Make offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
