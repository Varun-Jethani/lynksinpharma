import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch cart from /user/cart endpoint
export const fetchSearchHistory = createAsyncThunk(
  "searchHistory/fetchSearchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/search/history", { withCredentials: true });
      console.log("Fetched search history:", response.data.data.searchHistory); // Debugging log
      return response.data.data.searchHistory;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSearchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchHistorySlice.reducer;
