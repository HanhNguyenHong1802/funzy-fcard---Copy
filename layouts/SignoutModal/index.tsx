import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModalSignout, selectShowSignout } from "@/redux/modalSlice";
import { signoutThunk } from "@/redux/userSlice";
import { useRouter } from "next/router";
import React from "react";

const SignoutModal = () => {
  const openModal = useAppSelector(selectShowSignout);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
      <Modal
        center
        open={openModal}
        handleClose={() => dispatch(closeModalSignout())}
      >
        <div className="bg-white w-full max-w-md mx-auto my-10 p-12">
          <h3 className="text-2xl text-center mb-2.5">Xác nhận đăng xuất</h3>
          <p className="text-lg text-center mb-5">
            Bạn chắc chắn muốn đăng xuất khỏi tài khoản?{" "}
          </p>
          <div className="flex justify-center items-center">
            <button
              className="mb-3.5 mr-2 py-4 px-12 bg-slate-400 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer"
              onClick={() => dispatch(closeModalSignout())}
            >
              Huỷ
            </button>
            <button
              className="mb-3.5 py-4 px-12 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer"
              onClick={() => {
                dispatch(closeModalSignout());
                dispatch(
                  signoutThunk({
                    callbackSuccess: () => router.push("/"),
                  })
                );
              }}
            >
              Đúng vậy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignoutModal;
