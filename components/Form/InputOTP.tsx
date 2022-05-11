import React, { memo } from "react";
import OtpInput from "react-otp-input";

type InputOTPProps = {
  inputStyle?: string;
  isNumber?: boolean;
  onChange: Function;
  value: undefined | string;
  numberInputs?: number;
  label?: string;
  className?: string;
} & typeof defaultProps;

const defaultProps = {
  isNumber: true,
  numberInputs: 6,
};
const InputOTP = ({
  isNumber,
  inputStyle,
  onChange,
  value,
  numberInputs,
  label,
  className,
}: InputOTPProps) => {
  return (
    <div className={className ? className : ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={numberInputs}
        containerStyle="justify-center"
        inputStyle={`mx-2 h-10 !w-9 text-2xl border text-center shadow cursor-pointer ${inputStyle} focus:outline-none`}
        focusStyle=""
        isInputNum={isNumber}
      />
    </div>
  );
};
InputOTP.defaultProps = defaultProps;
export default memo(InputOTP);
