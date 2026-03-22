import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-5 backdrop-blur bg-white/70 border-b sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">
          AI News Dashboard
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="text-center mt-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          AI Powered News Aggregator
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Get summarized news, sentiment insights, trending articles,
          and personalized recommendations — all powered by AI.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition shadow-lg hover:scale-105"
          >
            Start Exploring →
          </Link>

          <Link
            to="/login"
            className="px-10 py-4 border rounded-xl text-lg hover:bg-gray-100 transition"
          >
            Live Demo
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mt-28 px-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <Feature
          title="AI Summarization"
          desc="Automatically converts long articles into short readable insights using AI."
          icon="🧠"
        />

        <Feature
          title="Sentiment Analysis"
          desc="Instantly detect positive, negative, or neutral tone of news."
          icon="📊"
        />

        <Feature
          title="Save Favorites"
          desc="Bookmark important articles and access them anytime."
          icon="⭐"
        />
      </section>

      {/* ================= WHY US SECTION ================= */}
      <section className="mt-32 text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Our Platform?
        </h2>

        <p className="mt-4 text-gray-600">
          Stay ahead with AI-powered intelligence. Filter noise, track trends,
          and get personalized news tailored to your interests.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Stat number="10x" label="Faster News Reading" />
          <Stat number="Real-time" label="Trending Insights" />
          <Stat number="Smart" label="Personalization" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center mt-32 pb-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl max-w-4xl mx-auto py-16 px-10 shadow-xl">
          <h2 className="text-4xl font-bold">
            Stay informed. Stay ahead.
          </h2>

          <p className="mt-4 opacity-90">
            Join thousands of users using AI to consume smarter news.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 px-10 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-6 border-t text-gray-500">
        © 2026 AI News Dashboard — Built with React + FastAPI
      </footer>

    </div>
  );
};


/* ================= COMPONENTS ================= */

const Feature = ({ title, desc, icon }) => (
  <div className="bg-white p-10 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
    <div className="text-5xl">{icon}</div>
    <h3 className="text-xl font-semibold mt-5">{title}</h3>
    <p className="text-gray-600 mt-3">{desc}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="bg-white rounded-2xl p-6 shadow">
    <div className="text-3xl font-bold text-blue-600">{number}</div>
    <div className="text-gray-600 mt-1">{label}</div>
  </div>
);

export default Landing;