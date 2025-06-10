import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";
import searchSlice from "./features/search";
import favoritesSlice from "./features/favorites";
import favoriteMiddleware from "./features/favorites.middleware";
import userMiddleware from "./features/user.middleware";

const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userMiddleware, favoriteMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;