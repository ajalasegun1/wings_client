import React, { useState, useEffect } from "react";
import PurchaseOrderTable from "./PurchaseOrderTable";
import axios from "axios";

function PurchaseaOrderModal({ owner }) {
  const [orders, setOrders] = useState([]);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  useEffect(() => {
    axios.get(`/order/${owner}`).then((result) => setOrders(result.data));
    
  }, [owner]);
  return (
    <div
      className="modal fade"
      id="purchaseOrderModal"
      aria-labelledby="purchaseOrderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="purchaseOrderModalLabel">
              Purchase Orders
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
            {accept && (
              <div className="alert alert-success" role="alert">
                Order Accepted...
              </div>
            )}
            {reject && (
              <div className="alert alert-danger" role="alert">
                Order rejected...
              </div>
            )}
            <PurchaseOrderTable
              orders={orders}
              setAccept={setAccept}
              setReject={setReject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseaOrderModal;
