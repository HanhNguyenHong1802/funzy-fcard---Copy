import React, { memo } from "react";
import { FieldError } from "react-hook-form";

interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object;
  className?: string;
  label?: string;
  error: FieldError | undefined;
  children?: any;
  classNameInput?: string;
  disabled?: boolean;
}

const InputText = ({
  register,
  error,
  label,
  className,
  classNameInput,
  children,
  disabled = false,
  ...rest
}: InputTextProps) => {
  return (
    <div className={className ? className : ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register}
          {...rest}
          className={`appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            classNameInput ? classNameInput : ``
          } ${error ? ` bg-[#FFF4E7]` : ` bg-[#EEF1F6]`}`}
          type="text"
          disabled={disabled}
        />
        {children}
      </div>
      {error && <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>}
    </div>
  );
};

export default memo(InputText);
