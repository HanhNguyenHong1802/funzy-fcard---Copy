import { CardImage } from "@/constants/CardImage";
import React from "react";

type SubProviderProps = {
  item: any;
  active: boolean;
  handleSelect: Function;
};

const SubProvider = ({ item, active, handleSelect }: SubProviderProps) => {
  return (
    <button
      className={`${
        active ? `border-2 border-[#F89736]` : `border border-[#E5E5E5]`
      } rounded w-32 h-16 bg-[#ffffff] mx-auto flex justify-center items-center p-2 hover:border-[#F89736] shadow-md`}
      onClick={() => handleSelect(item)}
    >
      <img
        src={CardImage[item?.categoryCode]}
        className="object-cover max-h-[calc(55px)]"
        alt={item?.bankName || item?.categoryName}
      />
    </button>
  );
};

export default SubProvider;
