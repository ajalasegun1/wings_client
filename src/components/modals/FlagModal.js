import React, { useState } from "react";
import axios from "axios";

function FlagModal({ adId }) {
  const [data, setData] = useState({ reason: "", description: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, car_id: adId });
    setError(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(data);
    if (data.reason === "" || data.description === "") {
      setError(true);
    } else {
      setError(false);
      axios
        .post("/flag", data)
        .then((flag) => {
          setSuccess(!success);
          //console.log(data);
          setTimeout(() => {
            setSuccess(false);
            setData({ ...data, reason: "", description: "" });
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      className="modal fade"
      id="flagModal"
      tabIndex="-1"
      aria-labelledby="flagModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="flagModalLabel">
              Report Ad
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
            <form>
              {error && (
                <div className="alert alert-danger" role="alert">
                  Make sure all fields are filled
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  Report posted successfully
                </div>
              )}

              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Reason"
                name="reason"
                value={data.reason}
                onChange={onChange}
              />
              <br />
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Description"
                name="description"
                value={data.description}
                onChange={onChange}
              />
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
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Flag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlagModal;
