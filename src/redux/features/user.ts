import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  logged: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ?? '',
  userName: localStorage.getItem('username') ?? '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken: (state, action) => {},
    handleLogout: (state) => {
      state.userName = "";
      state.token = "";
      state.token = "";
    },
    updateUserInfo: (state, action) => {},
  }
});

export const {updateToken, handleLogout, updateUserInfo } = userSlice.actions;  
export default userSlice.reducer;