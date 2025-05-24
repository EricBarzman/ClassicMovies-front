import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";

const store = configureStore({
  reducer: {
    user: userSlice,
  }
});

export default store;