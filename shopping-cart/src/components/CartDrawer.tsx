import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

/**
 * @component CartDrawer
 * @description
 * A React component that displays a side drawer containing the shopping cart items where the user can manage their selected products.
 */
export default function CartDrawer() {
  const { cart, isDrawerOpen, toggleDrawer } = useCart();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside
      aria-label="Shopping cart"
      className={`fixed top-0 right-0  h-full w-full sm:w-[430px] bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-l border-amber-100
      transform transition-transform duration-300 z-50
      ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
      flex flex-col `}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-5 border-b border-amber-200">
        <h2 className="text-3xl font-extrabold text-amber-600 tracking-tight font-playfair">
          🛒 Your Cart
        </h2>

        <button
          onClick={toggleDrawer}
          aria-label="Close cart drawer"
          className="p-2 rounded-full hover:bg-amber-100 active:scale-95 transition"
        >
          <XMarkIcon className="h-7 w-7 text-amber-600" />
        </button>
      </header>

      {/* Cart Items */}
      <section
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6
        max-h-[calc(100vh-210px)] scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent"
      >
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 space-y-5 text-amber-900 select-none">
            <ShoppingCartIcon className="w-20 h-20 opacity-30" />
            <p className="text-xl font-medium">Your cart is empty.</p>
            <span className="text-sm text-amber-400">
              Add something you love 💛
            </span>
          </div>
        ) : (
          cart.items.map((item) => (
            <div key={item.id} className="animate-fadeIn">
              <CartItem item={item} />
            </div>
          ))
        )}
      </section>

      {/* card buttoj*/}
      <footer className="px-6 py-5 border-t border-amber-200 bg-white/90 backdrop-blur-md rounded-b-[2rem] shadow-inner">
        <div className="flex justify-between text-xl font-semibold text-amber-800 mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          disabled={cart.items.length === 0}
          className={`w-full py-4 rounded-xl text-white text-lg font-bold tracking-wide transition-all
            ${
              cart.items.length === 0
                ? "bg-amber-300 cursor-not-allowed opacity-70"
                : "bg-gradient-to-br from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-95 shadow-lg"
            }`}
        >
          Checkout Now
        </button>
      </footer>

      {/* animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>
    </aside>
  );
}
