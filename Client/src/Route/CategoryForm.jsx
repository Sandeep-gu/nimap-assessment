import React, { useState } from "react";
import axios from "axios";
function CategoryForm() {
  const [category, setCategory] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(category);
      const result = await axios.post(
        "http://localhost:5000/category/create-Category",
        category
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="container d-flex justify-content-center bg-secondary mt-5 align-items-center shadow flex-column"
      style={{ height: "400px" }}
    >
      <h1 className="fs-3 mb-4">CATEGORY FORM</h1>
      <div className="card">
        <div class="card-body">
          <input
            className="form-control mb-3"
            placeholder="Enter Name of Category"
            name="category"
            onChange={(e) =>
              setCategory((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            ADD CATEGORY
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
