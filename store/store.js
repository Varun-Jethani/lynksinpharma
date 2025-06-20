import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userOrdersReducer from "./userOrdersSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    userOrders: userOrdersReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
