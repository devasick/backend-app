// src/components/menu/MenuItemForm.js
import React, { useState, useEffect } from "react";

const MenuItemForm = ({ menuItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    isFeatured: 0,
    isVeg: 0,
    status: "active",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (menuItem) {
      setFormData({
        ...menuItem,
        image: null, // Preserves image handling logic, assuming you want the image to be updated separately.
      });
      setImagePreview(
        menuItem.image
          ? `${process.env.REACT_APP_IMAGE_URL}/${menuItem.smallImage}`
          : null
      );
    }
  }, [menuItem]);

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
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Log the FormData object to the console to verify its contents
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    onSave(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">Featured</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isVeg"
          checked={formData.isVeg}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">Vegetarian</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
