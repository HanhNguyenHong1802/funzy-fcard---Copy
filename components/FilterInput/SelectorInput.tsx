import Image from "next/image";
import React, { useState } from "react";

/**
 * Selector Input
 * @return {JSX.Element} The JSX Code for the Selector Input
 */

type SelectorProps = {
  onChange: Function;
  placeholder: string;
  options: Array<any>;
  selectedID: number;
  disabled: boolean;
  value?: any;
} & typeof defaultProps;

const defaultProps = {
  selectedID: 0,
  placeholder: "",
  disabled: false,
};

const SelectorInput = ({
  onChange,
  placeholder,
  options,
  selectedID,
  disabled,
  value,
}: SelectorProps) => {
  const defaultClassTitle =
    options.find((x) => x.id === selectedID)?.className || "";
  const [classTitle, setClassTitle] = useState<string>(defaultClassTitle);

  const handleOnChange = (e: any) => {
    onChange && onChange(e.target.value);
    setClassTitle(options[e.target.selectedIndex]?.className || "");
  };

  return (
    <div className=" flex justify-center item-center w-full">
      <div className="relative w-full">
        <select
          onChange={handleOnChange}
          className={`cursor-pointer shadow block appearance-none w-full border border-gray-200 
          py-3 px-4 pr-8 rounded leading-tight focus:outline-none ${
            classTitle ? classTitle : "text-gray-700"
          }`}
          defaultValue={selectedID === 0 ? undefined : selectedID}
          value={value}
          disabled={disabled}
        >
          {placeholder && (
            <option key="default" value="" disabled selected hidden>
              {placeholder}
            </option>
          )}
          {options.map((x, index) => (
            <option key={x.id} value={x.id} className={x?.className || ""}>
              {x.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <Image src="/icons/icon-arrows-down.svg" width={10} height={10} />
        </div>
      </div>
    </div>
  );
};
SelectorInput.defaultProps = defaultProps;
export default SelectorInput;
