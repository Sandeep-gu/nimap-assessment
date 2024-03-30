const query = require("../utils/query.js");
const createCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(404).send({ message: "category not found" });
    }
    sql = "insert into category (CategoryName) values(?)";
    const result = await query(sql, [category]);
    res.status(200).send({ message: "category successfully", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const { CategoryName } = req.body;
    // console.log(req.body);
    // console.log(id, category);
    if (!id || !CategoryName) {
      return res
        .status(400)
        .send({ message: "Both id and category must be provided" });
    }
    const sql = "UPDATE category SET CategoryName = ? WHERE CategoryId = ?";
    const result = await query(sql, [CategoryName, id]);
    console.log(result);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "No category found with the provided id" });
    }
    res.status(200).send({ message: "Category updated successfully", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(404).send({ message: "Id Not Found" });
    }

    // Check if there are any associated products
    const productCheckSql = "SELECT * FROM product WHERE CategoryId = ?";
    const products = await query(productCheckSql, [id]);

    // If there are associated products, delete them first
    if (products.length > 0) {
      const deleteProductsSql = "DELETE FROM product WHERE CategoryId = ?";
      await query(deleteProductsSql, [id]);
    }

    // Now, delete the category
    const deleteCategorySql = "DELETE FROM category WHERE CategoryId = ?";
    const result = await query(deleteCategorySql, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "No Category Found for provided Id" });
    }
    res.status(200).send({ message: "Successfully deleted", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const sql = "select * from category";
    const result = await query(sql);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ message: "Category Found Successfully", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryController,
};
