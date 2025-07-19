import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import type { CartItemModel, Product } from "@/types";
import { cartReducer } from "@/context/cartReducer";

type CartState = {
  items: CartItemModel[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "LOAD_FROM_STORAGE"; payload: CartItemModel[] };

type CartContextType = {
  cart: CartState;

  dispatch: React.Dispatch<CartAction>;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: { items: [] },
  dispatch: () => null,
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

const initialState: CartState = {
  items: [],
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((open) => !open);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "LOAD_FROM_STORAGE", payload: parsed });
        }
      } catch (e) {
        console.error("Error loading cart from storage", e);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    }
  }, [cart.items, hasLoaded]);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, isDrawerOpen, toggleDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
