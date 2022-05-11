import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import networkReducer from "./networkSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    network: networkReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
