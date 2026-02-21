import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import NewsFeed from "../components/NewsFeed";
import TrendingSection from "../components/TrendingSection";
import Pagination from "../components/Pagination";

// TEMP — profile test
import ProfileForm from "../components/ProfileForm";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const userId = "test_user";

  // =============================
  // HANDLE FILTER CHANGE (FIXED)
  // =============================
  const handleFilterChange = (filters) => {
    console.log("Filters selected:", filters);

    let filtered = articles;

    if (filters.category) {
      filtered = filtered.filter(
        (a) => a.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.sentiment) {
      filtered = filtered.filter(
        (a) => a.sentiment?.toLowerCase() === filters.sentiment.toLowerCase()
      );
    }

    setArticles(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset page when articles change
  useEffect(() => {
    setCurrentPage(1);
  }, [articles]);

  const cleanText = (text) => {
    if (!text) return "";
    return text.trim().toLowerCase();
  };

  // =============================
  // LOAD DATA FROM BACKEND
  // =============================
  const loadData = async () => {
    try {
      // USER PREFERENCES
      const prefRes = await fetch(
        "https://news-backend-gz40.onrender.com/api/preferences/",
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
          },
        }
      );

      let prefData = [];
      if (prefRes.ok) {
        prefData = await prefRes.json();
      }

      setPreferences(prefData || []);

      // ALL ARTICLES
      const articleRes = await fetch(
        "https://news-backend-gz40.onrender.com/api/articles"
      );
      const articleData = await articleRes.json();

      // FILTER BY PREFERENCES
      let filteredArticles = articleData;

      if (prefData && prefData.length > 0) {
        filteredArticles = articleData.filter((article) =>
          prefData.some(
            (pref) => cleanText(pref) === cleanText(article.category)
          )
        );
      }

      setArticles(filteredArticles);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // PAGINATION
  // =============================
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  if (loading) {
    return <p className="p-6">Loading personalized feed...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-6">
        {/* TEMP PROFILE TEST */}
        <div className="mb-10 p-6 border rounded-xl bg-gray-50">
          <h2 className="text-xl font-bold mb-4">
            Profile Test (Temporary)
          </h2>
          <ProfileForm />
        </div>

        <SearchBar />

        {/* ✅ FIXED — PASS FUNCTION */}
        <FilterBar onFilterChange={handleFilterChange} />

        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <TrendingSection />

        {preferences.length > 0 && articles.length === 0 && (
          <p className="text-gray-500 mb-4">
            No articles match your selected preferences.
          </p>
        )}

        <NewsFeed articles={currentArticles} />

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

export default Dashboard;