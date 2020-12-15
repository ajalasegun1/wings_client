import React from "react";

function FlagCountModal({ displayReport }) {
  return (
    <div
      className="modal fade"
      id="flagCountModal"
      tabIndex="-1"
      aria-labelledby="flagCountModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog .modal-dialog-scrollable">
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
            {displayReport &&
              displayReport.map((item) => {
                return (
                  <div
                    className="card"
                    style={{ width: "29rem" }}
                    key={item._id}
                  >
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Reason:</h6>
                      <p className="card-text" style={{ marginTop: "-11px" }}>
                        {item.reason}
                      </p>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Description
                      </h6>
                      <p className="card-text" style={{ marginTop: "-11px" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
