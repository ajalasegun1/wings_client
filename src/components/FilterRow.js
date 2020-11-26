import React, { useState } from "react";
import axios from "axios"

function FilterRow({ getSearchInput}) {
  const [formdata, setFormData] = useState({
    min_price: "",
    max_price: "",
    body_type: "",
    state: "",
  });
  const [searchError, setSearchError] = useState(false)

  const onChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/car/search", formdata).then(result => {
      console.log(result.data)
      if(result.data.stringValue){
        setSearchError(true)
      }else{
        setSearchError(false)
        console.log(result.data)
        getSearchInput(result.data)
      }
    })
   
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-3">
            <input
              placeholder="Min-Price (&#x20a6;)"
              className="form-control "
              name="min_price"
              onChange={onChange}
              value={formdata.min_price}
            />
            <small style={{ color: "red" }}>
              {searchError && "Enter a valid price"}
            </small>
          </div>
          <div className="form-group col-md-3">
            <input
              placeholder="Max-Price (&#x20a6;)"
              className="form-control "
              name="max_price"
              onChange={onChange}
              value={formdata.max_price}
            />
            <small style={{ color: "red" }}>
            </small>
          </div>
          <div className="form-group col-md-3">
            <input
              placeholder="Body Type"
              className="form-control "
              name="body_type"
              onChange={onChange}
              value={formdata.body_type}
            />
          </div>
          <div className="form-group col-md-2">
            <select
              className="custom-select mr-sm-2 form-control "
              name="state"
              onChange={onChange}
            >
              <option defaultValue>State</option>
              <option value="used">Used</option>
              <option value="new">New</option>
            </select>
          </div>
          <div className="form-group col-md-1">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FilterRow;
