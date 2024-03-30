const express = require("express");
const router = express.Router();
const {
  createProductController,
  updateProductController,
  deleteProductController,
  getProductController,
} = require("../controllers/product.js");
router.post("/create-Product", createProductController);
router.put("/update-Product/:id", updateProductController);
router.delete("/delete-Product/:id", deleteProductController);
router.get("/Product", getProductController);

module.exports = router;
