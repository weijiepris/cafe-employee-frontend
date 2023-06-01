import { configureStore } from "@reduxjs/toolkit";

import cafeReducer from "./cafeReducer";
import employeeReducer from "./employeeReducer";

const store = configureStore({
  reducer: { cafe: cafeReducer, employee: employeeReducer },
});

export default store;
