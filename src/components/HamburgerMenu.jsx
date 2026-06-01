// src/components/HamburgerMenu.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/api";

export default function HamburgerMenu({ isOpen, onClose }) {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await logout(); } catch (_) {}
    clearAuth();
    onClose();
  };

  if (!isOpen) return null;

  const links = [
    {to: "user-profile", label: "My Profile"},
    { to: "/customers", label: "Customers" },
    { to: "/sales-history", label: "Sales History" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="w-72 bg-white h-full flex flex-col p-6 shadow-xl">
        {/* Profile */}
        <div
            onClick={() => { navigate("/profile"); onClose(); }}
            className="flex items-center gap-3 mb-8 cursor-pointer">
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg">
            {user?.name?.[0] ?? "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user?.name ?? "User"}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="text-gray-700 py-3 px-3 rounded-xl hover:bg-gray-50 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 py-3 px-3 rounded-xl hover:bg-red-50 font-medium mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}