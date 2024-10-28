// src/components/categories/EditCategory.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import Layout from "../layout/Layout";

const EditCategory = ({ onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/categories/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSave = (formData) => {
    // Update category on the server
    fetch(`${process.env.REACT_APP_API_URL}/categories/edit/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // onSave(data);
        navigate("/categories"); // Redirect to categories list after success
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        {category && (
          <CategoryForm
            category={category}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </Layout>
  );
};

export default EditCategory;
