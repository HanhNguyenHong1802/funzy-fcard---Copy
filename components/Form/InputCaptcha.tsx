import React, { memo, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
import Image from "next/image";
import authenticationAPI from "@/services/authentication";

interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object;
  className?: string;
  label?: string;
  error: FieldError | undefined;
  children?: any;
  classNameInput?: string;
  resetCaptcha?: boolean;
}

const InputCaptcha = ({
  register,
  error,
  label,
  className,
  classNameInput,
  children,
  resetCaptcha,
  ...rest
}: InputTextProps) => {
  const [captcha, setCaptcha] = useState<any>("");
  const getRefreshCaptcha = () => {
    authenticationAPI
      .getCaptcha()
      .then((res) => {
        setCaptcha(`data:image/png;base64,${res?.data}`);
      })
      .catch(() => {
        getRefreshCaptcha();
      });
  };

  useEffect(() => {
    getRefreshCaptcha();
  }, [resetCaptcha]);

  return (
    <div className={className ? className : ""}>
      <div className="flex justify-between">
        {label && (
          <label className="block text-gray-700 text-md font-medium mb-2">
            {label}
          </label>
        )}
        <Image
          src="/icons/icon-refresh.svg"
          width={25}
          height={25}
          alt="refresh"
          className="cursor-pointer"
          onClick={() => getRefreshCaptcha()}
        />
      </div>
      <div className="flex items-start">
        <input
          {...register}
          {...rest}
          className={`appearance-none rounded w-1/2 sm:w-2/3 p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            classNameInput ? classNameInput : ``
          } ${error ? ` bg-[#FFF4E7]` : ` bg-[#EEF1F6]`}`}
          type="text"
        />
        <div className="w-1/2 h-[44px] ml-1 text-center">
          <Image
            src={captcha || "/images/captcha.jpg"}
            width={150}
            height={44}
            alt="captcha"
          />
        </div>
      </div>
      {error && <span className="text-red-500 text-sm">{error?.message}</span>}
    </div>
  );
};

export default memo(InputCaptcha);
