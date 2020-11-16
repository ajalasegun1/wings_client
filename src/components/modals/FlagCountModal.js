import React, { useState, useEffect } from "react";

function FlagCountModal({ flags, adId }) {
  const [reports, setReports] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (flags) {
      setReports(flags);
    }
  }, [flags]);

  useEffect(() => {
    if (reports) {
      setData(reports.filter((item) => item.car_id === adId));
    }
  }, [reports, adId]);

  return (
    <div
      className="modal fade"
      id="flagCountModal"
      tabIndex="-1"
      aria-labelledby="flagCountModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="flagCountModalLabel">
              Reports
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
            {data &&
              data.map((item) => (
                <div key={item._id}>
                  <p>{item.reason}</p>
                  <p>{item.description}</p>
                </div>
              ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlagCountModal;
