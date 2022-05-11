import { useAppSelector } from "@/redux/hooks";
import { selectUserInfo } from "@/redux/userSlice";
import paymentAPI from "@/services/payment";
import { formatCurrency, timeDateFormat } from "@/utils/index";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Copy from "../Copy";
type SuccessProps = {
  data: Array<any>;
};

const Success = ({ data }: SuccessProps) => {
  const user = useAppSelector(selectUserInfo);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(user?.accountType === 2) || !data?.[0]) return;
    paymentAPI
      .getCardDetail({
        CategoryId: data?.[0]?.categoryID,
        ProductId: data?.[0]?.productID,
      })
      .then((res) => {
        if (res?.data?.code >= 0 && res?.data?.data?.length > 0) {
          setRate(res?.data?.data?.[0].discountRate);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, data?.[0]]);

  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="w-full max-w-xl mx-auto bg-[#ffffff] h-fit my-10">
        <div className="p-3 mx-4 border border-[#E5E5E5]">
          <div className="text-center mb-2">
            <Image
              src="/icons/icon-tick.svg"
              width={38}
              height={40}
              alt="success"
              className="inline"
            />
            <p className="text-[#32C36A] text-xl font-semibold">Thành công</p>
            {user && user?.accountType === 2 && !loading && (
              <h1 className="font-semibold text-2xl my-2">
                -{" "}
                {data.length > 0 &&
                  formatCurrency(
                    (data?.[0]?.value * data?.length * (100 - rate)) / 100
                  )}
                đ
              </h1>
            )}
          </div>
          <div>
            <div className="text-center w-full bg-[#EEF1F6] py-2 ">
              <span className="text-[#182537] text-lg font-semibold">
                Mã giao dịch
              </span>
              <h4 className="text-[#182537] text-lg font-semibold">
                {data?.[0]?.exportOrderID}
              </h4>
            </div>
            <div className="mb-4 mt-1">
              <ul>
                <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                  <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                    Thời gian thanh toán
                  </span>
                  <span className="text-[#F89736] font-semibold text-base">
                    {timeDateFormat(data?.[0]?.exportDate)}
                  </span>
                </li>
                <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                  <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                    Hạn sử dụng
                  </span>
                  <span className="text-[#F89736] font-semibold text-base">
                    {timeDateFormat(data?.[0]?.expriredDate)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="text-center w-full bg-[#EEF1F6] py-2 mt-4">
              <h4 className="uppercase text-[#182537] text-lg font-semibold">
                Thông tin đơn hàng
              </h4>
            </div>
            <ul>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Loại thẻ
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {data?.[0]?.categoryName}
                </span>
              </li>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Số lượng
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {data?.length}
                </span>
              </li>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Mệnh giá
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {formatCurrency(data?.[0]?.value) + "đ"}
                </span>
              </li>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Tống số tiền
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {formatCurrency(data?.[0]?.value * data?.length) + "đ"}
                </span>
              </li>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Chiết khấu
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {rate + "%"}
                </span>
              </li>
              <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                  Số tiền thanh toán
                </span>
                <span className="text-[#F89736] font-semibold text-base">
                  {formatCurrency(
                    (data?.[0]?.value * data?.length * (100 - rate)) / 100
                  )}
                  đ
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-center w-full bg-[#EEF1F6] py-2 mt-4">
              <h4 className="uppercase text-[#182537] text-lg font-semibold">
                Danh sách thẻ
              </h4>
            </div>
            <div>
              <ul>
                <li className="flex border-b border-[#E0E0E0] py-2">
                  <span className="w-1/12 text-[#182537] text-sm mr-2 font-medium">
                    STT
                  </span>
                  <span className="w-7/12 text-[#182537] text-sm mr-2 font-medium">
                    Series/Mã thẻ
                  </span>
                  <span className="w-4/12 text-[#182537] text-sm mr-2 text-center font-medium">
                    Hạn dùng
                  </span>
                </li>
              </ul>
              <ul className="max-h-[calc(200px)] overflow-y-auto custom-width-scroll-bar">
                {data?.map((item: any, index: number) => (
                  <li
                    className="flex border-b border-[#E0E0E0] py-2 items-center overflow-hidden"
                    key={item?.productItemID}
                  >
                    <p className="w-1/12 text-[#F89736] text-sm mr-2">
                      {index + 1}
                    </p>
                    <div className="w-7/12 text-[#182537] text-sm mr-2">
                      <p className="text-[#717171] text-[14px]">
                        {item?.serial}
                      </p>
                      <div className="font-semibold inline-block">
                        Mã:{" "}
                        <div className="text-[#F8462E] font-semibold inline-block">
                          {item?.code}
                          <Copy
                            value={item?.code}
                            className="relative top-[3px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-4/12 text-[#182537] text-sm mr-2 text-center">
                      {timeDateFormat(data?.[0]?.expriredDate)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-center w-full bg-[#EEF1F6] py-2 mt-4">
                <h4 className="uppercase text-[#182537] text-lg font-semibold">
                  Liên hệ hỗ trợ
                </h4>
              </div>
              <ul>
                <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                  <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                    Email
                  </span>
                  <span className="text-[#F89736] font-semibold text-base">
                    hotro@funzy.vn
                  </span>
                </li>
                <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                  <span className="text-[#182537] text-sm mr-2 w-[calc(100px)] md:w-60">
                    Hotline
                  </span>
                  <span className="text-[#F89736] font-semibold text-base">
                    1900636919
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <a className="w-full mt-5 block text-center rounded cursor-pointer text-base text-[#ffffff] bg-[#f79636] uppercase hover:bg-[#ec8200] focus:outline-none p-2 focus:shadow-outline font-bold">
              Về trang chủ
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
