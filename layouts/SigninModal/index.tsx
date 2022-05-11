import ErrorMessage from "@/components/ErrorMessage";
import InputPassword from "@/components/Form/InputPassword";
import InputText from "@/components/Form/InputText";
import Modal from "@/components/Modal";
import { validatePassword, validatePhone } from "@/constants/validate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModalSignin, selectShowSignin } from "@/redux/modalSlice";
import { signinThunk } from "@/redux/userSlice";
import { toastSuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    phone: validatePhone,
    password: validatePassword,
  })
  .required();

type FormInputs = {
  phone: string;
  password: string;
};

const SigninModal = () => {
  const openModal = useAppSelector(selectShowSignin);
  const dispatch = useAppDispatch();
  const [errCode, setErrCode] = useState<Number>(0);
  const router = useRouter();

  const handleCloseModal = () => {
    dispatch(closeModalSignin());
    setErrCode(0);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    const signInParams = {
      Username: data.phone,
      Password: data.password,
      callbackSuccess: () => {
        toastSuccess("Đăng nhập thành công", {}, 2000);
        handleCloseModal();
        router.push("/");
      },
      callbackError: (code: Number) => {
        setErrCode(code);
        if (code === -49) {
          handleCloseModal();
          router.push(`/kich-hoat-tai-khoan/${data.phone}`);
        }
      },
    };
    dispatch(signinThunk(signInParams));
  };

  const handleClick = (e: any, link = "") => {
    e.preventDefault();
    dispatch(closeModalSignin());
    router.push(link);
  };

  return (
    <>
      <Modal open={openModal} handleClose={handleCloseModal} center>
        <div className="bg-white w-full max-w-md mx-auto my-10 relative">
          <button
            className="absolute -top-8 right-0 text-white"
            onClick={() => handleCloseModal()}
          >
            Đóng
          </button>
          <h1 className="py-5 bg-blue-600 font-semibold text-xl leading-6 text-white text-center uppercase">
            Đăng nhập
          </h1>
          <form
            className="p-8 border border-slate-400"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              register={register("phone", {
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setValue("phone", value);
                },
              })}
              placeholder="Số điện thoại"
              label="Số điện thoại(*)"
              error={errors.phone}
              className="mb-3.5"
            />
            <InputPassword
              register={register("password")}
              placeholder="Mật khẩu"
              label="Mật khẩu(*)"
              error={errors.password}
              className="mb-3.5"
            />
            <div className="flex justify-end mb-3.5">
              <a
                href="/quen-mat-khau"
                className="text-blue-500"
                onClick={(e) => handleClick(e, "/quen-mat-khau")}
              >
                Quên mật khẩu
              </a>
            </div>
            {errCode < 0 && <ErrorMessage code={errCode} />}

            <input
              disabled={!isValid}
              type="submit"
              value="Đăng nhập"
              className={`w-full mb-3.5 py-4 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer ${
                !isValid ? "opacity-30" : ""
              }`}
            />
            <p className="text-center text-sm">
              Bạn chưa có tài khoản?{" "}
              <a
                href="/dang-ky"
                className="text-blue-500"
                onClick={(e) => handleClick(e, "/dang-ky")}
              >
                Đăng ký
              </a>
            </p>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SigninModal;
