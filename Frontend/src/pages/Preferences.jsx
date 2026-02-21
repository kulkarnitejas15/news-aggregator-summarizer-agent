import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Preferences = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");

  const userId = "test_user"; // later from Firebase

  // ===============================
  // Load categories + saved preferences
  // ===============================
  useEffect(() => {
    fetchCategories();
    fetchPreferences();
  }, []);

  // ===============================
  // CLEAN CATEGORY LOGIC
  // removes long AI junk text
  // ===============================
  const cleanCategories = (data) => {
    return data.filter((cat) => {
      if (!cat) return false;

      const trimmed = cat.trim();

      if (trimmed.length > 30) return false;
      if (trimmed.includes("**")) return false;
      if (trimmed.toLowerCase().includes("article")) return false;
      if (trimmed.toLowerCase().includes("summary")) return false;

      return true;
    });
  };

  // ===============================
  // Fetch available categories
  // ===============================
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://https://news-backend-gz40.onrender.com/api/articles/categories");
      const data = await res.json();

      const cleaned = cleanCategories(data);
      setCategories(cleaned);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  // ===============================
  // Fetch saved preferences
  // ===============================
  const fetchPreferences = async () => {
    try {
      const res = await fetch("http://https://news-backend-gz40.onrender.com/api/preferences/", {
        headers: { "user-id": userId },
      });

      const data = await res.json();
      setSelected(data || []);
    } catch (err) {
      console.error("Preference fetch error:", err);
    }
  };

  // ===============================
  // Toggle checkbox
  // ===============================
  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // ===============================
  // SAVE preferences ⭐ FIXED
  // ===============================
  const savePreferences = async () => {
  try {
    setMessage("Saving...");

    const res = await fetch("http://https://news-backend-gz40.onrender.com/api/preferences/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId,
      },
      body: JSON.stringify({ categories: selected }),
    });

    if (!res.ok) {
      setMessage("❌ Failed to save preferences");
      return;
    }

    // ⭐ IMPORTANT — reload preferences after saving
    await fetchPreferences();

    setMessage("✅ Preferences saved successfully");

  } catch (err) {
    console.error(err);
    setMessage("❌ Failed to save preferences");
  }
};


  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Select Your Preferred Categories
        </h1>

        {/* Categories */}
        <div className="space-y-3">
          {categories.length === 0 && (
            <p className="text-gray-500">No categories available.</p>
          )}

          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={savePreferences}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Preferences;
