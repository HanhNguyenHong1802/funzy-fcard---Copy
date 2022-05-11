import ErrorMessage from "@/components/ErrorMessage";
import InputOtp from "@/components/Form/InputOTP";
import InputPassword from "@/components/Form/InputPassword";
import {
  validateConfirmPassword,
  validatePassword,
} from "@/constants/validate";
import { openModalSignin } from "@/redux/modalSlice";
import authenticationAPI from "@/services/account";
import { toastSuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useCountdown from "hooks/useCountDown";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

type Inputs = {
  pin: string;
  password: string;
  rePassword: string;
};

const schema = yup
  .object({
    pin: yup.string().min(6, "").required(),
    password: validatePassword,
    rePassword: validateConfirmPassword("password"),
  })
  .required();

type ResetPasswordContainerProps = {
  token: string | undefined;
  handleBack: Function;
  data: any;
};

const ResetPasswordContainer = ({
  handleBack,
  token,
  data,
}: ResetPasswordContainerProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [errCode, setErrCode] = useState<Number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOTP, setResendOTP] = useState<boolean>(true);
  const [disableResendOTP, setDisableResendOTP] = useState(false);
  const coutdown = useCountdown(90, resendOTP, setResendOTP);

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    const params = {
      Password: data?.password,
      OTP: data?.pin,
      Token: token,
    };
    authenticationAPI
      .resetPassword(params)
      .then(() => {
        setErrCode(0);
        reset();
        toastSuccess("Đặt lại mật khẩu thành công");
        dispatch(openModalSignin());
        handleBack();
      })
      .catch((err) => {
        setErrCode(0);
        const { data } = err.response;
        setErrCode(data?.code);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setErrCode(0);
  }, [watch("password"), watch("pin"), watch("rePassword")]);

  const handleResendOTP = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const isEmail = data.includes("@");
    let params;
    if (isEmail) {
      params = {
        Email: data,
      };
    } else {
      params = {
        Username: data,
      };
    }
    authenticationAPI
      .forgotPassword(params)
      .then((res) => {
        if (res?.data?.code >= 0) {
          toastSuccess("Yêu cầu gửi lại mã PIN thành công.", {}, 2000);
          setErrCode(0);
          setResendOTP(true);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        setErrCode(data?.code);
        if (data?.code === -644) {
          setDisableResendOTP(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="container mx-auto flex items-center p-5 lg:p-0"
      style={{ minHeight: "calc(100vh - 52px)", marginTop: "52px" }}
    >
      <div className="bg-white w-full max-w-md mx-auto my-10 relative">
        <h1 className="py-5 bg-blue-600 font-semibold text-xl leading-6 text-white text-center uppercase">
          Quên mật khẩu
        </h1>
        <div
          className="absolute top-4 left-4 z-[2] cursor-pointer"
          onClick={() => handleBack()}
        >
          <Image src="/icons/icon-back.svg" width={30} height={30} alt="back" />
        </div>
        <form
          className="p-8 border border-slate-400"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center mb-2.5">
            Điền mã PIN vừa được gửi về{" "}
            <span className="font-semibold">SĐT/Email</span> để xác thực và
            thiết lập mật khẩu
          </p>

          <Controller
            control={control}
            name="pin"
            render={({ field: { onChange } }) => (
              <InputOtp
                label="Mã PIN(*)"
                onChange={onChange}
                value={watch("pin")}
                className="mb-2"
              />
            )}
          />
          <InputPassword
            register={register("password")}
            placeholder="Mật khẩu mới"
            label="Mật khẩu mới(*)"
            error={errors.password}
            className="mb-2"
          />
          <InputPassword
            register={register("rePassword")}
            placeholder="Nhập lại mật khẩu"
            label="Nhập lại mật khẩu(*)"
            error={errors.rePassword}
            className="mb-2"
          />
          {errCode < 0 && <ErrorMessage code={errCode} className="mt-4" />}
          <input
            disabled={!isValid || loading}
            type="submit"
            value={loading ? "Đang xử lý" : "Xác nhận"}
            className={`w-full mt-3 mb-3.5 py-4 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer ${
              !isValid || loading ? "opacity-30" : ""
            }`}
          />
          <p className="text-center text-sm">
            <button
              className={`
              font-semibold ${
                resendOTP || disableResendOTP
                  ? `text-[#717171]`
                  : `text-blue-500`
              }`}
              disabled={resendOTP || disableResendOTP}
              onClick={(e) => handleResendOTP(e)}
            >
              Gửi lại
            </button>{" "}
            mã PIN{" "}
            {resendOTP && (
              <span>
                sau (<span className="font-bold">{coutdown}s</span>)
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordContainer;
