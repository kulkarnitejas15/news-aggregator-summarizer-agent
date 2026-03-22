const ArticleCard = ({
  title = "No Title",
  summary = "No summary available",
  category = "General",
  sentiment = "Neutral",
}) => {
  return (
    <div className="p-5 rounded-2xl shadow bg-white hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{title}</h2>

      <p className="text-sm text-gray-500 mt-1">
        {category || "General"}
      </p>

      <p className="mt-3 text-gray-700 text-sm">
        {summary ? summary.slice(0, 150) + "..." : "No summary available"}
      </p>

      <div className="mt-3">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            sentiment === "Positive"
              ? "bg-green-100 text-green-700"
              : sentiment === "Negative"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {sentiment || "Neutral"}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;