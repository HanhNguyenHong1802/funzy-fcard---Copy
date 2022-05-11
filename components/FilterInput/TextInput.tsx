import React from "react";

type TextProps = {
  onChange: Function;
  placeholder: string;
};
const TextInput = ({ onChange, placeholder }: TextProps) => {
  const handleOnChange = (e: any) => {
    onChange && onChange(e.target.value);
  };
  return (
    <div className="flex justify-center item-center w-full">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="input-text"
        type="text"
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};
export default TextInput;
