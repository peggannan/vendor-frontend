// src/components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HamburgerMenu from "./HamburgerMenu";

export default function Header({ showSearch = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const shopName = user?.shopName || "My Shop";
  const brandName = "ADOM VENDOR";

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">

          {/* Left — hamburger + shop info */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1 flex-shrink-0"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-gray-700 dark:text-gray-200">
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="12" x2="19" y2="12" />
              <line x1="3" y1="18" x2="19" y2="18" />
            </svg>
          </button>

          <div className="flex-shrink-0">
            <div className="flex items-center gap-1 mb-0.5">
              {/* Brand icon */}
              <div className="w-4 h-4 bg-brand-600 rounded-sm flex items-center justify-center">
                <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2">
                  <path d="M2 5l2 2 4-4" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-brand-600 tracking-widest uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">
              {shopName.length > 12 ? shopName.slice(0, 12) + "..." : shopName}
            </p>
          </div>

          {/* Center — search bar */}
          {showSearch && (
            <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 gap-2">
              <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
                <circle cx="6" cy="6" r="5" />
                <path d="M13 13l-3-3" />
              </svg>
              <input
                type="text"
                placeholder="Search products, stock..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-gray-600 dark:text-gray-300 placeholder-gray-400 focus:outline-none w-full"
              />
            </div>
          )}

          {/* Right — notification bell */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative flex-shrink-0 w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-gray-600 dark:text-gray-300">
              <path d="M13.73 9A6 6 0 006 4a6 6 0 00-6 5c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M10.73 17a2 2 0 01-3.46 0" />
            </svg>
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 rounded-full flex items-center justify-center text-[9px] text-white font-bold">
              2
            </span>
          </button>

        </div>
      </header>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}