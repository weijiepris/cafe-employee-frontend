import { createSlice } from "@reduxjs/toolkit";

const initialCafeState = {
  data: [],
};

const cafeSlice = createSlice({
  name: "cafe",
  initialState: initialCafeState,
  reducers: {
    add(state, action) {
      console.log("hello", action.payload);
      state.data = action.payload;
    },
  },
});

export const cafeActions = cafeSlice.actions;
export default cafeSlice.reducer;
