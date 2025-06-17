import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userOrdersReducer from "./userOrdersSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    userOrders: userOrdersReducer,
    user: userReducer,
  },
});

export default store;
