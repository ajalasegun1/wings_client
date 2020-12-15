import React from "react";

function GuestContent({ loading, ads }) {
  return (
    <div>
      {loading && <h4>Loading...</h4>}
      {ads &&
        ads.map((item) => {
          return (
            <div className="card" key={item._id}>
              <img src={item.imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <span
                          style={{
                            color: "#e98074",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {" "}
                          &#8358;{" "}
                        </span>

                        <span className="text-success">{item.price}</span>
                      </td>
                      <td>
                        <i
                          className="fas fa-car"
                          style={{
                            color: "#e98074",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        ></i>{" "}
                        {item.manufacturer}
                      </td>
                      <td>
                        <span style={{ color: "#e98074", fontWeight: "bold" }}>
                          Model:
                        </span>{" "}
                        {item.model}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span style={{ color: "#e98074", fontWeight: "bold" }}>
                          Body_Type:
                        </span>{" "}
                        {item.body_type}
                      </td>
                      <td>
                        <span style={{ color: "#e98074", fontWeight: "bold" }}>
                          State:
                        </span>{" "}
                        {item.state}
                      </td>
                      <td>
                        <span style={{ color: "#e98074", fontWeight: "bold" }}>
                          Status:
                        </span>{" "}
                        {item.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default GuestContent;
