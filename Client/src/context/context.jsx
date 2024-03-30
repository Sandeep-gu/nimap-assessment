import { createContext, useState } from "react";

const contextData = createContext();

const ContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isUpdateCategory, setIsUpdateCategory] = useState(false);
  return (
    <contextData.Provider
      value={{
        categoryData,
        setCategoryData,
        isUpdateCategory,
        setIsUpdateCategory,
      }}
    >
      {children}
    </contextData.Provider>
  );
};

export { contextData, ContextProvider };
