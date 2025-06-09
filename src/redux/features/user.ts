import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  logged: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ?? '',
  email: localStorage.getItem('email') ?? '',
  username: localStorage.getItem('username') ?? '',
  avatar: localStorage.getItem('avatar') ?? '',
  userId: localStorage.getItem('userId') ?? '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { email, token, username, avatar, userId } = action.payload;
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      localStorage.setItem('username', username)
      localStorage.setItem('avatar', avatar)
      localStorage.setItem('userId', userId)
      return {
        ...state,
        logged: true,
        username,
        email,
        token,
        avatar,
        userId,
      }
    },

    handleLogout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userId');
      return {
        email: "",
        username: '',
        token: "",
        avatar: "",
        logged: false,
        userId: "",
      }
    },
  }
});

export const { updateUser, handleLogout } = userSlice.actions;
export default userSlice.reducer;