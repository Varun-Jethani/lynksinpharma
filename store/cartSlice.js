import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOCAL_CART_KEY = "guest_cart";
const getLocalCart = () => {
  try {
    const data = localStorage.getItem(LOCAL_CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const setLocalCart = (items) => {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  } catch {}
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/cart", { withCredentials: true });
      return response.data.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getLocalCart(),
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, unit } = action.payload;
      const idx = state.items.findIndex(
        (item) => item.productId === productId && item.unit === unit
      );
      if (idx > -1) {
        state.items = state.items.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        state.items = [...state.items, { productId, quantity, unit }];
      }
      setLocalCart(state.items);
    },
    updateCartItem: (state, action) => {
      const { productId, quantity, unit } = action.payload;
      state.items = state.items.map((item) =>
        item.productId === productId && item.unit === unit
          ? { ...item, quantity }
          : item
      );
      setLocalCart(state.items);
    },
    removeCartItem: (state, action) => {
      const { productId, unit } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.unit === unit)
      );
      setLocalCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      setLocalCart([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, updateCartItem, removeCartItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
