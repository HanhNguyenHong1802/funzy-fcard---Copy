import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeDrawer,
  openModalSignin,
  openModalSignout,
  selectShowDrawer,
} from "@/redux/modalSlice";
import { selectUserInfo } from "@/redux/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SigninModal from "../SigninModal";
import SignoutModal from "../SignoutModal";

const headerNavList = [
  { id: 1, name: "Chính sách", link: "/chinh-sach" },
  { id: 2, name: "Tin tức", link: "/tin-tuc" },
  { id: 3, name: "Hướng dẫn", link: "/huong-dan/cau-hoi-thuong-gap" },
  { id: 4, name: "Liên hệ", link: "/lien-he" },
  { id: 5, name: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
];

const NavMobile = () => {
  const router = useRouter();
  const openDrawer = useAppSelector(selectShowDrawer);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal open={openDrawer} handleClose={() => dispatch(closeDrawer())}>
        <div className={`top-0 right-0 bg-white w-9/12 h-screen z-50 absolute`}>
          <button
            onClick={() => dispatch(closeDrawer())}
            className="float-right"
          >
            <Image
              src="/icons/icon-close.svg"
              alt="close"
              width={40}
              height={40}
            />
          </button>
          <div className="my-10">
            {headerNavList.map((item, index) => (
              <ul key={index}>
                <li
                  className={`pl-5 ${
                    router.pathname === item.link && "bg-[#f89736] "
                  }`}
                >
                  <Link href={item.link}>
                    <a
                      className={`
                      py-4 text-xl font-semibold w-64 active:text-orange-70 block mr-3 uppercase ${
                        router.pathname === item.link
                          ? "text-white"
                          : "text-orange-500"
                      }
                      `}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
                <hr />
              </ul>
            ))}
          </div>
          <div className="mx-3" hidden={!!user}>
            <Link href="/dang-ky">
              <a className="block text-center py-2 rounded-3xl bg-orange-100 font-semibold shadow-md mb-5">
                Đăng ký
              </a>
            </Link>
            <button
              className="text-white bg-[#f89736] py-2 rounded-3xl font-semibold shadow-md w-full"
              onClick={() => dispatch(openModalSignin())}
            >
              Đăng nhập
            </button>
          </div>
          <div className="mx-3" hidden={!user}>
            <button
              className="text-white bg-[#f89736] py-2 rounded-3xl font-semibold shadow-md w-full"
              onClick={() => dispatch(openModalSignout())}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </Modal>
      <SigninModal />
      <SignoutModal />
    </>
  );
};

export default NavMobile;
