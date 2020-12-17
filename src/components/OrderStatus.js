import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import OrderEditModal from "./modals/OrderEditModal";

function OrderStatus(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const { centralUser } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [renderer, setRenderer] = useState(false);
  useEffect(() => {
    if (isLoggedIn === false) {
      props.history.push("/guest");
    }
  }, [isLoggedIn, props.history]);
  useEffect(() => {
    axios.get(`/order/${centralUser._id}/buyer`).then((result) => {
      setOrders(result.data);
    });
  }, [centralUser._id, renderer]);

  const getOfferId = (id) => {
    setOrderId(id);
  };

  const deleteOffer = (id) => {
    axios.delete(`/order/${id}`).then(() => {
      setRenderer(!renderer);
    });
  };
  const chooseToDisplay = (orders) => {
    if (orders.length > 0) {
      return (
        <div>
          <Link to="/">
            <button className="btn btn-success">
              <i
                className="fas fa-long-arrow-alt-left"
                style={{ marginRight: "10px" }}
              ></i>
              Go back
            </button>
          </Link>
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
                      {item.status === "accepted" ||
                      item.status === "rejected" ? (
                        <button className="btn btn-warning btn-sm" disabled>
                          Edit Offer
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          data-toggle="modal"
                          data-target="#orderEditModal"
                          onClick={() => getOfferId(item._id)}
                        >
                          Edit Offer
                        </button>
                      )}{" "}
                      <i
                        className="fas fa-trash delHov"
                        style={{ marginLeft: "20px", color: "red" }}
                        onClick={() => deleteOffer(item._id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>You haven't made any order yet</p>;
    }
  };
  return (
    <div className="displayOrders">
      {isLoggedIn === true && chooseToDisplay(orders)}
      <OrderEditModal
        orderId={orderId}
        setRenderer={setRenderer}
        renderer={renderer}
      />
    </div>
  );
}

export default OrderStatus;
