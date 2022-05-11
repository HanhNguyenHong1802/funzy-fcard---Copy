import axiosClient from "./axiosClient";
import { CommonResponse } from "@/models/common";
import {
  ActiveAccountParams,
  NotifyParams,
  ResendOTPParams,
  SignInParams,
  SignUpParams,
  StatusNotifyParams,
} from "@/models/authentication";

const authenticationAPI = {
  signIn(params: SignInParams): Promise<CommonResponse> {
    const url = "/account/signin";
    return axiosClient.post(url, params);
  },
  signUp(params: SignUpParams): Promise<CommonResponse> {
    const url = "/account/create";
    return axiosClient.post(url, params);
  },
  getCaptcha(): Promise<{ data: string }> {
    const url = "/captcha/get";
    return axiosClient.get(url);
  },
  activeAccount(params: ActiveAccountParams): Promise<CommonResponse> {
    const url = "/account/active";
    return axiosClient.post(url, params);
  },
  resendOTP(params: ResendOTPParams): Promise<CommonResponse> {
    const url = "/account/resendOTPActive";
    return axiosClient.post(url, params);
  },
  signOut(): Promise<CommonResponse> {
    const url = "/account/signout";
    return axiosClient.get(url);
  },
  getNotify(params: NotifyParams): Promise<CommonResponse> {
    const url = "/account/getnotify";
    return axiosClient.get(url, { params: params });
  },
  getNotifyUnRead(): Promise<CommonResponse> {
    const url = "/account/gettotalunread";
    return axiosClient.get(url);
  },
  updateStateNotify(params: StatusNotifyParams): Promise<CommonResponse> {
    const url = "/account/updatenotification";
    return axiosClient.post(url, params);
  },
  checkStatus(): Promise<CommonResponse> {
    const url = "/account/checkstatus";
    return axiosClient.get(url);
  },
};

export default authenticationAPI;
