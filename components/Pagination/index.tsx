import Image from "next/image";
import React from "react";
import usePagination from "./usePagination";

/**
 * Pagination
 * @return {JSX.Element} The JSX Code for the Pagination
 */

type PaginationProps = {
  onChange: Function;
  onChangePageSize: Function;
  totalPage: number;
  currentPage: number;
  pageSize: number;
  totalRows: number;
  className: string;
} & typeof defaultProps;

const defaultProps = {
  totalPage: 0,
  currentPage: 0,
  pageSize: 10,
  className: "",
};

const optionPageSize = [10, 20, 25, 30];

const Pagination = ({
  onChange,
  totalPage,
  currentPage,
  onChangePageSize,
  pageSize,
  totalRows,
  className,
}: PaginationProps) => {
  const optionNumber = usePagination({ totalPage, currentPage });

  const handleChangePageNumber = (value: any, type: any) => {
    onChange && onChange(value);
  };
  const handleChangePageSize = (value: any) => {
    onChangePageSize && onChangePageSize(value);
  };

  const handleClickButtonPagination = (type: string) => {
    let number = currentPage - 1;
    if (type === "next") {
      number = currentPage + 1;
    }
    onChange && onChange(number);
  };
  return (
    <div
      className={`grid grid-rows-2 gap-3 md:flex md:items-center md:justify-between ${className}`}
    >
      <div className="flex items-center font-semibold m-auto md:m-0 justify-center flex-wrap">
        <div className="relative w-18 mx-3 flex items-center">
          <p className="min-w-[70px]">Hiển thị</p>
          <select
            onChange={(e: any) => handleChangePageSize(e.target.value)}
            className="cursor-pointer shadow block appearance-none w-full border border-gray-200 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none"
            defaultValue={pageSize}
          >
            {optionPageSize.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Image src="/icons/icon-arrows-down.svg" width={15} height={15} />
          </div>
        </div>
        <p>
          Kết quả từ{" "}
          <span className="text-[#F89736]">
            {" "}
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          đến{" "}
          <span className="text-[#F89736]">
            {" "}
            {currentPage * pageSize > totalRows
              ? totalRows
              : currentPage * pageSize}
          </span>{" "}
          trên tổng <span className="text-[#F89736]"> {totalRows}</span>
        </p>
      </div>

      <div className="flex gap-2 m-auto md:m-0">
        <div
          className={`cursor-pointer w-7 h-7 rounded-md bg-[#F3F3F3] p-[2px] text-black text-center hover:bg-[#F89736] ${
            currentPage === 1 && "hidden"
          } `}
          onClick={() => handleClickButtonPagination("prev")}
        >
          <Image src="/icons/icon-chevron-left.svg" width={24} height={24} />
        </div>

        {optionNumber.map((x, index) => {
          if (x === "DOTS") {
            return <p key={index}>...</p>;
          }
          return (
            <p
              key={index}
              onClick={() => handleChangePageNumber(x, "")}
              className={`cursor-pointer w-7 h-7 rounded-md bg-[#F3F3F3] p-[2px] text-black text-center hover:bg-[#F89736] hover:text-white 
              ${x === currentPage && "!bg-[#F89736] !text-white"}`}
            >
              {x}
            </p>
          );
        })}
        <div
          className={`cursor-pointer w-7 h-7 rounded-md bg-[#F3F3F3] p-[2px] text-black text-center hover:bg-[#F89736] ${
            currentPage === totalPage && "hidden"
          }`}
          onClick={() => handleClickButtonPagination("next")}
        >
          <Image src="/icons/icon-chevron-right.svg" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
Pagination.defaultProps = defaultProps;
export default Pagination;
