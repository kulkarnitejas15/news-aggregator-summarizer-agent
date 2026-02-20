import { useNavigate } from "react-router-dom";

const NewsFeed = ({ articles }) => {
  const navigate = useNavigate();

  if (!articles || articles.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No articles available.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {articles.map((article) => (
        <div
          key={article.id}
          onClick={() => navigate(`/articles/${article.id}`)}
          className="p-5 rounded-2xl shadow bg-white hover:shadow-lg transition cursor-pointer"
        >
          {/* Title */}
          <h2 className="font-bold text-lg">
            {article.title}
          </h2>

          {/* Category */}
          <p className="text-sm text-gray-500 mt-1">
            {article.category || "General"}
          </p>

          {/* Summary */}
          <p className="mt-3 text-gray-700 text-sm">
            {article.summary?.slice(0, 150)}...
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-400">
              {article.sentiment || "Neutral"}
            </span>

            <span className="text-blue-500 text-sm font-medium">
              Open →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
