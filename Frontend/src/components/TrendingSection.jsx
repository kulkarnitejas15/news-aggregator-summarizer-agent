import { useEffect, useState } from "react";
import SentimentBadge from "./SentimentBadge";

function TrendingSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/articles/trending?limit=5")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Trending fetch error:", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 border-l-4 border-red-500">
      <h2 className="text-xl font-bold mb-4">🔥 Trending</h2>

      {articles.length === 0 ? (
        <p>No trending articles.</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="border-b pb-3">
              <h3 className="font-semibold">{article.title}</h3>

              {/* Category + Sentiment */}
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500">
                  {article.category}
                </p>

                <SentimentBadge sentiment={article.sentiment} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingSection;
