import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import QuoteGenerator from "./components/QuoteGenerator";
import Dashboard from "./pages/Dashboard";
import ArticleDetail from "./pages/ArticleDetail";
import Favorites from "./pages/Favorites";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile"; // ✅ ADDED
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/signup" element={<SignupForm />} />

      <Route path="/login" element={<Login />} />

      <Route path="/quotes" element={<QuoteGenerator />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Article Detail */}
      <Route
        path="/articles/:id"
        element={
          <ProtectedRoute>
            <ArticleDetail />
          </ProtectedRoute>
        }
      />

      {/* Favorites */}
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      {/* Preferences Page */}
      <Route
        path="/preferences"
        element={
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        }
      />

      {/* ✅ Profile Page */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
