import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination"; // ✅ NEW

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 5;

  // temporary user id (later from Firebase)
  const userId = "test_user";

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ✅ Reset page when favorites change
  useEffect(() => {
    setCurrentPage(1);
  }, [favorites]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "http://https://news-backend-gz40.onrender.com/api/articles/favorites",
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await res.json();
      setFavorites(data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Could not load favorites");
    } finally {
      setLoading(false);
    }
  };

  // remove favorite
  const removeFavorite = async (articleId) => {
    try {
      const res = await fetch(
        `http://https://news-backend-gz40.onrender.com/api/articles/${articleId}/favorite`,
        {
          method: "DELETE",
          headers: {
            "user-id": userId,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to remove favorite");
      }

      // update UI instantly
      setFavorites((prev) =>
        prev.filter((article) => article.id !== articleId)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  // =========================
  // PAGINATION LOGIC
  // =========================
  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

  const indexOfLast = currentPage * favoritesPerPage;
  const indexOfFirst = indexOfLast - favoritesPerPage;

  const currentFavorites = favorites.slice(indexOfFirst, indexOfLast);

  if (loading) return <p className="p-6">Loading favorites...</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {!favorites.length && !error && (
          <p className="text-gray-500">No favorites yet.</p>
        )}

        {/* Favorite Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentFavorites.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-2xl shadow bg-white"
            >
              <h2 className="font-bold text-lg">{article.title}</h2>

              <p className="text-sm text-gray-500 mt-1">
                {article.category || "General"}
              </p>

              <p className="mt-3 text-gray-700 text-sm">
                {article.summary?.slice(0, 150)}...
              </p>

              <button
                onClick={() => removeFavorite(article.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
