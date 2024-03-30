import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { contextData } from "../context/context";
function ProductForm() {
  const [product, setProduct] = useState({});
  const { categoryData } = useContext(contextData);
  // console.log(categoryData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      const category = await axios.post(
        "http://localhost:5000/product/create-product",
        product
      );
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center bg-secondary mt-5 align-items-center shadow flex-column"
      style={{ height: "400px" }}
    >
      <h1 className="fs-3 mb-4">PRODUCT FORM</h1>
      <div className="card">
        <div class="card-body">
          <input
            className="form-control mb-3"
            placeholder="Enter Name of Category"
            name="product"
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                categoryId: e.target.value,
              }))
            }
          >
            <option selected disabled>
              Select Category
            </option>
            {categoryData?.map((item, index) => (
              <option key={index} value={item.CategoryId}>
                {item.CategoryName}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={handleSubmit}>
            ADD PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
