import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import axios from "axios";
import { useContext } from "react";
import { contextData } from "../context/context.jsx";
function MainLayout() {
  const { setCategoryData, isUpdateCategory } = useContext(contextData);
  useEffect(() => {
    handleCategoryData();
  }, [isUpdateCategory]);
  const handleCategoryData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/category/category"
      );
      setCategoryData(data?.result);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
