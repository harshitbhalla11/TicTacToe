import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import roomReducer from "../feature/roomSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
