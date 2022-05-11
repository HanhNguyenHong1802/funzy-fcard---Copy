import React, { memo } from "react";
import { FieldError } from "react-hook-form";

type InputTextProps = {
  register?: object;
  className?: string;
  label?: string;
  error?: FieldError | undefined;
  children?: any;
  classNameInput?: string;
};

const InputTextArea = ({
  register,
  error,
  label,
  className,
  classNameInput,
  children,
  ...rest
}: InputTextProps) => {
  return (
    <div className={className ? className : ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative h-full w-full">
        <textarea
          {...register}
          {...rest}
          className={`appearance-none rounded w-full h-full resize-none p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            classNameInput ? classNameInput : ``
          } ${error ? ` bg-[#FFF4E7]` : ` bg-[#EEF1F6]`}`}
        />
        {children}
      </div>
      {error && <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>}
    </div>
  );
};

export default memo(InputTextArea);
