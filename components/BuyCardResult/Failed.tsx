import Image from "next/image";
import Link from "next/link";
import React from "react";

type FailedProps = {
  data: Array<any>;
};

const Failed = ({ data }: FailedProps) => {
  return (
    <div className="container max-w-screen-xl mx-auto  min-h-[50vh]">
      <div className="w-full p-4 max-w-xl mx-auto bg-[#ffffff] h-fit my-10">
        <div className="p-4 mx-4 border border-[#E5E5E5]">
          <div className="text-center mb-2">
            <Image
              src="/icons/icon-failed.svg"
              width={38}
              height={40}
              alt="failed"
              className="inline"
            />
            <h1 className="text-[#F8462E] text-lg font-semibold">
              Giao dịch không thành công !
            </h1>
          </div>
          <Link href="/">
            <a className="w-full mt-5 block text-center rounded cursor-pointer text-base text-[#ffffff] bg-[#f79636] uppercase hover:bg-[#ec8200] focus:outline-none p-2 focus:shadow-outline font-bold">
              Về trang chủ
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failed;
