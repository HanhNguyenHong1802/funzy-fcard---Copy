import { timeDateFormat } from "@/utils/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type NewHotProps = {
  item: any;
};

const NewHot = ({ item }: NewHotProps) => {
  return (
    <div className="w-full h-full relative">
      <Link href={`/tin-tuc/${item?.alias}-${item?.newsID}`}>
        <a>
          <img
            src={item?.imageUrl}
            className="object-cover md:w-full md:h-full w-full bg-[#E5E5E5] max-h-[344px]"
            alt={item?.title}
          />
        </a>
      </Link>
      <div className="md:absolute md:bottom-0 p-3 md:px-4 md:pb-4 w-full border border-[#E5E5E5] border-t-0 md:border-0">
        <Link href={`/tin-tuc/${item?.alias}-${item?.newsID}`}>
          <a>
            <h1 className="font-bold text-xl line-clamp-3 md:line-clamp-2 text-[#182537] md:text-[#FFFFFF]">
              {item?.title}
            </h1>
          </a>
        </Link>
        <div className="flex my-1">
          <Image src="/icons/icon-time.svg" width={15} height={15} alt=" " />
          <p className="text-xs ml-3 text-[#919191] md:text-[#FFFFFF]">
            {timeDateFormat(item?.publishTime)}
          </p>
        </div>
        <p className="text-base line-clamp-3 md:line-clamp-2 md:text-[#FFFFFF]">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default NewHot;
