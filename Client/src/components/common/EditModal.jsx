import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { contextData } from "../../context/context.jsx";

const EditModal = ({ item, setItem }) => {
  const [editedItem, setEditedItem] = useState(item);
  const { isUpdateCategory, setIsUpdateCategory } = useContext(contextData);
  const handleClose = () => {
    setEditedItem(item);
    setItem(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        CategoryName: editedItem.CategoryName, // Extract the CategoryName field
      };
      await axios.put(
        `http://localhost:5000/category/update-category/${item.CategoryId}`,
        data
      );

      console.log(data);
      setIsUpdateCategory(() => !isUpdateCategory);
      setItem(null);
    } catch (error) {
      console.log(error);
      setItem(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            name="CategoryName"
            value={editedItem.CategoryName}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
