import Image from "next/image";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
type CopyProps = {
  value: string;
  className: string;
};

const Copy = ({ value = "", className }: CopyProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 150);
  };
  return (
    <CopyToClipboard text={value} onCopy={handleCopied}>
      <div
        className={`inline-block ml-2 cursor-pointer ${
          copied ? `opacity-30` : ``
        } ${className ? className : ``}`}
      >
        <Image
          src="/icons/icon-copy.svg"
          width={16}
          height={16}
          alt=" "
          className="inline"
        />
      </div>
    </CopyToClipboard>
  );
};

export default Copy;
