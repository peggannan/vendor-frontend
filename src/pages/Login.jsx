// src/pages/Login.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await login(form);
      saveAuth(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Wrong Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-500 to-brand-700 dark:from-gray-950 dark:to-gray-900 flex flex-col justify-end max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 py-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-14 h-14 object-contain mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Log In</h2>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="My Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
                error
                  ? "border-red-400"
                  : "border-gray-200 dark:border-gray-600 focus:border-brand-500"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="My Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
                  error
                    ? "border-red-400"
                    : "border-gray-200 dark:border-gray-600 focus:border-brand-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              >
                <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <input type="checkbox" className="accent-brand-600" />
              Remember Me
            </label>
            <button type="button" className="text-brand-600 font-medium">
              Forgot Password
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-full mt-2 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-600 font-semibold">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
}