import React, { useState } from "react";
import { FieldError } from "react-hook-form";

interface InputPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object;
  className?: string;
  label?: string;
  error: FieldError | undefined;
  classNameInput?: string;
}

const InputPassword = ({
  register,
  error,
  className,
  classNameInput,
  label,
  ...rest
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
          className={`appearance-none rounded w-full p-3 pr-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            classNameInput ? classNameInput : ``
          } ${error ? `bg-[#FFF4E7]` : ` bg-[#EEF1F6]`}`}
          type={showPassword ? `text` : `password`}
        />
        <img
          src={
            showPassword ? `/icons/icon-eye-close.svg` : `/icons/icon-eye.svg`
          }
          className="absolute right-0 p-2 top-0 text-red-500"
          width={45}
          height={45}
          alt="icon-eye"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      {error && <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>}
    </div>
  );
};

export default InputPassword;
