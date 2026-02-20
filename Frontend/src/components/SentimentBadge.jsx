const SentimentBadge = ({ sentiment }) => {
  const clean = (sentiment || "Neutral").trim().toLowerCase();

  if (clean.includes("positive")) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-full bg-green-100 text-green-800 border-green-300">
        🟢 Positive
      </span>
    );
  }

  if (clean.includes("negative")) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-full bg-red-100 text-red-800 border-red-300">
        🔴 Negative
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-full bg-gray-100 text-gray-800 border-gray-300">
      ⚪ Neutral
    </span>
  );
};

export default SentimentBadge;
