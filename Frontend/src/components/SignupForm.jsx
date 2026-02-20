import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();


 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setSuccess("Signup successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
  console.error("Firebase signup error:", err);

  if (err.code === "auth/email-already-in-use") {
    setError("Email already in use");
  } else if (err.code === "auth/weak-password") {
    setError("Password must be at least 6 characters");
  } else if (err.code === "auth/invalid-email") {
    setError("Invalid email address");
  } else {
    setError(err.message);
  }
}

   finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-2 text-center">{success}</p>}


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-700"
  }`}
>
  {loading ? "Signing up..." : "Sign Up"}
</button>



      </form>
    </div>
  );
}

export default SignupForm;
