import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SummaryView from "../components/SummaryView";
import SentimentBadge from "../components/SentimentBadge";
import FavoriteButton from "../components/FavoriteButton";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="p-6">Loading article...</p>;
  if (!article) return <p className="p-6">Article not found.</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back to Dashboard
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">
          {article.title}
        </h1>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-2">
          Category: {article.category}
        </p>

        {/* ⭐ Enhanced Sentiment Section (Issue 16) */}
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600 mb-2 font-medium">
            Article Sentiment
          </p>

          <SentimentBadge sentiment={article.sentiment} />
        </div>

        {/* Favorite Button */}
        <div className="mb-6">
          <FavoriteButton articleId={article.id} />
        </div>

        {/* AI Summary */}
        <SummaryView summary={article.summary} />

        {/* Full Content */}
        <div className="mb-6 leading-relaxed text-gray-800">
          {article.content}
        </div>

        {/* Source Link */}
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read original article →
        </a>
      </div>
    </div>
  );
};

export default ArticleDetail;
