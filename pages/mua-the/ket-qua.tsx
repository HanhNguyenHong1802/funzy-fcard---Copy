import { ERROR_CODE } from "@/constants/errorCode";
import { useAppSelector } from "@/redux/hooks";
import { selectUserInfo } from "@/redux/userSlice";
import paymentAPI from "@/services/payment";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const { orderid, status } = router.query;
  const user = useAppSelector(selectUserInfo);
  useEffect(() => {
    if (!orderid || !status) return;
    const delay = setTimeout(() => {
      if (user) {
        if (status === "1") {
          router.push(
            `/mua-the/lich-su-mua-the?orderid=${orderid}&status=${status}`
          );
        } else {
          toastError(
            "Giao dịch không thành công hoặc đã bị huỷ. Vui lòng thử lại sau !"
          );
          router.push("/mua-the");
        }
      } else {
        if (status === "1") {
          toastSuccess(
            "Mua thẻ thành công vui lòng kiểm tra SĐT hoặc Email. Nếu không nhận được vui lòng liên hệ bộ phần chăm sóc khách hàng.",
            {},
            4000
          );
          paymentAPI
            .getCards({
              OrderId: parseInt(orderid + ""),
            })
            .then((res) => {
              if (res?.data?.code >= 0) {
                if (res?.data?.data.length <= 0) {
                  toastError("Giao dịch không tồn tại");
                  router.push("/");
                  return;
                }
              }
            })
            .catch((err) => {
              const { status } = err.response;
              if (status === 401) {
                toastError("Bạn chưa đăng nhập.");
                router.push("/");
                return;
              }
              toastError(ERROR_CODE[err?.response?.data?.code]);
              router.push("/");
            });
        } else {
          toastError(
            "Giao dịch không thành công hoặc đã bị huỷ. Vui lòng thử lại sau !"
          );
        }
        router.push("/mua-the");
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [orderid, status, router, user]);

  return (
    <div className="container mx-auto max-w-screen-xl relative min-h-[90vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin h-12 w-12 border-4 rounded-[50%] border-[#e0e0e0da] border-t-4 border-t-[#F89736] mx-auto" />
        <h1 className="text-center mt-3 text-xl font-medium">
          Giao dịch đang được xử lý vui lòng đợi trong giây lát
        </h1>
      </div>
    </div>
  );
};

export default Callback;
