import NavMobile from "@/layouts/NavMobile";
import NotificationList from "@/layouts/NotificationList";
import SigninModal from "@/layouts/SigninModal";
import SignoutModal from "@/layouts/SignoutModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  openDrawer,
  openModalSignin,
  openModalSignout,
} from "@/redux/modalSlice";
import { selectUserInfo } from "@/redux/userSlice";
import { formatCurrency } from "@/utils/index";
import { getImageDomain } from "@/utils/getImageDomain";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useClickOutSide from "hooks/useClickOutSide";

const headerNavList = [
  { id: 1, name: "Chính sách", link: "/chinh-sach" },
  { id: 2, name: "Tin tức", link: "/tin-tuc" },
  { id: 3, name: "Hướng dẫn", link: "/huong-dan/cau-hoi-thuong-gap" },
  { id: 4, name: "Liên hệ", link: "/lien-he" },
  { id: 5, name: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUserInfo);
  const [openUserOption, setOpenUserOption] = useState(false);
  const [nameRender, setNameReder] = useState("");
  let clickOutSideOptionUser = useRef<any>(null);
  clickOutSideOptionUser = useClickOutSide(() => {
    setOpenUserOption(false);
  });
  useEffect(() => {
    const nameArr = user?.fullname?.split(" ");
    let nameR = nameArr?.[0]?.[0];
    if (nameArr?.length > 1) {
      nameR += nameArr?.[nameArr.length - 1]?.[0];
    }
    setNameReder(nameR);
  }, [user?.fullname]);
  return (
    <>
      <header className="bg-slate-700 fixed top-0 left-0 w-full z-50">
        <div className="container max-w-screen-xl flex justify-between items-center my-0 mx-auto px-5">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={118}
                  height={42}
                />
              </a>
            </Link>
            <nav>
              <div className="hidden lg:flex pl-10 gap-5 xl:gap-14">
                {headerNavList.map((item, index) => (
                  <ul key={index}>
                    <li className="inline-block relative">
                      <Link href={item.link}>
                        <a
                          className={`
                          text-white text-sm py-4 hover:before:w-full
                          hover:text-[#f89736] hover:border-[#f89736] block uppercase font-semibold
                            before:content-[''] before:absolute before:bottom-0 before:w-0 
                            before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]
                            ${
                              router.pathname === item.link ||
                              (router.pathname.startsWith(item.link) &&
                                item.link === "/tin-tuc")
                                ? "text-[#f89736] border-[#f89736] before:w-full"
                                : ""
                            }
                      `}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            </nav>
          </div>
          {!user ? (
            <div className="hidden lg:block">
              <Link href="/dang-ky">
                <button
                  className={`w-28 p-1 rounded-2xl bg-white mr-5 text-sm font-bold text-[#f89736] relative hover:before:w-[calc(100%-0.75rem)]
                    before:content-[''] before:absolute before:-bottom-2 before:left-2 before:w-0 
                    before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]  ${
                      router.pathname === "/dang-ky" &&
                      "text-[#f89736] border-[#f89736] before:w-[calc(100%-0.75rem)]"
                    }`}
                >
                  <a>Đăng ký</a>
                </button>
              </Link>
              <button
                className="text-white bg-[#f89736] text-sm font-bold w-28 p-1 rounded-2xl relative hover:before:w-[calc(100%-0.75rem)]
                  before:content-[''] before:absolute before:-bottom-2 before:left-2 before:w-0 
                  before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]"
                onClick={() => dispatch(openModalSignin())}
              >
                Đăng nhập
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 sm:gap-6 ml-auto mr-4 lg:m-0">
              <NotificationList />
              <div
                className="flex justify-center items-center sm:h-11 sm:bg-[#3C4D63] rounded-full px-3 cursor-pointer"
                onClick={() => setOpenUserOption((x) => !x)}
                ref={clickOutSideOptionUser}
              >
                <div className="text-right hidden sm:flex sm:flex-col">
                  <p className="font-semibold text-left text-white leading-5 max-w-[10rem] self-end line-clamp-1">
                    {user?.fullname}
                  </p>
                  <p
                    className="text-[#f89736] leading-4"
                    hidden={user?.status < 3}
                  >
                    Số dư: {formatCurrency(user.balance)}đ
                  </p>
                </div>
                <div className="relative pt-2 pl-3 h-[54px]">
                  {user?.avatar ? (
                    <Image
                      src={getImageDomain(user?.avatar)}
                      width={38}
                      height={38}
                      className="rounded-full cursor-pointer"
                      alt="avt"
                    />
                  ) : (
                    <div className="rounded-full w-[38px] h-[38px] cursor-pointer bg-[#f89736] flex items-center text-[#FFFFFF] font-bold justify-center">
                      {nameRender}
                    </div>
                  )}
                  {openUserOption && (
                    <div className="fixed sm:absolute top-[55px] sm:top-[54px] right-0 h-32 w-screen sm:w-60 bg-white shadow rounded-sm z-20">
                      <Link href="/thong-tin-tai-khoan">
                        <a
                          href="#"
                          className="h-1/3 bg-white flex items-center p-4 cursor-pointer hover:bg-[#F3F3F3] hover:text-[#f89736] group"
                        >
                          <span className="group-hover:hidden flex">
                            <Image
                              src="/icons/icon-user-info.svg"
                              width={15}
                              height={28}
                            />
                          </span>
                          <span className="hidden group-hover:flex ">
                            <Image
                              src="/icons/icon-user-info-active.svg"
                              width={15}
                              height={28}
                            />
                          </span>

                          <span className="ml-2 font-medium">
                            Thông tin tài khoản
                          </span>
                        </a>
                      </Link>
                      <Link href="/doi-mat-khau">
                        <a
                          href="#"
                          className="h-1/3 bg-white flex items-center p-4 cursor-pointer hover:bg-[#F3F3F3] hover:text-[#f89736] group"
                        >
                          <span className="group-hover:hidden flex">
                            <Image
                              src="/icons/icon-lockup.svg"
                              width={15}
                              height={28}
                            />
                          </span>
                          <span className="hidden group-hover:flex ">
                            <Image
                              src="/icons/icon-lockup-active.svg"
                              width={15}
                              height={28}
                            />
                          </span>
                          <span className="ml-2 font-medium">Đổi mật khẩu</span>
                        </a>
                      </Link>
                      <p
                        className="h-1/3 bg-white flex items-center p-4 cursor-pointer hover:bg-[#F3F3F3] hover:text-[#f89736] group"
                        onClick={() => dispatch(openModalSignout())}
                      >
                        <span className="group-hover:hidden flex">
                          <Image
                            src="/icons/icon-logout.svg"
                            width={15}
                            height={28}
                          />
                        </span>
                        <span className="hidden group-hover:flex ">
                          <Image
                            src="/icons/icon-logout-active.svg"
                            width={15}
                            height={28}
                          />
                        </span>
                        <span className="ml-2 font-medium">Đăng xuất</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="lg:hidden flex flex-wrap float-right my-2">
            <button
              className="text-white bg-slate-500 px-2 rounded-md pt-2"
              onClick={() => dispatch(openDrawer())}
            >
              <Image
                src="/icons/icon-menu.svg"
                alt="menu"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </header>
      <NavMobile />
      <SigninModal />
      <SignoutModal />
    </>
  );
};
export default Header;
