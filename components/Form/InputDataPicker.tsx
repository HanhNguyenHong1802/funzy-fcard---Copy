import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);
interface InputDataPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: string;
  classNameInput?: string;
  onChange?: any;
  value?: Date;
  placeholder?: string;
}
const convertLocalToUTCDate = (date: Date) => {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return date;
};
const InputDataPicker = ({
  className,
  value,
  onChange,
  placeholder,
  classNameInput,
}: InputDataPickerProps) => {
  return (
    <div
      className={`flex justify-center item-center w-full relative ${
        className ? className : ``
      }`}
    >
      <DatePicker
        locale="vi"
        className={`input cursor-pointer rounded p-3 pr-7 text-sm font-normal border border-[##E5E5E5] bg-[#ffffff] focus:shadow-outline focus:outline-none w-full ${
          classNameInput ? classNameInput : ""
        }`}
        placeholderText={placeholder}
        onChange={(date: Date) => onChange(convertLocalToUTCDate(date))}
        selected={value}
        dateFormat="dd/MM/yyyy"
      />
      {value && (
        <div
          className="absolute bg-gray-500 opacity-30 h-[18px] w-[18px] m-auto inset-y-0 right-8 flex items-center rounded-full hover:opacity-100"
          onClick={() => onChange("")}
        >
          <Image
            src="/icons/icon-close-white.svg"
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      )}
      <div className="pointer-events-none cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Image src="/icons/icon-calendar.svg" width={15} height={15} />
      </div>
    </div>
  );
};

export default InputDataPicker;
