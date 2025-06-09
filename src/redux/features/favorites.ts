import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  mesFavoris: [{
    id: "",
    movieId: "",
    userId: "",
  }]
}

const favoriteSlice = createSlice({
  name: 'favoris',
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      return {
        ...state,
        mesFavoris: action.payload
      }
    },
  }
});

export const { updateFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;