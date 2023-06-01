import { createSlice } from "@reduxjs/toolkit";

const initialEmployeeState = {
  data: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState: initialEmployeeState,
  reducers: {
    add(state, action) {
      state.data = action.payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
