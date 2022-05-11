import ErrorMessage from "@/components/ErrorMessage";
import InputText from "@/components/Form/InputText";
import authenticationAPI from "@/services/account";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ResetPasswordContainer from "../ResetPasswordContainer";

type Inputs = {
  phone: string;
};

const schema = yup
  .object({
    phone: yup.string().required("Số điện thoại/Email không được để trống."),
  })
  .required();

const ForgotPasswordContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errCode, setErrCode] = useState(0);
  const [forgotPwSuccess, setForgotPwSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    const isEmail = data?.phone?.includes("@");
    let params;
    if (isEmail) {
      params = {
        Email: data?.phone,
      };
    } else {
      params = {
        Username: data?.phone,
      };
    }
    authenticationAPI
      .forgotPassword(params)
      .then((res) => {
        const {
          data: { code, params },
        } = res;
        if (code >= 0) {
          setForgotPwSuccess(true);
          setToken(params?.[0]);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        setErrCode(data?.code);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setErrCode(0);
  }, [watch("phone")]);

  const handleBack = () => {
    reset();
    setForgotPwSuccess(false);
  };

  return (
    <>
      {forgotPwSuccess ? (
        <ResetPasswordContainer
          handleBack={handleBack}
          token={token}
          data={watch("phone")}
        />
      ) : (
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
              onClick={() => router.push("/")}
            >
              <Image
                src="/icons/icon-back.svg"
                width={30}
                height={30}
                alt="back"
              />
            </div>
            <form
              className="p-8 border border-slate-400"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputText
                className="mb-3.5"
                register={register("phone")}
                placeholder="SĐT/Email"
                label="SĐT/Email(*)"
                error={errors.phone}
              />
              {errCode < 0 && (
                <ErrorMessage
                  code={errCode}
                  data={watch("phone")}
                  type="FORGOT_PASSWORD"
                />
              )}
              <input
                disabled={!isValid || loading || errCode < 0}
                type="submit"
                value={loading ? "Đang xử lý" : "Tiếp tục"}
                className={`w-full mb-3.5 py-4 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer ${
                  !isValid || loading || errCode < 0 ? "opacity-30" : ""
                }`}
              />
              <p className="text-center text-sm">
                Hoặc liên hệ hotline:{" "}
                <span className="text-orange-500">1900636919</span> để được hỗ
                trợ ngay!
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordContainer;
