import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    game: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
