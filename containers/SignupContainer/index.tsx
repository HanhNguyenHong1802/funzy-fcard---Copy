import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputText from "@/components/Form/InputText";
import InputPassword from "@/components/Form/InputPassword";

import {
  validatePhone,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateFullname,
  validateCaptcha,
} from "@/constants/validate";
import InputCaptcha from "@/components/Form/InputCaptcha";
import { useRouter } from "next/router";
import authenticationAPI from "@/services/authentication";
import { toastSuccess } from "@/utils/toast";
import { openModalSignin } from "@/redux/modalSlice";
import ErrorMessage from "@/components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectNetwork } from "@/redux/networkSlice";
import { selectUserInfo } from "@/redux/userSlice";
import Link from "next/link";
import { ERROR_CODE } from "@/constants/errorCode";

type Inputs = {
  fullname: string;
  phone: string;
  password: string;
  rePassword: string;
  email: string;
  captcha: string;
};

const schema = yup
  .object({
    fullname: validateFullname,
    phone: validatePhone,
    password: validatePassword,
    rePassword: validateConfirmPassword("password"),
    email: validateEmail,
    captcha: validateCaptcha,
  })
  .required();

const SignupContainer = () => {
  const [resetCaptcha, setResetCaptcha] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errCode, setErrCode] = useState<Number | null>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const network = useAppSelector(selectNetwork);
  const user = useAppSelector(selectUserInfo);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data: Inputs) => {
    if (!network) {
      setErrCode(-900000);
      return;
    }
    setErrCode(null);
    setLoading(true);
    authenticationAPI
      .signUp({
        Username: data.phone,
        Fullname: data.fullname,
        Email: data.email,
        Password: data.password,
        Captcha: data.captcha,
      })
      .then((res) => {
        if (res?.data?.code >= 0) {
          toastSuccess("????ng k?? t??i kho???n th??nh c??ng !");
          router.push(`/kich-hoat-tai-khoan/${data.phone}?type=first`);
        }
      })
      .catch((error) => {
        resetField("captcha");
        const code = error.response.data.code;
        switch (code) {
          case -41:
            setError("email", { message: ERROR_CODE[code] });
            break;
          case -641:
            setError("phone", { message: ERROR_CODE[code] });
            break;
          case -10002:
            setError("phone", { message: ERROR_CODE[code] });
            break;
          case -10008:
            setError("captcha", { message: ERROR_CODE[code] });
            break;
          default:
            setErrCode(code);
            break;
        }
        setResetCaptcha((pre) => !pre);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setErrCode(null);
  }, [
    watch("captcha"),
    watch("email"),
    watch("fullname"),
    watch("password"),
    watch("phone"),
  ]);
  return (
    <>
      <div
        className="container mx-auto flex items-center p-5 lg:p-0"
        style={{ minHeight: "calc(100vh - 52px)", marginTop: "52px" }}
      >
        <div className="bg-white w-full max-w-screen-sm mx-auto my-10">
          <h1 className="py-5 bg-blue-600 font-semibold text-xl leading-6 text-white text-center uppercase">
            ????ng k??
          </h1>
          <form
            className="p-8 border border-slate-400"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              register={register("fullname")}
              placeholder="H??? v?? t??n"
              label="H??? v?? t??n(*)"
              error={errors.fullname}
              className="mb-3.5"
            />
            <InputText
              register={register("phone", {
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setValue("phone", value);
                },
              })}
              placeholder="S??? ??i???n tho???i"
              label="S??? ??i???n tho???i(*)"
              error={errors.phone}
              className="mb-3.5"
            />
            <InputPassword
              register={register("password")}
              placeholder="M???t kh???u"
              label="M???t kh???u(*)"
              error={errors.password}
              className="mb-3.5"
            />
            <InputPassword
              register={register("rePassword")}
              placeholder="Nh???p l???i m???t kh???u"
              label="Nh???p l???i m???t kh???u(*)"
              error={errors.rePassword}
              className="mb-3.5"
            />
            <InputText
              register={register("email")}
              placeholder="Email"
              label="Email(*)"
              error={errors.email}
              className="mb-3.5"
            />
            <InputCaptcha
              register={register("captcha")}
              placeholder="M?? captcha"
              label="M?? captcha(*)"
              error={errors.captcha}
              className="mb-3.5"
              resetCaptcha={resetCaptcha}
            />
            <p className="text-[#f79636] text-center my-1">
              (M?? k??ch ho???t s??? ???????c g???i qua s??? ??i???n tho???i c???a Qu?? kh??ch)
            </p>
            {errCode && <ErrorMessage code={errCode} />}
            <p className="text-center text-sm mb-3.5">
              B???ng c??ch ???n v??o n??t {`"`}
              <span className="text-orange-500">????ng k??</span>
              {`"`}, t??i ?????ng ?? v???i{" "}
              <Link href="/dieu-khoan-su-dung">
                <span className="text-blue-500 cursor-pointer">
                  ??i???u Kho???n S??? D???ng <span className="text-black">&</span> Ch??nh
                  S??ch B???o M???t{" "}
                </span>
              </Link>
              c???a Fcard.
            </p>
            <input
              disabled={!isValid || loading}
              type="submit"
              value={loading ? "??ang x??? l?? ..." : "????ng k??"}
              className={`w-full mb-3.5 py-4 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer ${
                !isValid || loading ? "opacity-30" : ""
              }`}
            />
            <p className="text-center text-sm">
              B???n ???? c?? t??i kho???n?{" "}
              <span
                onClick={() => dispatch(openModalSignin())}
                className="text-blue-500 cursor-pointer"
              >
                ????ng nh???p ngay
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupContainer;
