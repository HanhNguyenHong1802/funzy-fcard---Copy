import accountAPI from "@/services/account";
import { formatCurrency } from "@/utils/index";
import { getImageDomain } from "@/utils/getImageDomain";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const headerNavList = [
  { id: 1, name: "Chính sách", link: "/chinh-sach" },
  { id: 2, name: "Tin tức", link: "/tin-tuc" },
  { id: 3, name: "Hướng dẫn", link: "/huong-dan/cau-hoi-thuong-gap" },
  { id: 4, name: "Liên hệ", link: "/lien-he" },
  { id: 5, name: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
];

const HeaderErrorBoundary = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    accountAPI.getAccountInfo().then((res) => {
      if (res?.data?.code >= 0) {
        setUser(res?.data?.data);
      }
    });
  }, []);
  return (
    <header className="bg-slate-700 fixed top-0 left-0 w-full z-10">
      <div className="container max-w-screen-xl flex justify-between items-center my-0 mx-auto px-5">
        <div className="flex items-center">
          <a href="/">
            <Image src="/images/logo.png" alt="logo" width={118} height={42} />
          </a>
          <nav>
            <div className="hidden lg:flex pl-5">
              {headerNavList.map((item, index) => (
                <ul key={index}>
                  <li className="inline-block relative">
                    <a
                      href={item.link}
                      className={`
                          text-white text-sm py-4 hover:before:w-[calc(100%-0.75rem)]
                          hover:text-[#f89736] hover:border-[#f89736] block pr-3 uppercase font-semibold
                            before:content-[''] before:absolute before:bottom-0 before:w-0 
                            before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]
                      `}
                    >
                      {item.name}
                    </a>
                  </li>
                </ul>
              ))}
            </div>
          </nav>
        </div>
        {user && (
          <div className="flex justify-center items-center gap-6 sm:gap-12 ml-auto mr-4 lg:m-0">
            <div className="flex justify-center items-center">
              <div className="text-right hidden sm:flex sm:flex-col">
                <p className="font-semibold text-left text-white leading-5 max-w-[10rem] self-end line-clamp-1">
                  {user?.fullname}
                </p>
                <p className="text-[#f89736] leading-4">
                  Số dư: {formatCurrency(user.balance)}đ
                </p>
              </div>
              <div className="relative dropdown-button pt-2 pl-3 h-[54px]">
                <Image
                  src={
                    user?.avatar
                      ? getImageDomain(user?.avatar)
                      : "/images/avatar.png"
                  }
                  width={38}
                  height={38}
                  className="rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default HeaderErrorBoundary;
