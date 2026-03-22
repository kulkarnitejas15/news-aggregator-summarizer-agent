import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import NewsFeed from "../components/NewsFeed";
import TrendingSection from "../components/TrendingSection";
import Pagination from "../components/Pagination";
import ProfileForm from "../components/ProfileForm";

const Dashboard = () => {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const userId = "test_user";

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [articles]);

  // =============================
  // CLEAN TEXT
  // =============================
  const cleanText = (text) => text?.trim().toLowerCase() || "";

  // =============================
  // LOAD DASHBOARD DATA
  // =============================
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // -------- USER PREFERENCES --------
      let prefData = [];

      try {
        const prefRes = await fetch(`${API}/api/preferences/`, {
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
          },
        });

        if (prefRes.ok) {
          prefData = await prefRes.json();
        }
      } catch (e) {
        console.log("No preferences found");
      }

      setPreferences(prefData || []);

      // -------- ALL ARTICLES --------
      const articleRes = await fetch(`${API}/api/articles`);

      if (!articleRes.ok) {
        throw new Error("Failed to load articles");
      }

      const articleData = await articleRes.json();

      if (!articleData || articleData.length === 0) {
        setArticles([]);
        setAllArticles([]);
        return;
      }

      let filteredArticles = articleData;

      // filter by preferences
      if (prefData && prefData.length > 0) {
        filteredArticles = articleData.filter((article) =>
          prefData.some(
            (pref) => cleanText(pref) === cleanText(article.category)
          )
        );
      }

      setAllArticles(filteredArticles);
      setArticles(filteredArticles);
    } catch (error) {
      console.error("Dashboard load error:", error);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // REAL NEWS SEARCH
  // =============================
  const handleSearch = async (query) => {
  try {
    if (!query.trim()) {
      loadData();
      return;
    }

    const res = await fetch(`${API}/api/search?q=${query}`);

    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();

    // ✅ normalize search results to match DB article structure
    const normalized = data.map((item, index) => ({
      id: item.id || `search-${index}`, // fallback id
      title: item.title || "Untitled",
      summary: item.summary || item.content?.slice(0, 150) || "",
      content: item.content || "",
      category: item.category || "General",
      sentiment: item.sentiment || "Neutral",
      source_url: item.source_url || null,
      created_at: item.created_at || null,
    }));

    setAllArticles(normalized);
    setArticles(normalized);

  } catch (error) {
    console.error("Search error:", error);
  }
};

  // =============================
  // FILTER
  // =============================
  const handleFilterChange = (filters) => {
    let filtered = [...allArticles];

    if (filters.category) {
      filtered = filtered.filter(
        (a) => cleanText(a.category) === cleanText(filters.category)
      );
    }

    if (filters.sentiment) {
      filtered = filtered.filter(
        (a) => cleanText(a.sentiment) === cleanText(filters.sentiment)
      );
    }

    setArticles(filtered);
  };

  // =============================
  // PAGINATION
  // =============================
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  // =============================
  // UI STATES
  // =============================
  if (loading) {
    return <p className="p-6">Loading personalized feed...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-6">
        {/* TEMP PROFILE */}
        <div className="mb-10 p-6 border rounded-xl bg-gray-50">
          <h2 className="text-xl font-bold mb-4">
            Profile Test (Temporary)
          </h2>
          <ProfileForm />
        </div>

        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilterChange={handleFilterChange} />

        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <TrendingSection />

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {!articles.length && !error && (
          <p className="text-gray-500 mt-4">
            No articles available.
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