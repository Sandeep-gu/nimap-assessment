import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductModal from "../components/common/ProductModal.jsx";
function Products() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const handleData = (item) => {
    setItem(item);
  };
  const fetchAllProductData = async (page) => {
    try {
      console.log(page);
      const { data } = await axios.get(
        "http://localhost:5000/product/product",
        {
          params: {
            limit: itemsPerPage,
            page: page,
          },
        }
      );
      console.log(data);
      setData(data.result);
      setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (item) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/product/delete-product/${item.ProductId}`
      );
      console.log(result);
      setIsDeleted(() => !isDeleted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProductData(currentPage);
  }, [currentPage, item, isDeleted]);
  return (
    <div className="container mt-2">
      <h1 className="bg-white py-3">All Products</h1>
      <div className="table-responsive" style={{ height: "380px" }}>
        <table className="table">
          <thead className="bg-white sticky-top">
            <tr>
              <th scope="col">Serial No</th>
              <th scope="col">ProductId</th>
              <th scope="col">ProductName</th>
              <th scope="col">CategoryName</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "100%", overflowY: "auto" }}>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.ProductId}</td>
                <td>{item.ProductName}</td>
                <td>{item.CategoryName}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {item ? <ProductModal item={item} setItem={setItem} /> : ""}
      {/* <div className="d-flex justify-content-between">
        <button className="btn btn-primary">
          Previous
        </button>
        <button className="btn btn-primary">Next</button>
      </div> */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => fetchAllProductData(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => fetchAllProductData(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => fetchAllProductData(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Products;
