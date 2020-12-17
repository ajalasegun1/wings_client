import React from "react";
import axios from "axios";

function PurchaseOrderTable({ orders, setAccept, setReject }) {
  const accept = (ad_id, order_id) => {
    axios.patch(`/car/${ad_id}/status`).then((result) => {
      console.log(result);
      //console.log(order_id)
      setAccept(true);
      setTimeout(() => setAccept(false), 2000);
    });
    axios.patch(`order/accepted/${order_id}/status`).then((result) => {
      console.log(result);
    });
  };
  const reject = (order_id) => {
    axios.patch(`order/rejected/${order_id}/status`).then((result) => {
      console.log(result);
      setReject(true);
      setTimeout(() => setReject(false), 2000);
    });
  };
  const displayPurchaseOrders = (orders) => {
    if (orders.length === 0) {
      return (
        <React.Fragment>
          <p>You do not have any purchase order yet...</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">My ads</th>
                <th scope="col">Buyer</th>
                <th scope="col">Amount offered</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.car_details}</td>
                    <td>{item.buyer_name}</td>
                    <td>{item.amount}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => accept(item.car_id, item._id)}
                      >
                        Accept
                      </button>{" "}
                      -{" "}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => reject(item._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  };
  return displayPurchaseOrders(orders);
}

export default PurchaseOrderTable;
