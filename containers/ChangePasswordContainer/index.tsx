import ErrorMessage from "@/components/ErrorMessage";
import InputPassword from "@/components/Form/InputPassword";
import {
  validateConfirmPassword,
  validateNewPassword,
  validatePassword,
} from "@/constants/validate";
import { signoutThunk } from "@/redux/userSlice";
import authenticationAPI from "@/services/account";
import { toastSuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

type FormProps = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup
  .object({
    oldPassword: validatePassword,
    newPassword: validateNewPassword("oldPassword"),
    confirmNewPassword: validateConfirmPassword(),
  })
  .required();

const ChangePasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormProps>({ mode: "onChange", resolver: yupResolver(schema) });

  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errCode, setErrCode] = useState<Number>(0);

  const onSubmit = (data: FormProps) => {
    setLoading(true);
    const params = {
      OldPass: data?.oldPassword,
      Password: data?.newPassword,
    };
    authenticationAPI
      .changePassword(params)
      .then((res) => {
        if (res?.data?.code >= 0) {
          toastSuccess(
            "Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.",
            {},
            5000
          );
          dispatch(
            signoutThunk({
              type: "CHANGE_PASSWORD",
              callbackSuccess: () => router.push("/"),
            })
          );
        }
      })
      .catch((err) => {
        setErrCode(err?.response?.data?.code);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setErrCode(0);
  }, [watch("oldPassword"), watch("newPassword"), watch("confirmNewPassword")]);

  return (
    <div className="w-full max-w-screen-xl flex">
      <div className="w-full">
        <div className="border-b border-[#E5E5E5] ">
          <div className="text-2xl text-[#182537] font-semibold">
            <span>Đổi mật khẩu</span>
          </div>
          <p className="text-base my-2 text-[#515151]">
            Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác!
          </p>
        </div>
        <div className="md:w-[calc(425px)] mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputPassword
              register={register("oldPassword")}
              placeholder="Mật khẩu cũ"
              label="Mật khẩu cũ(*)"
              error={errors?.oldPassword}
              className="my-2"
            />
            <InputPassword
              register={register("newPassword")}
              placeholder="Mật khẩu mới"
              label="Mật khẩu mới(*)"
              error={errors?.newPassword}
              className="my-2"
            />
            <InputPassword
              register={register("confirmNewPassword")}
              placeholder="Xác nhập mật khẩu mới"
              label="Xác nhập mật khẩu mới(*)"
              error={errors?.confirmNewPassword}
              className="my-2"
            />
            <p className="text-base my-4">
              Hành động này sẽ đăng xuất khỏi Fcard. Bạn chắc chắn muốn lưu thay
              đổi?
            </p>
            {errCode < 0 && <ErrorMessage code={errCode} className="mt-4" />}
            <input
              className={`rounded w-full cursor-pointer text-base text-[#ffffff] bg-[#f79636] uppercase hover:bg-[#ec8200] focus:bg-[#ec8200] focus:outline-none p-3 focus:shadow-outline font-bold ${
                !isValid || loading ? "opacity-30" : ""
              }`}
              type="submit"
              value={loading ? "Đang xử lý" : "Lưu thay đổi"}
              disabled={!isValid || loading}
            />
          </form>
          <div className="text-center mt-3">
            <Link href="/quen-mat-khau">
              <a className="text-[#3079DB] text-base hover:text-[#215caa]">
                Quên mật khẩu?
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordContainer;
