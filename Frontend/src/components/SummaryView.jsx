const SummaryView = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">
        AI Summary
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {summary}
      </p>
    </div>
  );
};

export default SummaryView;
