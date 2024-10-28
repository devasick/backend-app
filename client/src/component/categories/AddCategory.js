// src/components/AddCategory.js
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import Layout from "../layout/Layout";

const AddCategory = () => {
  const navigate = useNavigate();

  const handleSave = (formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/categories/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData, // Send FormData directly
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/categories"); // Navigate back to categories
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
        <CategoryForm
          onSave={handleSave}
          onCancel={() => navigate("/categories")}
        />
      </div>
    </Layout>
  );
};

export default AddCategory;
