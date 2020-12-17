import React from "react";

function OrderStatusTable({orders}) {
    const deleteOffer = (data) => {

    }
  return (
    <React.Fragment>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ads</th>
            <th scope="col">Amount offered</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.car_details}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    
                  >
                    Edit Offer
                  </button>{" "}
                  <i className="fas fa-trash delHov" style={{marginLeft:"20px", color: "red"}} onClick={() => deleteOffer(item._id)}></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default OrderStatusTable;
