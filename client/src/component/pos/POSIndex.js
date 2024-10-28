// src/components/pos/POSIndex.js
import React, { useState, useEffect } from "react";
import POSMenu from "./POSMenu";
import Layout from "../layout/Layout";

const POSIndex = () => {
  const [categories, setCategories] = useState([]);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        <h2 className="text-3xl font-bold mb-6 text-center">POS Menu</h2>
        <POSMenu categories={categories} />
      </div>
    </Layout>
  );
};

export default POSIndex;
