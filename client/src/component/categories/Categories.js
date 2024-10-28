// src/components/categories/Categories.js
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Button from "../Button";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import FilterComponent from "./FilterComponent";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/categories`,
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
        setCategories(data);
        setFilteredCategories(data); // Initially, show all categories
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const applyFilters = (filters) => {
    const { name, status } = filters;
    let filtered = categories;

    if (name) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter((category) => category.status === status);
    }

    setFilteredCategories(filtered);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/categories/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCategories(categories.filter((category) => category.id !== id));
        setFilteredCategories(
          filteredCategories.filter((category) => category.id !== id)
        );
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>
        <Link to="/categories/add">
          <Button className="mb-4 bg-blue-500 text-white">Add Category</Button>
        </Link>

        {/* FilterComponent */}
        <FilterComponent onFilter={applyFilters} />

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  ID
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Name
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Image
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Description
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Status
                </th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="py-4 px-6 text-center border-b">
                    {category.id}
                  </td>
                  <td className="py-4 px-6 text-left border-b">
                    {category.name}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/${category.smallImage}`}
                      alt={category.name}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-left border-b">
                    {category.description}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        category.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <div className="flex justify-center space-x-4">
                      <Link
                        to={`/categories/edit/${category.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:underline"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
