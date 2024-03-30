import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Products from "./Route/Products";
import ProductForm from "./Route/ProductForm";
import CategoryForm from "./Route/CategoryForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/createProduct" element={<ProductForm />} />
            <Route path="/createCategory" element={<CategoryForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
