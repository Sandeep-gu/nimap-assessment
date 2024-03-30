const express = require("express");
const conn = require("./db.js");
const category = require("./routes/category.js");
const product = require("./routes/product.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/category", category);
app.use("/product", product);

conn.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + conn.threadId);

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
