
export const knowUser = (item,  user) => {
  // console.log(data.owner, user)

  /*if (user !== null) {
    if (item.owner !== user._id) {
      return (
        <tr>
          <td>
            <button type="button" className="btn btn-outline-warning btn-sm">
              Order
              <i className="far fa-edit" style={{ marginLeft: "5px" }}></i>
            </button>
          </td>
        </tr>
      );
    }
    else if(user.is_admin){
        return (
            <tr>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm">
                  Delete Ad
                  <i className="far fa-delete" style={{ marginLeft: "5px" }}></i>
                </button>
              </td>
            </tr>
          );
    }
  }*/

  if(user !== null ){
    return (
        <tr>
          <td>
            <button type="button" className="btn btn-outline-danger btn-sm">
              Delete Ad
              <i className="far fa-delete" style={{ marginLeft: "5px" }}></i>
            </button>
          </td>
        </tr>
      );
  }
};
