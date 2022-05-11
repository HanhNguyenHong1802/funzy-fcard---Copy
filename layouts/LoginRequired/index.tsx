import { useAppDispatch } from "@/redux/hooks";
import { openModalSignin } from "@/redux/modalSlice";
import React from "react";

const LoginRequired = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex min-h-[95vh] mt-[52px]">
      <div className="w-5/6 lg:w-4/6 max-w-lg rounded-md shadow border p-4 m-auto flex flex-col gap-3 justify-center items-center">
        <p className="font-semibold text-lg text-center">
          Bạn cần đăng nhập vào tài khoản
          <span className="text-blue-500"> F365.com.vn </span> của mình để sử
          dụng tính năng này
        </p>
        <button
          className="h-10 p-2 rounded bg-[#F89736] text-white font-semibold"
          onClick={() => dispatch(openModalSignin())}
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default LoginRequired;
