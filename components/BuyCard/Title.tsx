import React from "react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <>
      <h5 className="uppercase border-l-4 border-l-[#F89736] pl-4 mb-3 text-[#182537] text-lg font-bold">
        {title}
      </h5>
      <div className="border-b border-b-[#E5E5E5]" />
    </>
  );
};

export default Title;
