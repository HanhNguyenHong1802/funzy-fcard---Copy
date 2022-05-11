import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerNavList = [
  { id: 1, name: "funzy.vn", link: "https://funzy.vn/" },
  { id: 2, name: "Tin tức", link: "https://funzy.vn/news" },
  { id: 3, name: "Games", link: "https://game.funzy.vn/" },
];
const footerSocialList = [
  { id: 1, link: "/icons/icon-instagram.svg" },
  { id: 2, link: "/icons/icon-facebook.svg" },
  { id: 3, link: "/icons/icon-twitter.svg" },
  { id: 4, link: "/icons/icon-linkedin.svg" },
];
const Footer = () => {
  return (
    <footer className="bg-[#182537] w-full leading-6 text-sm text-white">
      <div
        className="container max-w-screen-xl p-5 md:flex items-center text-center 
      md:text-left md:items-start md:justify-between mx-auto"
      >
        <div className="md:w-1/3 w-full">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={118}
            height={42}
            className="pb-3"
          />
          <p className="pb-3 leading-6">
            Chịu trách nhiệm nội dung: Ông Nguyễn Tuấn Quang
            <br /> Số giấy phép: 326/GP-BTTTT - Cấp ngày: 02/06/2021
          </p>
          <div className="flex flex-wrap md:place-content-start place-content-center">
            <div className="flex mr-4">
              <div className="mr-1 -mt-1">
                <Image
                  src="/icons/icon-phone.svg"
                  width={15}
                  height={30}
                  alt="phone"
                />
              </div>
              Điện thoại: 1900636919
            </div>

            <div className="flex">
              <div className="mr-1 -mt-1">
                <Image
                  src="/icons/icon-mail.svg"
                  width={15}
                  height={32}
                  alt="phone"
                />
              </div>
              Email: info@funzy.vn
            </div>
          </div>

          <p className="pb-3 leading-6">
            Copyright © 2021 Funzy.vn All Rights Reserved
          </p>
        </div>
        <div className="md:w-1/3 pl-24 w-full hidden md:block">
          <p className="leading-10 font-semibold text-base -ml-4">LIÊN KẾT:</p>

          <ul>
            {footerNavList.map((item, index) => (
              <li
                className="list-disc relative pl-1 leading-10 text-sm hover:text-[#f89736] active:text-[#f89736] "
                key={index}
              >
                <Link href={item.link}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/3 w-full pb-10">
          <p className="leading-10 font-semibold text-base">CHÚNG TÔI TRÊN:</p>
          <div className="flex pt-5  place-content-center md:place-content-start">
            {footerSocialList.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer mr-3 hover:scale-110 hover:delay-150"
              >
                <Image src={item.link} width={32} height={32} alt="item" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
