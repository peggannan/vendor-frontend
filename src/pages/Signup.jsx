// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match");
    setLoading(true);
    setError("");
    try {
      const { data } = await signup({ name: form.name, email: form.email, password: form.password });
      saveAuth(data.user, data.token);
      navigate("/user-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white max-w-sm mx-auto">
      {/* Logo */}
      <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mb-3">
        <span className="text-white font-bold text-xl">V</span>
      </div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">App Name</h1>
      <p className="text-gray-400 text-sm mb-8">Register Using Your Credentials</p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {[
          { label: "Name", key: "name", type: "text", placeholder: "Enter Your Name" },
          { label: "Email", key: "email", type: "email", placeholder: "Enter Your Email" },
          { label: "Password", key: "password", type: "password", placeholder: "My Password" },
          { label: "Confirm Password", key: "confirm", type: "password", placeholder: "Confirm My Password" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="text-sm text-gray-600 mb-1 block">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-full mt-2 disabled:opacity-60"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-600 font-semibold">Sign in here</Link>
      </p>
    </div>
  );
}