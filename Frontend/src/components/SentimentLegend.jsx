import SentimentBadge from "./SentimentBadge";

function SentimentLegend() {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Sentiment Guide
      </h3>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <SentimentBadge sentiment="Positive" />
          <span className="text-gray-600">Good or positive news</span>
        </div>

        <div className="flex items-center gap-2">
          <SentimentBadge sentiment="Negative" />
          <span className="text-gray-600">Concerning or negative news</span>
        </div>

        <div className="flex items-center gap-2">
          <SentimentBadge sentiment="Neutral" />
          <span className="text-gray-600">Informational or balanced news</span>
        </div>
      </div>
    </div>
  );
}

export default SentimentLegend;
