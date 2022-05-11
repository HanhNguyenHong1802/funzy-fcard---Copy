import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Game Card
 * @return {JSX.Element} The JSX Code for the Game Card
 */
type CardGameProps = {
  item: {
    name: string;
    link: string;
    thumbUrl: string;
  };
};
const CardGame = ({ item }: CardGameProps) => {
  return (
    <div className="m-auto text-center font-semibold cursor-pointer group">
      <div className="relative">
        <div className="hidden group-hover:block z-10 absolute w-[178px] h-[178px] bg-black opacity-50 rounded-[30px]"></div>
        <Link href={item.link}>
          <a className="hidden group-hover:block z-20 absolute z-11 w-3/4 h-10 rounded-3xl bg-[#F89736] text-center p-2 text-white m-auto top-0 bottom-0 right-0 left-0">
            Nạp ngay
          </a>
        </Link>
        <Image className="z-0" src={item.thumbUrl} width={178} height={178} />
      </div>
      <p className=" group-hover:text-[#F89736]">{item.name}</p>
    </div>
  );
};

export default CardGame;
