// src/components/menu/MenuItems.js
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Button from "../Button";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/menu-items`,
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
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/menu-items/delete/${id}`,
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
        setMenuItems(menuItems.filter((item) => item.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
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

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Menu Items</h2>
        <Link to="/menu-items/add">
          <Button className="mb-4 bg-blue-500 text-white">Add Menu Item</Button>
        </Link>
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
                  Description
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Image
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Price
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  {" "}
                  Category
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Featured
                </th>
                <th className="py-4 px-6 font-semibold text-sm uppercase border-b">
                  Status
                </th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="py-4 px-6 text-center border-b">{item.id}</td>
                  <td className="py-4 px-6 text-left border-b">{item.name}</td>
                  <td className="py-4 px-6 text-left border-b">
                    {item.description}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/${item.smallImage}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    ${item.price}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    {item.category}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    {item.isFeatured ? "Yes" : "No"}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <div className="flex justify-center space-x-4">
                      <Link
                        to={`/menu-items/edit/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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

export default MenuItems;
