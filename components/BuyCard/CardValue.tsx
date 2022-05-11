import { formatCurrency } from "@/utils/index";
import React from "react";

type CardValueProps = {
  item: {
    name: string | undefined;
    value: Number;
  };
  active: boolean;
  handleSelect: Function;
};

const CardValue = ({ item, active, handleSelect }: CardValueProps) => {
  return (
    <button
      className={`${
        active
          ? `border-2 border-[#F89736]  text-[#F89736]`
          : `border border-[#E5E5E5] text-[#182537]`
      } rounded hover:border-[#F89736] w-32 h-16 text-lg font-bold mx-auto overflow-hidden shadow-md`}
      onClick={() => handleSelect(item, "CARD_VALUE")}
    >
      {`${formatCurrency(item?.value)}đ`}
    </button>
  );
};

export default CardValue;
