import Failed from "@/components/BuyCardResult/Failed";
import Success from "@/components/BuyCardResult/Success";
import Feature from "@/components/Feature";
import Loading from "@/components/Loading";
import { ERROR_CODE } from "@/constants/errorCode";
import paymentAPI from "@/services/payment";
import { toastError } from "@/utils/toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BuyCardResultContainer = () => {
  const router = useRouter();
  const { orderid, status } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!orderid || !status) {
      return;
    }
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
          setData(res?.data?.data);
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
      })
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, [orderid, status]);

  return (
    <div className="mt-[52px] w-full">
      <Feature disableTitle={true} distableDesc={true} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {status === "1" && data?.length > 0 ? (
            <Success data={data} />
          ) : (
            <Failed data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default BuyCardResultContainer;
