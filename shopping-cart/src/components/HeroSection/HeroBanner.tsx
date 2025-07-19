import SearchInput from "./SearchInput";
import { useEffect } from "react";

/**
 * @interface HeroBannerProps
 * @property {string} searchQuery - The current search query.
 * @property {function} setSearchQuery - Function to update the search query.
 */
interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

/**
 * @component HeroBanner
 * @description
 * A React component that renders the hero section of the shopping cart application, including a search input and a visually appealing banner.
 * It uses a gradient background and floating circles for a modern look.
 * @param {HeroBannerProps} props - The properties for the HeroBanner component.
 */
export default function HeroBanner({ searchQuery, setSearchQuery }: HeroBannerProps) {
  useEffect(() => {
    const playfair = document.createElement("link");
    playfair.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap";
    playfair.rel = "stylesheet";
    document.head.appendChild(playfair);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-700 to-green-700 text-white py-28 sm:py-36 sm:mt-0 mt-[-6%] font-inter">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 animate-fade-in drop-shadow-xl font-playfair tracking-wide"
          style={{ letterSpacing: "-0.02em" }}
        >
          Discover <span className="text-yellow-300">Premium Beauty</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl opacity-90 mb-10 tracking-wide font-light">
          Transform your beauty routine with our curated collection designed to
          elevate your natural glow and confidence.
        </p>

        <div className="inline-block bg-white/30 backdrop-blur-md rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-500 ring-1 ring-white/40">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/*floating circles */}
        <div className="pointer-events-none">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/10 animate-float blur-xl"></div>
          <div className="absolute top-[5rem] right-[5rem] w-20 h-20 rounded-full bg-white/10 animate-float-delayed blur-lg"></div>
          <div className="absolute bottom-10 left-24 w-16 h-16 rounded-full bg-white/10 animate-float blur-xl"></div>
        </div>
      </div>

      {/* Animations + fonts */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fade-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
}
