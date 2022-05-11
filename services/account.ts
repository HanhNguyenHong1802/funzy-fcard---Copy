import {
  AccountInfoParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  ChangePasswordParams,
  SignInParams,
  VerifyAccountParams,
} from "@/models/authentication";
import { CommonResponse } from "@/models/common";
import axiosClient from "./axiosClient";

const accountAPI = {
  signIn(params: SignInParams): Promise<CommonResponse> {
    const url = "/account/signin";
    return axiosClient.post(url, params);
  },
  forgotPassword(params: ForgotPasswordParams): Promise<CommonResponse> {
    const url = "/account/forgotpwd";
    return axiosClient.post(url, params);
  },
  resetPassword(params: ResetPasswordParams): Promise<CommonResponse> {
    const url = "/account/resetpwd";
    return axiosClient.post(url, params);
  },
  changePassword(params: ChangePasswordParams): Promise<CommonResponse> {
    const url = "/account/changepwd";
    return axiosClient.post(url, params);
  },
  getAccountInfo(): Promise<CommonResponse> {
    const url = "/account/info";
    return axiosClient.get(url);
  },
  updateAccountInfo(params: AccountInfoParams): Promise<CommonResponse> {
    const url = "/account/updateinfo";
    return axiosClient.post(url, params);
  },
  updateAvatar(avatar: any): Promise<CommonResponse> {
    const url = "/account/updateavatar";
    return axiosClient.post(url, { Avatar: avatar });
  },
  sendOTPVerifyEmail(email: string): Promise<CommonResponse> {
    const url = "/account/verifyemail";
    return axiosClient.post(url, { Email: email });
  },
  verifyEmail(otp: string): Promise<CommonResponse> {
    const url = "/account/verifymailconfirm";
    return axiosClient.post(url, { OTP: otp });
  },
  verifyAccount(params: VerifyAccountParams): Promise<CommonResponse> {
    const url = "/account/verify";
    return axiosClient.post(url, params);
  },
  updateEmail(email: String): Promise<CommonResponse> {
    const url = "/account/updateemail";
    return axiosClient.post(url, { Email: email });
  },
};
export default accountAPI;
