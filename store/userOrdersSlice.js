import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user orders from /order/user endpoint
export const fetchUserOrders = createAsyncThunk(
  "userOrders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Axios will send cookies by default if withCredentials is true
      const response = await axios.get("/order/user", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userOrdersSlice.reducer;
