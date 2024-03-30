const query = require("../utils/query.js");
const createProductController = async (req, res) => {
  try {
    const { product, categoryId } = req.body;
    if (!product || !categoryId) {
      return res.status(404).send({ message: "Enter all the details" });
    }
    sql = "insert into product (ProductName,CategoryId) values(?,?)";
    const result = await query(sql, [product, categoryId]);
    res.status(200).send({ message: "category successfully", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const { ProductName, CategoryId } = req.body;
    console.log(ProductName, id);
    if (!id || !ProductName) {
      return res
        .status(400)
        .send({ message: "Both id and product must be provided" });
    }
    const sql = "UPDATE product SET ProductName = ? WHERE ProductId = ?";
    const result = await query(sql, [ProductName, id]);
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

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "Id Not Found" });
    }
    const sql = "delete from product where ProductId = ?";
    const result = await query(sql, [id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "No Product Found for provided Id" });
    }
    res.status(200).send({ message: "Successfully deleted", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;
    console.log(page, limit, offset);
    const totalCountQuery = "SELECT COUNT(*) AS total FROM product";
    const totalCountResult = await query(totalCountQuery);
    const totalItems = totalCountResult[0].total;

    let sql = `
      SELECT * 
      FROM product 
      INNER JOIN category ON product.CategoryId = category.CategoryId
    `;

    // Check if the total number of items is less than the limit
    if (totalItems <= itemsPerPage) {
      // If the total number of items is less than or equal to the limit,
      // no need for pagination, so no LIMIT or OFFSET is applied
    } else {
      // Apply pagination with LIMIT and OFFSET
      sql += ` LIMIT ${itemsPerPage} OFFSET ${offset}`;
    }

    const result = await query(sql);

    if (result.length === 0) {
      return res.status(404).send({ message: "Products not found" });
    }

    res.status(200).send({
      message: "Products Found Successfully",
      result,
      totalCount: totalItems,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
};
