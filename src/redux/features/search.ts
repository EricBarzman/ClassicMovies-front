import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  searchInput: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      return {
        ...state,
        searchInput: action.payload
      };
    }
  }
});

export const { updateSearchInput } = searchSlice.actions;

export default searchSlice.reducer;