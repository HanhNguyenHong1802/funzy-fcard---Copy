export interface SignInParams {
  Username: string;
  Password: string;
  callbackSuccess?: Function;
  callbackError?: Function;
}
export interface SignUpParams {
  Username: string;
  Fullname: string;
  Password: string;
  Email: string;
  Captcha: string;
}
export interface SignoutParams {
  callbackSuccess?: Function;
  type?: "CHANGE_PASSWORD" | undefined;
}
export interface ActiveAccountParams {
  Username: string;
  OTP: string;
  callbackSuccess?: Function;
  callbackError?: Function;
}
export interface ResendOTPParams {
  Username: string;
}
export interface ForgotPasswordParams {
  Username?: string;
  Email?: string;
}

export interface ResetPasswordParams {
  Password: string;
  OTP: string;
}

export interface ChangePasswordParams {
  OldPass: string;
  Password: string;
}

export interface GetCardDetailParams {
  CategoryId: Number;
  ProductId?: Number;
}

export interface BuyCardParams {
  Quantity: Number;
  CategoryID: Number;
  ProductID: Number;
}

export interface BuyCardNotLoginParams {
  Quantity: Number;
  CategoryID: Number;
  ProductID: Number;
  Email: string;
  Username: string;
  Fullname: string;
}
export interface AccountInfoParams {
  Email: string;
  Fullname: string;
}

export interface AvatarParams {
  Avatar: string;
}
export interface VerifyAccountParams {
  PassportType: Number;
  Picture1: string;
  Picture2: string;
  Picture3: string;
}
export interface NotifyParams {
  Page: number;
  PageSize: number;
}
export interface StatusNotifyParams {
  LogID: number;
}

export interface NewParams {
  culture?: string;
  cateId?: string;
  keywords?: string;
  tags?: string;
  ishot?: Number;
  page: Number;
  pageSize: Number;
}

export interface NewDetailParams {
  id: Number;
}

export interface RechargeAgencyParams {
  Fullname: string;
  BankAccountID: Number;
  Amount: Number;
}

export interface GetCardsParams {
  OrderId: Number;
}

export interface GetHistoryTransParams {
  page: Number;
  pageSize: Number;
  Type?: Number;
  BeginDate?: Date;
  EndDate?: Date;
}
