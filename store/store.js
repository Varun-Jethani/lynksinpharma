import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userOrdersReducer from "./userOrdersSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import searchHistoryReducer from "./searchHistorySlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    userOrders: userOrdersReducer,
    user: userReducer,
    cart: cartReducer,
    searchHistory: searchHistoryReducer,
  },
});

export default store;
