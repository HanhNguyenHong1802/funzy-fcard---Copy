import { dateTimeFormat, formatCurrency } from "@/utils/index";
import React from "react";

type CardPrintDetailProps = {
  data: any;
  typePrint: string;
  index: number;
  print?: boolean;
};
const CardPrintDetail = ({
  data,
  typePrint,
  index,
  print,
}: CardPrintDetailProps) => {
  return (
    <div
      className={`${
        typePrint === "A4"
          ? print
            ? "float-left mx-3 my-7 w-[30%]"
            : ""
          : print
          ? "mx-auto mb-16 w-[33%]"
          : "min-w-[330px] w-[33%] mx-auto"
      }`}
    >
      <div className="border border-gray-200 w-full">
        <p className="p-2 uppercase text-sm">
          STT: <span className="text-[#3079DB] font-bold">{index + 1}</span>
        </p>
        <p className="p-2 uppercase text-sm bg-[#EEF1F6]">
          Loại thẻ:{" "}
          <span className="text-[#3079DB] font-bold">{data.categoryName}</span>
        </p>
        <p className="p-2 uppercase text-sm">
          Mệnh giá:{" "}
          <span className="text-[#3079DB] font-bold">
            {formatCurrency(data.value)} VND
          </span>
        </p>
        <p className="p-2 uppercase text-sm bg-[#EEF1F6]">
          Số serial:{" "}
          <span className="text-[#3079DB] font-bold">{data.serial}</span>
        </p>
        <p className="p-2 uppercase text-sm">
          Mã nạp: <span className="text-[#3079DB] font-bold">{data.code}</span>
        </p>
        <p className="p-2 uppercase text-sm bg-[#EEF1F6]">
          Mã giao dịch:{" "}
          <span className="text-[#3079DB] font-bold">{data.exportOrderID}</span>
        </p>
        <p className="p-2 uppercase text-sm">
          HSD:{" "}
          <span className="text-[#3079DB] font-bold">
            {dateTimeFormat(data.expriredDate)}
          </span>
        </p>
        <p className="p-2 uppercase text-sm bg-[#EEF1F6]">
          Hỗ trợ: <span className="text-[#3079DB] font-bold">1900636919</span>
        </p>
      </div>
    </div>
  );
};

export default CardPrintDetail;
