import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all careers
export const fetchCareers = createAsyncThunk(
  "career/fetchCareers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/career");
      //   console.log("Fetched careers:", response.data.message); // Debugging log
      console.log(response.data.message);
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const careerSlice = createSlice({
  name: "career",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default careerSlice.reducer;
