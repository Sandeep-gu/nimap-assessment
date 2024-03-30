import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contextData } from "../../context/context.jsx";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditModal from "./EditModal.jsx";
import axios from "axios";

function Navbar() {
  const { categoryData, isUpdateCategory, setIsUpdateCategory } =
    useContext(contextData);
  const [item, setItem] = useState();

  const handleData = (item) => {
    setItem(item);
  };

  const handleDelete = async (item) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/category/delete-category/${item.CategoryId}`
      );
      console.log(result);
      setIsUpdateCategory(() => !isUpdateCategory);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex bg-primary text-white p-3 justify-content-between position-sticky top-0">
      <h1 className="fs-3">
        <Link className="text-white text-decoration-none" to="/">
          Nimap Products
        </Link>
      </h1>
      <div className="d-flex flex-row">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Category
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" to="/createCategory">
                ADD Category
              </Link>
            </li>
            {categoryData?.map((item, index) => (
              <li
                key={index}
                className="dropdown-item d-flex align-items-center"
              >
                <span>{item.CategoryName}</span>
                <div className="ms-auto">
                  <button
                    className="btn btn-success"
                    onClick={() => handleData(item)} // Pass a function reference
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {item ? <EditModal item={item} setItem={setItem} /> : ""}
        </div>

        <Link className="btn btn-secondary" to="/createProduct">
          Product
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
