// src/components/categories/FilterComponent.js
import React, { useState } from "react";

const FilterComponent = ({ onFilter }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleFilterChange = () => {
    onFilter({ name: nameFilter, status: statusFilter });
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Filter by Name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button
        onClick={handleFilterChange}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
