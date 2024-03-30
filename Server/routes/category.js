const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryController,
} = require("../controllers/category.js");
router.post("/create-category", createCategoryController);
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);
router.get("/category", getCategoryController);

module.exports = router;
