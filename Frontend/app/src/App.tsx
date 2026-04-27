import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./page/ProductList";
import ProductForm from "./page/ProductForm";
import ProductDelete from "./page/ProductDelete";

const App: React.FC = () => {
  return (
    // Đã xóa <BrowserRouter> ở đây
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/create" element={<ProductForm />} />
      <Route path="/update/:id" element={<ProductForm />} />
      <Route path="/delete/:id" element={<ProductDelete />} />
    </Routes>
  );
};

export default App;
