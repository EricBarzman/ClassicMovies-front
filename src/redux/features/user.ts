import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  logged: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ?? '',
  email: localStorage.getItem('email') ?? '',
  username: localStorage.getItem('username') ?? '',
  avatar: localStorage.getItem('avatar') ?? '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { email, token, username, avatar } = action.payload;
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      localStorage.setItem('username', username)
      localStorage.setItem('avatar', avatar)
      return {
        ...state,
        logged: true,
        username,
        email,
        token,
        avatar,
      }
    },

    handleLogout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      return {
        email: "",
        username: '',
        token: "",
        avatar: "",
        logged: false,
      }
    },
  }
});

export const { updateUser, handleLogout } = userSlice.actions;
export default userSlice.reducer;