import { useState, useEffect } from "react";

const FavoriteButton = ({ articleId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = "test_user"; // later will come from Firebase login

  // -----------------------------
  // Check if article already favorite
  // -----------------------------
  useEffect(() => {
    checkFavoriteStatus();
  }, [articleId]);

  const checkFavoriteStatus = async () => {
    try {
      const res = await fetch("http://https://news-backend-gz40.onrender.com/api/favorites", {
        headers: {
          "user-id": userId,
        },
      });

      const data = await res.json();

      const exists = data.some((item) => item.id === articleId);
      setIsFavorite(exists);
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  // -----------------------------
  // Toggle favorite
  // -----------------------------
  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";

      await fetch(
        `http://https://news-backend-gz40.onrender.com/api/articles/${articleId}/favorite`,
        {
          method: method,
          headers: {
            "user-id": userId,
          },
        }
      );

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded text-white transition ${
        isFavorite
          ? "bg-red-500 hover:bg-red-600"
          : "bg-yellow-400 hover:bg-yellow-500"
      }`}
    >
      {isFavorite ? "❤️ Remove Favorite" : "⭐ Add Favorite"}
    </button>
  );
};

export default FavoriteButton;
