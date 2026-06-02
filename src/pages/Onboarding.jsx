// src/pages/Onboarding.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Welcome to Shelfline",
    desc: "Your shop, in your pocket. Track sales, manage stock, and grow your business from anywhere.",
  },
  {
    title: "Manage Sales Efficiently",
    desc: "Built for the hustle. Record sales, track stock, and know your numbers.",
  },
  {
    title: "Grow Your Business",
    desc: "Increase your work management & career development radically.",
  },
];

export default function Onboarding() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const isLast = slide === slides.length - 1;

return (
  <div className="h-screen w-screen bg-gradient-to-b from-brand-500 to-brand-700 flex flex-col items-center justify-between px-6 py-12 text-white max-w-sm mx-auto overflow-hidden">

    {/* Illustration */}
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-56 h-56 bg-white/10 rounded-3xl flex items-center justify-center">
        <span className="text-white/40 text-sm">Illustration</span>
      </div>
    </div>

    {/* Text */}
    <div className="text-center mb-6 px-2">
      <h2 className="text-2xl font-bold mb-2">{slides[slide].title}</h2>
      <p className="text-white/70 text-sm leading-relaxed">{slides[slide].desc}</p>
    </div>

    {/* Dots */}
    <div className="flex gap-2 mb-6">
      {slides.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
        />
      ))}
    </div>

    {/* Buttons */}
    <div className="w-full flex flex-col gap-3">
      {isLast ? (
        <>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3.5 bg-white text-brand-600 font-bold rounded-full"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 border border-white/60 text-white font-semibold rounded-full"
          >
            Log In
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setSlide(slide + 1)}
            className="w-full py-3.5 bg-white text-brand-600 font-bold rounded-full"
          >
            Next
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 border border-white/60 text-white font-semibold rounded-full"
          >
            Skip
          </button>
        </>
      )}
    </div>
  </div>
);
}