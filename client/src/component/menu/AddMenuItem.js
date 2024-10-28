// src/components/menu/AddMenuItem.js
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItemForm from "./MenuItemForm";
import Layout from "../layout/Layout";

const AddMenuItem = () => {
  const navigate = useNavigate();

  const handleSave = (menuItem) => {
    // Add menu item to the server
    fetch(`${process.env.REACT_APP_API_URL}/menu-items/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: menuItem,
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/menu-items"); // Redirect to menu items list after success
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    navigate("/menu-items");
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
        <MenuItemForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </Layout>
  );
};

export default AddMenuItem;
