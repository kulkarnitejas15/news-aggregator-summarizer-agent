import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import FavoriteButton from "./FavoriteButton";

const NewsFeed = ({ articles = [] }) => {
  const navigate = useNavigate();

  // Show message if no articles
  if (!articles.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No articles available.
      </p>
    );
  }

  // Handle card click
  const handleArticleClick = (article) => {
    // DB article → open detail page
    if (typeof article.id === "number") {
      navigate(`/articles/${article.id}`);
      return;
    }

    // Search article → open source URL
    if (article.source_url) {
      window.open(article.source_url, "_blank");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {articles.map((article, index) => {
        // ✅ SAFE FALLBACK VALUES (prevents crash)
        const safeArticle = {
          id: article?.id ?? `search-${index}`,
          title: article?.title ?? "Untitled",
          summary:
            article?.summary ||
            article?.content?.slice(0, 150) ||
            "No summary available",
          category: article?.category ?? "General",
          sentiment: article?.sentiment ?? "Neutral",
          source_url: article?.source_url ?? null,
        };

        return (
          <div
            key={safeArticle.id}
            className="cursor-pointer"
            onClick={() => handleArticleClick(safeArticle)}
          >
            {/* Article Card */}
            <ArticleCard
              title={safeArticle.title}
              summary={safeArticle.summary}
              category={safeArticle.category}
              sentiment={safeArticle.sentiment}
            />

            {/* Favorite button (prevent card click) */}
            <div
              className="mt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <FavoriteButton article={safeArticle} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;