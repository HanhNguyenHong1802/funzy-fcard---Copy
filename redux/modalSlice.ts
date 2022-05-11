import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type ModalState = {
  showSignin: boolean;
  showSignout: boolean;
  showDrawer: boolean;
};

const initialState: ModalState = {
  showSignin: false,
  showSignout: false,
  showDrawer: false,
};

export const modalSlide = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalSignin: (state) => {
      state.showSignin = true;
      state.showSignout = false;
      state.showDrawer = false;
    },
    closeModalSignin: (state) => {
      state.showSignin = false;
    },
    openModalSignout: (state) => {
      state.showSignout = true;
      state.showSignin = false;
      state.showDrawer = false;
    },
    closeModalSignout: (state) => {
      state.showSignout = false;
    },
    openDrawer: (state) => {
      state.showDrawer = true;
      state.showSignout = false;
      state.showSignin = false;
    },
    closeDrawer: (state) => {
      state.showDrawer = false;
    },
    closeAllModal: (state) => {
      state.showDrawer = false;
      state.showSignout = false;
      state.showSignin = false;
    },
  },
});

export const {
  openModalSignin,
  closeModalSignin,
  openModalSignout,
  closeModalSignout,
  openDrawer,
  closeDrawer,
  closeAllModal,
} = modalSlide.actions;

export const selectShowSignin = (state: RootState) => state.modal.showSignin;
export const selectShowSignout = (state: RootState) => state.modal.showSignout;
export const selectShowDrawer = (state: RootState) => state.modal.showDrawer;

export default modalSlide.reducer;
