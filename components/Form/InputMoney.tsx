import React, { memo } from "react";
import { FieldError } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";

interface InputMoneyProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className?: string;
  label?: string;
  error: FieldError | undefined;
  currency?: string;
  currencyPos?: string;
  classNameInput?: string;
  onChange: any;
  placeholder?: string;
}

const InputMoney = ({
  name,
  error,
  label,
  className,
  classNameInput,
  currency = "VND",
  currencyPos = "right",
  onChange,
  placeholder,
}: InputMoneyProps) => {
  return (
    <div className={className ? className : ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <CurrencyInput
          placeholder={placeholder}
          onValueChange={onChange}
          step={1}
          className={`appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
            ${classNameInput ? classNameInput : ``} 
            ${currencyPos === "right" ? `pr-12` : `pl-12`} 
            ${error ? `bg-[#FFF4E7]` : ` bg-[#EEF1F6]`}`}
        />
        <span
          className={`absolute top-0 p-2.5 ${
            currencyPos === "right" ? "right-0" : "left-0"
          }`}
        >
          {currency}
        </span>
      </div>
      {error && <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>}
    </div>
  );
};

export default memo(InputMoney);
