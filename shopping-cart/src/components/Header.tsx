import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * @component Header
 * @description
 * A React component that renders the header of the shopping cart application, including the logo and cart button.
 */
export default function Header() {
  const { cart, toggleDrawer } = useCart();
  const totalQuantity = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      {/* background  */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-amber-50/95 to-white/95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-transparent to-orange-200/20 opacity-0 group-hover/header:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 group/logo"
          aria-label="GlamCart homepage"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-lg opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg group-hover/logo:shadow-xl transition-all duration-300 group-hover/logo:scale-110">
              <StarIcon className="w-6 h-6 text-white drop-shadow-sm animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-playfair text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 tracking-tight group-hover/logo:from-amber-500 group-hover/logo:via-orange-400 group-hover/logo:to-rose-400 transition-all duration-500 transform group-hover/logo:scale-105">
              TaskCart
            </h1>

            <p className="text-xs text-gray-500 font-medium tracking-wide opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 delay-100">
              Premium Shopping
            </p>
          </div>
        </Link>

        {/* rightside icons */}
        <div className="flex items-center space-x-5 sm:space-x-6">
          {/* Cart */}
          <button
            onClick={toggleDrawer}
            className="relative group/cart p-3 rounded-2xl bg-white/80 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-shadow duration-300 shadow-lg hover:shadow-xl border border-amber-200 hover:border-amber-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Open Cart"
            aria-haspopup="dialog"
            aria-expanded="false"
            type="button"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-md opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300" />
            {/* Icon */}
            <ShoppingCartIcon className="relative h-6 w-6 sm:h-7 sm:w-7 text-amber-600 group-hover/cart:text-amber-700 group-hover/cart:scale-110 transition-transform duration-300" />
            {/* Quantity badge */}
            {totalQuantity > 0 && (
              <>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-ping opacity-30" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white transform animate-bounce">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover/cart:opacity-100 animate-ping transition-opacity duration-300" />
              </>
            )}

            <div className="absolute inset-0 rounded-2xl bg-amber-300/30 scale-0 group-active/cart:scale-100 transition-transform duration-150" />
          </button>
        </div>
      </div>
    </header>
  );
}
