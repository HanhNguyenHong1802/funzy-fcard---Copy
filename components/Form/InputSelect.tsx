import Image from "next/image";
import React, { memo } from "react";
import { FieldError } from "react-hook-form";

interface InputSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object;
  className?: string;
  label?: string;
  error?: FieldError | undefined;
  options?: Array<any> | undefined;
  placeholder: string;
  classNameInput?: string;
}

const InputSelect = ({
  register,
  error,
  label,
  className,
  classNameInput,
  options,
  placeholder,
}: InputSelectProps) => {
  return (
    <div className={className || ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          {...register}
          className={`w-full focus:outline-none appearance-none focus:shadow-outline rounded border px-3 pr-8 bg-[#ffffff] h-11 my-2 ${
            classNameInput ? classNameInput : ``
          }`}
          defaultValue=""
        >
          {placeholder && (
            <option value={""} disabled>
              {placeholder}
            </option>
          )}
          {options?.map((item, inx) => (
            <option value={item?.value} key={inx}>
              {item?.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-6 right-0 flex items-center px-2 text-gray-700">
          <Image src="/icons/icon-arrows-down.svg" width={15} height={15} />
        </div>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error?.message}</p>}
    </div>
  );
};
export default memo(InputSelect);
