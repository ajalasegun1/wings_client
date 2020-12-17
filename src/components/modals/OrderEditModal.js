import React, { useState } from "react";
import axios from "axios";

function OrderEditModal({ orderId, setRenderer, renderer }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(amount);
    if (isNaN(amount)) {
      setError(true);
      setAmount("");
      setTimeout(() => {
        setError(false);
      }, 1000);
    } else {
      axios.patch(`/order/${orderId}/price`, { amount }).then((result) => {
        setSuccess(true);
        setAmount("");
        setTimeout(() => setSuccess(false), 2000);
        setRenderer(!renderer);
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="orderEditModal"
      aria-labelledby="orderEditModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderEditModalLable">
              Enter new offer amount
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
              {error && (
                <div className="alert alert-danger" role="alert">
                  Enter Valid Amount
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  Order Purchase Updated...
                </div>
              )}
              <input
                placeholder="Amount"
                className="form-control form-control-sm"
                onChange={onChange}
                value={amount}
              />{" "}
              <br />
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={() => onSubmit}
              >
                Edit Amount
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderEditModal;
