import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type NetworkState = {
  online: boolean;
};

const initialState: NetworkState = {
  online: true,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setOnline: (state) => {
      state.online = true;
    },
    setOffline: (state) => {
      state.online = false;
    },
  },
});

export const { setOnline, setOffline } = networkSlice.actions;

export const selectNetwork = (state: RootState) => state.network.online;

export default networkSlice.reducer;
