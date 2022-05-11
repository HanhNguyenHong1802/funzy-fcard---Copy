import paymentAPI from "@/services/payment";
import { dateTimeFormat, formatCurrency } from "@/utils/index";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import React from "react";
import Copy from "../Copy";
import { SelectorInput } from "../FilterInput";
/**
 * DataTable
 * @return {JSX.Element} The JSX Code for the DataTable
 */

type DataTableStoreCardProps = {
  className?: string;
  data?: Array<{
    [key: string]: any;
  }>;
  pageCurrent: number;
  pageSize: number;
  showInfo: boolean;
  selected: Array<any>;
  onSelectRow: Function;
  handlePrintOne: Function;
} & typeof defaultProps;

const defaultProps = {
  className: "",
  data: [],
  showInfo: false,
};
const DataTableStoreCard = ({
  className,
  data,
  pageCurrent,
  pageSize,
  showInfo,
  selected,
  onSelectRow,
  handlePrintOne,
}: DataTableStoreCardProps) => {
  const handleClickCard = (id: any) => {
    let listID = [...selected];
    if (selected.includes(id)) {
      listID = selected.filter((x) => x !== id);
    } else {
      listID.push(id);
    }
    onSelectRow(listID);
  };
  const handleChangeStatusCard = (
    id: number,
    exportOrderID: number,
    type: number
  ) => {
    paymentAPI
      .updateStatusCard({
        ProductItemID: id,
        ExportOrderID: exportOrderID,
        Status: type == 1 ? 1 : 0,
      })
      .then((res) => {
        if (res?.data?.code === 0) {
          toastSuccess(`Cập nhật trạng thái thẻ thành công`);
        }
      })
      .catch(() => toastError(`Cập nhật trạng thái thẻ thất bại`));
  };
  const formatCode = (value: string) => {
    const format = value.slice(0, 3) + "***" + value.slice(-3);
    return format;
  };
  return (
    <table className={`w-full mt-2 border border-gray-200 shadow ${className}`}>
      <thead>
        <tr className="bg-[#3079DB] h-10 text-white font-semibold text-md">
          <th className="min-w-[70px]">STT</th>
          <th className="min-w-[120px]">Mã giao dịch</th>
          <th className="min-w-[120px]">Mệnh giá</th>
          <th className="min-w-[150px]">Loại sản phẩm</th>
          <th className="min-w-[150px]">Mã thẻ</th>
          <th className="min-w-[120px]">Số serial</th>
          <th className="min-w-[120px]">Trạng thái</th>
          <th className="min-w-[200px]">Thời gian khởi tạo</th>
          <th className="min-w-[200px]">Hạn sử dụng</th>
          <th className="min-w-[120px]">Thao tác</th>
        </tr>
      </thead>
      <tbody className="text-center font-semibold">
        {data.map((card, index) => (
          <tr key={card.productItemID}>
            <td className="flex justify-center items-center gap-2">
              <div
                className="w-6 h-6 border border-gray-200 rounded cursor-pointer relative hover:border-green-500"
                onClick={() => handleClickCard(card.productItemID)}
              >
                <span
                  className={`hidden absolute top-0 bottom-0 right-0 left-0 m-auto ${
                    selected.includes(card.productItemID) ? "!block" : ""
                  }`}
                >
                  <Image src="/icons/icon-checked.svg" width={16} height={16} />
                </span>
              </div>
              {index + 1 + (pageCurrent - 1) * pageSize}
            </td>
            <td>{card.exportOrderID}</td>
            <td className="text-[#F89736]">{formatCurrency(card.value)}đ</td>
            <td>{card.categoryName}</td>
            <td>
              {showInfo
                ? card.code
                : formatCode(card.code.replaceAll(/\,/gi, ""))}
            </td>
            <td>{showInfo ? card.serial : formatCode(card.serial)}</td>
            <td className="py-1">
              <SelectorInput
                onChange={(type: any) =>
                  handleChangeStatusCard(
                    card.productItemID,
                    card.exportOrderID,
                    type
                  )
                }
                options={[
                  { id: 1, title: "Đã bán", className: "text-red-500" },
                  { id: 2, title: "Chưa bán", className: "text-green-500" },
                ]}
                selectedID={card.status ? 1 : 2}
              />
            </td>
            <td>{dateTimeFormat(card.exportDate)}</td>
            <td>{dateTimeFormat(card.expriredDate)}</td>
            <td className="flex justify-around p-4">
              <Copy value={card.serial} className="" />
              <Image
                onClick={() => handlePrintOne(card)}
                src="/icons/icon-print.svg"
                className="cursor-pointer"
                width={15}
                height={18}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
DataTableStoreCard.defaultProps = defaultProps;
export default DataTableStoreCard;
