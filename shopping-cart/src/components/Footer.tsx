import { StarIcon } from "@heroicons/react/24/solid";

/**
 * @component Footer
 * @description
 * A React component that renders the footer of the shopping cart application, including branding and copyright information.
 */
export default function Footer() {
  return (
    <footer className="bg-white relative z-10 border-t border-amber-200 mt-20 mr-[-5%] ml-[-5%] mb-[-9%] sm:mr-[-11.5%] sm:ml-[-11.5%] sm:mb-[-5.5%]">
      {/* background  */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-amber-50 to-white pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-transparent to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center text-gray-600 space-y-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-lg opacity-20" />
          <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
            <StarIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-xl font-bold font-playfair bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
          TaskCart
        </h2>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Made with 🪄 by IslamOmar.
        </p>
      </div>
    </footer>
  );
}
