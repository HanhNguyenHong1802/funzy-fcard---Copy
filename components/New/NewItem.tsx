import { timeDateFormat } from "@/utils/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type NewItemProps = {
  layout?: "vertical" | undefined;
  sideBar?: boolean;
  item: any;
};

const NewItem = ({ item, layout, sideBar = true }: NewItemProps) => {
  return (
    <div
      className={`flex h-[96px] ${
        layout
          ? sideBar
            ? `sm:h-[164px]`
            : `sm:h-[164px] lg:h-[96px]`
          : `sm:h-auto sm:block`
      }`}
    >
      <Link href={`/tin-tuc/${item?.alias}-${item?.newsID}`}>
        <a
          className={`w-1/3 sm:w-full block relative ${
            layout ? `md:w-1/2 sm:mr-2` : `sm:h-[160px]`
          }`}
        >
          <Image
            src={item?.imageUrl || "/images/no-image.png"}
            className="object-cover bg-[#E5E5E5]"
            alt={item?.title}
            layout="fill"
          />
        </a>
      </Link>
      <div
        className={`text-[#182537] w-2/3 sm:w-full ml-3 sm:ml-0 ${
          layout
            ? `md:w-1/2 sm:pl-2`
            : `sm:p-3 sm:border border-[#E5E5E5] border-t-0 sm:h-[190px]`
        }`}
      >
        <Link href={`/tin-tuc/${item?.alias}-${item?.newsID}`}>
          <a>
            <h1
              className={`font-bold text-base line-clamp-3 ${
                layout ? `` : `sm:h-[72px]`
              }`}
            >
              {item?.title}
            </h1>
          </a>
        </Link>
        <div className="my-1 flex">
          <Image src="/icons/icon-time.svg" width={15} height={15} alt=" " />
          <p className="text-xs ml-3 text-[#919191]">
            {timeDateFormat(item?.publishTime)}
          </p>
        </div>
        <p
          className={`text-[15px] sm:line-clamp-3 hidden ${
            sideBar ? `` : `lg:hidden`
          }`}
        >
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default NewItem;
