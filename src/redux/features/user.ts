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
      const { email, token } = action.payload;
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      return {
        ...state,
        logged: true,
        email,
        token,
      }
    },

    handleLogout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      return {
        email: "",
        token: "",
        logged: false,
      }
    },
  }
});

export const { updateUser, handleLogout } = userSlice.actions;
export default userSlice.reducer;