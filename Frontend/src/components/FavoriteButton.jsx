import { useState, useEffect } from "react";

const FavoriteButton = ({ article }) => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [isFavorite, setIsFavorite] = useState(false);
  const [dbArticleId, setDbArticleId] = useState(null);
  const userId = "test_user"; // later from Firebase auth

  // =============================
  // Check if already favorite
  // =============================
  useEffect(() => {
    if (article) {
      checkFavoriteStatus();
    }
  }, [article]);

  const checkFavoriteStatus = async () => {
    try {
      const res = await fetch(`${API}/api/favorites`, {
        headers: {
          "user-id": userId,
        },
      });

      if (!res.ok) return;

      const data = await res.json();

      // if article exists in favorites
      const exists = data.find(
        (item) =>
          item.source_url === article.source_url ||
          item.id === article.id
      );

      if (exists) {
        setIsFavorite(true);
        setDbArticleId(exists.id);
      }
    } catch (error) {
      console.error("Favorite check error:", error);
    }
  };

  // =============================
  // Save search result to DB
  // =============================
  const saveArticleToDB = async () => {
    try {
      const res = await fetch(`${API}/api/articles/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          summary: article.summary,
          content: article.content,
          source_url: article.source_url,
          category: article.category || "General",
          sentiment: article.sentiment || "Neutral",
        }),
      });

      if (!res.ok) throw new Error("Failed to save article");

      const data = await res.json();
      return data.article_id;
    } catch (error) {
      console.error("Error saving article:", error);
      return null;
    }
  };

  // =============================
  // Toggle favorite
  // =============================
  const toggleFavorite = async () => {
    try {
      let articleId = dbArticleId || article.id;

      // If article is from search (id is URL string)
      if (!dbArticleId && typeof article.id !== "number") {
        articleId = await saveArticleToDB();
        if (!articleId) return;
      }

      const method = isFavorite ? "DELETE" : "POST";

      const res = await fetch(
        `${API}/api/articles/${articleId}/favorite`,
        {
          method,
          headers: {
            "user-id": userId,
          },
        }
      );

      if (!res.ok) throw new Error("Favorite action failed");

      setIsFavorite(!isFavorite);
      setDbArticleId(articleId);
    } catch (error) {
      console.error("Toggle favorite error:", error);
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