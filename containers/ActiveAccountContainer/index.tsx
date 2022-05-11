import React, { useEffect, useState } from "react";
import InputOTP from "@/components/Form/InputOTP";
import useCountDown from "../../hooks/useCountDown";
import { useRouter } from "next/router";
import authenticationAPI from "@/services/authentication";
import { toastSuccess } from "@/utils/toast";
import ErrorMessage from "@/components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { activeAccount, selectUserInfo } from "@/redux/userSlice";
import { selectNetwork } from "@/redux/networkSlice";

const ActiveAccountContainer = () => {
  const [otp, setOtp] = useState<string>("");
  const [duringOTP, setDuringOTP] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errCode, setErrCode] = useState<Number | null>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const phone = router.query.phone;
  const user = useAppSelector(selectUserInfo);
  const network = useAppSelector(selectNetwork);
  const coutdown = useCountDown(
    90,
    duringOTP,
    setDuringOTP,
    `ACTIVE_ACCOUNT_OTP_${phone}`
  );
  const isFirst = router.query.type === "first";
  useEffect(() => {
    if (user) {
      router.push("/");
      return;
    }
    if (!isFirst && phone) {
      resendOTP();
    }
  }, [router.query, user]);

  const resendOTP = () => {
    if (!network) {
      setErrCode(-900001);
      return;
    }
    setErrCode(null);
    if (!duringOTP) {
      authenticationAPI
        .resendOTP({ Username: String(router.query.phone) })
        .then((res) => {
          if (res?.data?.code >= 0) {
            toastSuccess("Gửi mã OTP thành công !");
            setErrCode(null);
          }
        })
        .catch((error) => {
          setErrCode(error.response.data.code);
        });
      setDuringOTP(true);
    }
  };
  const handleActiveAccount = () => {
    if (!network) {
      setErrCode(-900001);
      return;
    }
    setErrCode(null);
    if (otp.length !== 6 || loading) {
      return;
    }
    setLoading(true);
    const params = {
      Username: String(phone),
      OTP: otp,
      callbackSuccess: (user: any) => {
        toastSuccess("Kích hoạt tài khoản thành công !");
        setOtp("");
        router.push({ pathname: "/" });
      },
      callbackError: (code: any) => {
        setErrCode(code);
        setLoading(false);
      },
    };
    dispatch(activeAccount(params));
  };
  return (
    <div className="container mx-auto flex items-center p-5 lg:p-0 mt-[52px] min-h-[90vh]">
      <div className="bg-white w-full max-w-screen-sm mx-auto my-auto border">
        <h1 className="py-5 bg-blue-600 font-semibold text-xl leading-6 text-white text-center uppercase">
          Nhập mã xác minh
        </h1>
        {errCode && <ErrorMessage className="mx-2" code={errCode} />}
        <p className="text-center my-4">
          Mã xác minh đã được gửi qua số điện thoại{" "}
          <span className="text-blue-600">{phone}</span> của quý khách
        </p>
        <div className="flex flex-col items-center justify-center">
          <InputOTP
            value={otp}
            onChange={(value: any) => setOtp(value)}
            inputStyle={"h-9 !w-9 sm:h-12 sm:!w-12"}
            className="mt-5"
          />
          <button
            type="submit"
            onClick={() => handleActiveAccount()}
            className={`w-2/3 mt-6 mx-auto py-4 bg-orange-500 font-semibold text-base leading-6 text-white text-center uppercase rounded cursor-pointer ${
              otp.length === 6 || loading ? "" : "opacity-50"
            }`}
          >
            {loading ? "Đang gửi ..." : "Xác nhận"}
          </button>
          <button
            className={`text-blue-600 my-4 font-medium`}
            onClick={() => resendOTP()}
          >
            <span className={`${duringOTP ? "opacity-30" : ""}`}>
              Gửi lại mã OTP{" "}
            </span>
            {duringOTP ? `(${coutdown} giây)` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveAccountContainer;
