// src/components/categories/CategoryForm.js
import React, { useState, useEffect } from "react";

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        ...category,
        image: null, // Reset image to null when editing an existing category
      });
      setImagePreview(
        category.image
          ? `${process.env.REACT_APP_IMAGE_URL}/${category.smallImage}`
          : null
      );
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
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

export default CategoryForm;
