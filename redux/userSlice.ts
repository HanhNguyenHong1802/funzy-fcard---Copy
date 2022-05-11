import { ACCESS_TOKEN } from "@/constants/authentication";
import {
  ActiveAccountParams,
  SignInParams,
  SignoutParams,
} from "@/models/authentication";
import accountAPI from "@/services/account";
import authenticationAPI from "@/services/authentication";
import { toastError, toastSuccess } from "@/utils/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { destroyCookie, setCookie } from "nookies";
import { agencyLevelByMoney } from "../constants";
import type { RootState } from "./store";

export type UserState = {
  user: any;
};

const initialState: UserState = {
  user: null,
};

export const signinThunk = createAsyncThunk(
  "account/signin",
  async (params: SignInParams, { rejectWithValue }) => {
    try {
      const response = await authenticationAPI.signIn(params);
      if (response?.data?.code >= 0) {
        setCookie(null, ACCESS_TOKEN, response.data.params[0], {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        params.callbackSuccess && params.callbackSuccess();
      }
      return response?.data?.data;
    } catch (error: any) {
      params.callbackError && params.callbackError(error?.response?.data?.code);
      throw rejectWithValue(error);
    }
  }
);

export const signoutThunk = createAsyncThunk(
  "account/signout",
  async (params: SignoutParams, { rejectWithValue }) => {
    try {
      const response = await authenticationAPI.signOut();
      if (response?.data?.code >= 0) {
        destroyCookie(null, ACCESS_TOKEN);
        if (!params.type) {
          toastSuccess("Đăng xuất thành công.", {}, 2000);
        }
        params.callbackSuccess && params.callbackSuccess();
      }
      return response?.data?.data;
    } catch (error) {
      toastError("Đăng xuất không thành công. Vui lòng thử lại sau.", {}, 2000);
      throw rejectWithValue(error);
    }
  }
);

export const userInfoThunk = createAsyncThunk(
  "account/info",
  async (params, { rejectWithValue }) => {
    try {
      const response = await accountAPI.getAccountInfo();
      if (response?.data?.code >= 0) return response?.data?.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        destroyCookie(null, ACCESS_TOKEN);
      }
      throw rejectWithValue(error);
    }
  }
);

export const activeAccount = createAsyncThunk(
  "account/active",
  async (params: ActiveAccountParams, { rejectWithValue }) => {
    try {
      const response = await authenticationAPI.activeAccount(params);

      if (response?.data?.code >= 0) {
        params.callbackSuccess && params.callbackSuccess(response?.data?.data);
      }
      if (response?.data?.data && response?.data?.params?.[0]) {
        setCookie(null, ACCESS_TOKEN, response.data.params[0], {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return response?.data?.data;
      }
      return null;
    } catch (error: any) {
      params.callbackError && params.callbackError(error?.response?.data?.code);
      throw rejectWithValue(error);
    }
  }
);

export const userSlide = createSlice({
  name: "account",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
    },
    signout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(signoutThunk.fulfilled, (state, action) => {
      state.user = null;
    });
    builder.addCase(signoutThunk.rejected, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userInfoThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userInfoThunk.rejected, (state, action) => {
      state.user = null;
    });
    builder.addCase(activeAccount.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(activeAccount.rejected, (state, action) => {
      state.user = null;
    });
  },
});

export const { signin, signout } = userSlide.actions;

export const selectUserInfo = (state: RootState) => state.user.user;
export const getMoneyUpLevel = (state: RootState) => {
  const moneyUser = state.user.user.balanceMonth;
  const levelAgency =
    state.user.user.status === 3 ? state.user.user.agencyType : null;
  const levelAgencyNext =
    levelAgency === 0 ? 3 : levelAgency > 1 ? levelAgency - 1 : null;
  let moneyToLevelUp = 0;
  let progress = 100;

  if (levelAgencyNext) {
    const moneyByLevel = agencyLevelByMoney[levelAgencyNext];
    moneyToLevelUp = moneyByLevel - moneyUser;
    progress = Math.round((moneyUser / moneyByLevel) * 100);
  }

  return {
    agencyCurrent: levelAgency,
    agencyNext: levelAgencyNext,
    moneyToLevelUp,
    progress,
  };
};
export default userSlide.reducer;
