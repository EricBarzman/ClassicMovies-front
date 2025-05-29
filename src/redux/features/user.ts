import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  logged: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ?? '',
  email: localStorage.getItem('email') ?? '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.logged = true;
      state.email = action.payload.email;
      state.token = action.payload.user.token;
    },

    handleLogout: (state) => {
      state.email = "";
      state.token = "";
      state.token = "";
    },
  }
});

export const {updateUser, handleLogout } = userSlice.actions;  
export default userSlice.reducer;