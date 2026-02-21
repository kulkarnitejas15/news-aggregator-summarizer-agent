import { useEffect, useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(`${API}/api/articles/categories`);
        const data = await res.json();

        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  // Handle filter change
  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      sentiment: selectedSentiment,
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSentiment("");
    onFilterChange({
      category: "",
      sentiment: "",
    });
  };

  return (
    <div className="flex gap-4 items-center mt-4 flex-wrap">
      
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sentiment Dropdown */}
      <select
        value={selectedSentiment}
        onChange={(e) => setSelectedSentiment(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Sentiment</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
        <option value="Neutral">Neutral</option>
      </select>

      {/* Apply Button */}
      <button
        onClick={handleFilterChange}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>

      {/* Clear Button */}
      <button
        onClick={clearFilters}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default FilterBar;