import SentimentBadge from "./SentimentBadge";

const ArticleCard = ({ title, summary, category, sentiment, date }) => {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">

      {/* Category + Date */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-blue-600">
          {category}
        </span>

        <span className="text-xs text-gray-500">
          {date}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mb-2">
        {title}
      </h2>

      {/* Summary */}
      <p className="text-gray-600 mb-3">
        {summary}
      </p>

      {/* Sentiment Badge (Issue 16) */}
      <SentimentBadge sentiment={sentiment} />

    </div>
  );
};

export default ArticleCard;
