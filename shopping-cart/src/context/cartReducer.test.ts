import { cartReducer } from "./cartReducer";
import type { CartState } from "./cartReducer";
import type { Product } from "@/types";

const product: Product = {
  id: 1,
  title: "Test Product",
  price: 20,
  image: "img.png",
  description: "",
  category: "",
  rating: {
    rate: 0,
    count: 0,
  },
  stock: false,
  onSale: false,
  isNew: false,
  isBestSeller: false,
};

test("adds a new product to cart", () => {
  const initialState: CartState = { items: [] };
  const state = cartReducer(initialState, {
    type: "ADD_TO_CART",
    payload: product,
  });

  expect(state.items).toHaveLength(1);
  expect(state.items[0].quantity).toBe(1);
});

test("increments quantity if product already in cart", () => {
  const initialState: CartState = { items: [{ ...product, quantity: 1 }] };
  const state = cartReducer(initialState, {
    type: "ADD_TO_CART",
    payload: product,
  });

  expect(state.items[0].quantity).toBe(2);
});

test("removes product from cart", () => {
  const initialState: CartState = { items: [{ ...product, quantity: 1 }] };
  const state = cartReducer(initialState, {
    type: "REMOVE_FROM_CART",
    payload: product.id,
  });

  expect(state.items).toHaveLength(0);
});

test("decreases quantity and removes if 0", () => {
  const initialState: CartState = { items: [{ ...product, quantity: 1 }] };
  const state = cartReducer(initialState, {
    type: "DECREASE_QUANTITY",
    payload: product.id,
  });

  expect(state.items).toHaveLength(0);
});
