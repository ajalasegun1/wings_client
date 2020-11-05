import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

function HomeLeft() {
  const { centralUser } = useContext(AuthContext);
  let id = "";
  if (centralUser) {
    id = centralUser._id;
  }

  const [post, setPost] = useState({
    owner: id,
    created_on: new Date().toISOString(),
    state: "new",
    status: "Available",
    price: null,
    manufacturer: "",
    model: "",
    body_type: "",
    imageUrl: "",
  });
  const [preview, setPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({
    imageError: null,
    priceError: null,
  });

  //HANDLE IMAGE CHANGE
  const onImageChange = (e) => {
    const file = e.target.files[0];
    const check = ["image/jpg", "image/jpeg", "image/png"];
    if (check.includes(file.type)) {
      setFormErrors({ ...formErrors, imageError: null });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
        setPost({ ...post, imageUrl: reader.result });
      };
    } else {
      setFormErrors({
        ...formErrors,
        imageError: "Please select an image file",
      });
      e.target.value = null;
    }
  };

  //HANDLE PRICE CHANGE
  const onPriceChange = (e) => {
    let price = e.target.value;
    price = Number(price);
    if (isNaN(price)) {
      setFormErrors({ ...formErrors, priceError: "Enter a valid price" });
    } else {
      setFormErrors({ ...formErrors, priceError: null });
      setPost({ ...post, price: price });
    }
  };

  //onChange
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  //On submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      post.imageUrl === "" ||
      formErrors.imageError !== null ||
      formErrors.priceError !== null
    ) {
      setFormErrors({ ...formErrors, imageError: "Please select an image" });
      return;
    } else {
      console.log(post);
      axios
        .post("/car", post)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h4>Welcome, Dummy!</h4>

      <div className="home-form-container">
        <form onSubmit={onSubmit}>
          <h5>Post Car Ad</h5> <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Car Picture</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={onImageChange}
            />
            {formErrors.imageError && <small>{formErrors.imageError}</small>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id=""
              placeholder="Manufacturer"
              aria-describedby="emailHelp"
              required
              name="manufacturer"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id=""
              placeholder="Model"
              required
              name="model"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id=""
              placeholder="Body Type"
              required
              name="body_type"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              required
              name="state"
              placeholder="State"
              onChange={onChange}
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id=""
              placeholder="Price"
              required
              name="price"
              onChange={onPriceChange}
            />
            {formErrors.priceError && <small>{formErrors.priceError}</small>}
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
      {preview && <img width="200px" height="200px" src={preview} alt="test" />}

      <div className="col-12 profile-actions">My Ads</div>
      <div className="col-12 profile-actions">this is the second</div>
      <div className="col-12 profile-actions">this is the third</div>
    </div>
  );
}

export default HomeLeft;
