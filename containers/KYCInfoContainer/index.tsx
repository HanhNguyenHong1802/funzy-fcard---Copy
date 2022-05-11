import { useRouter } from "next/router";
import React from "react";
import KYCDiscountPolicy from "./KYCDiscountPolicy";
import KYCUploadImage from "./KYCUploadImage";
import KYCVerifyState from "./KYCVerifyState";

const KYCInfoContainer = () => {
  const router = useRouter();
  const step = router?.query?.step;
  return (
    <>
      <div
        className="items-center w-full container mt-20 max-w-screen-md mx-auto"
        style={{ minHeight: "calc(100vh - 52px)" }}
      >
        {step === "1" && (
          <div className=" mx-2 md:mx-0 ">
            <KYCDiscountPolicy />

            <button
              className="bg-[#f89736] w-full rounded text-white pt-2 pb-3 font-bold uppercase text-lg mb-10 mt-5 h-11"
              onClick={() => router.push("/xac-thuc-tai-khoan?step=2")}
            >
              Tiếp tục
            </button>
          </div>
        )}
        {step === "2" && (
          <div className=" mx-2 md:mx-0 ">
            <KYCUploadImage />
          </div>
        )}
        {step === "3" && (
          <div className=" mx-2 md:mx-0 ">
            <KYCVerifyState />
          </div>
        )}
      </div>
    </>
  );
};
export default KYCInfoContainer;
