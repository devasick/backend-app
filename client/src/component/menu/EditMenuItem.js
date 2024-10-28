// src/components/menu/EditMenuItem.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuItemForm from "./MenuItemForm";
import Layout from "../layout/Layout";

const EditMenuItem = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/menu-items/${id}`,
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
        setMenuItem(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleSave = (updatedMenuItem) => {
    // Update menu item on the server
    fetch(`${process.env.REACT_APP_API_URL}/menu-items/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedMenuItem),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/menu-items"); // Redirect to menu items list after success
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
    navigate("/menu-items");
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Menu Item</h2>
        {menuItem && (
          <MenuItemForm
            menuItem={menuItem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </Layout>
  );
};

export default EditMenuItem;
