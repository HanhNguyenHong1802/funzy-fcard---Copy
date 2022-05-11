import React from "react";
import CardFeature from "./CardFeature";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { selectUserInfo } from "@/redux/userSlice";
import { useRouter } from "next/router";
import CardFeatureVertical from "./CardFeatureVertical";
/**
 * Feature List
 * @return {JSX.Element} The JSX Code for the Feature List
 */

type FeatureApp = {
  disableTitle: boolean;
  distableDesc: boolean;
} & typeof defaultProps;

const defaultProps = {
  disableTitle: false,
  distableDesc: false,
};

const Feature = ({ disableTitle, distableDesc }: FeatureApp) => {
  const user = useAppSelector(selectUserInfo);
  const router = useRouter();
  const features = [
    {
      id: 1,
      name: "Mua thẻ",
      icon: "/icons/icon-card.svg",
      colorTop: "#E2F6FD",
      colorIcon: "#2C71FA",
      link: "/mua-the",
      loginRequired: false,
      isPublic: true,
      removeWhenIsAgency: false,
    },
    {
      id: 2,
      name: "Nạp tiền",
      icon: "/icons/icon-recharge.svg",
      colorTop: "#FFF4E7",
      colorIcon: "#F8462E",
      link: "/thong-bao-nap-tien",
      childrenLink: ["/danh-sach-ngan-hang", "/chinh-sach-chiet-khau"],
      loginRequired: true,
      isPublic: false,
      removeWhenIsAgency: false,
    },
    {
      id: 3,
      name: "Giao dịch",
      icon: "/icons/icon-transaction.svg",
      colorTop: "#E2FDE2",
      colorIcon: "#32C36A",
      link: "/giao-dich",
      loginRequired: true,
      isPublic: true,
      removeWhenIsAgency: false,
    },
    {
      id: 4,
      name: "Quản lý kho thẻ",
      icon: "/icons/icon-manage.svg",
      colorTop: "#FDE8F7",
      colorIcon: "#9B2DFA",
      link: "/quan-ly-kho-the",
      loginRequired: true,
      isPublic: false,
      removeWhenIsAgency: false,
    },
    {
      id: 5,
      name: "Nâng cấp đại lý",
      icon: "/icons/icon-store.svg",
      colorTop: "#FDE8F7",
      colorIcon: "#9B2DFA",
      link:
        user?.status <= 1
          ? "//xac-thuc-tai-khoan?step=1"
          : "/thong-tin-tai-khoan",
      loginRequired: true,
      isPublic: true,
      removeWhenIsAgency: true,
    },
  ];
  const features2 = [
    {
      id: 1,
      name: "Mua thẻ",
      icon: "/icons/icon-card-blue.svg",
      colorTop: "#E2F6FD",
      colorIcon: "#2C71FA",
      link: "/mua-the",
      loginRequired: false,
      isPublic: true,
      removeWhenIsAgency: false,
      background: "#dbe4f6",
    },
    {
      id: 2,
      name: "Nạp tiền",
      icon: "/icons/icon-recharge-red.svg",
      colorTop: "#FFF4E7",
      colorIcon: "#F8462E",
      link: "/thong-bao-nap-tien",
      childrenLink: ["/danh-sach-ngan-hang", "/chinh-sach-chiet-khau"],
      loginRequired: true,
      isPublic: false,
      removeWhenIsAgency: false,
      background: "#efe5e8",
    },
    {
      id: 3,
      name: "Giao dịch",
      icon: "/icons/icon-transaction-green.svg",
      colorTop: "#E2FDE2",
      colorIcon: "#32C36A",
      link: "/giao-dich",
      loginRequired: true,
      isPublic: true,
      removeWhenIsAgency: false,
      background: "#e0edeb",
    },
    {
      id: 4,
      name: "Quản lý kho thẻ",
      icon: "/icons/icon-manage-vio.svg",
      colorTop: "#FDE8F7",
      colorIcon: "#9B2DFA",
      link: "/quan-ly-kho-the",
      loginRequired: true,
      isPublic: false,
      removeWhenIsAgency: false,
      background: "#e8e2f6",
    },
    {
      id: 5,
      name: "Nâng cấp đại lý",
      icon: "/icons/icon-store-vio.svg",
      colorTop: "#FDE8F7",
      colorIcon: "#9B2DFA",
      link:
        user?.status <= 1
          ? "//xac-thuc-tai-khoan?step=1"
          : "/thong-tin-tai-khoan",
      loginRequired: true,
      isPublic: true,
      removeWhenIsAgency: true,
      background: "#e8e2f6",
    },
  ];
  return (
    <div className={`bg-[#eef1f6] ${disableTitle ? "" : "pt-6 sm:pt-12"}`}>
      <div className="relative">
        {!disableTitle && (
          <h2
            className="font-bold relative text-xl sm:text-3xl text-center mb-10 uppercase 
          after:w-10 after:border-t-[5px] after:border-l-[3px] after:border-r-[3px] after:border-t-[#f89736] after:border-l-transparent after:border-r-transparent after:absolute after:top-[75px] after:left-0 after:right-0 after:bottom-0 after:m-auto 
          before:w-28 before:h-[1px] before:absolute before:bg-[#f89736] before:top-[70px] before:left-0 before:right-0 before:bottom-0 before:m-auto"
          >
            CÁC TÍNH NĂNG TIỆN ÍCH
          </h2>
        )}
        <div className="hidden md:block absolute left-[20%] top-[51px]">
          <Image
            src={"/images/feature-background-1.png"}
            width={50}
            height={43}
          />
        </div>
        <div className="hidden md:block absolute bottom-[57px] right-[10%]">
          <Image
            src={"/images/feature-background-2.png"}
            width={32}
            height={33}
          />
        </div>
        {!distableDesc && (
          <p className="sm:w-[420px] text-[#515151] my-4 mx-auto text-center px-4 uppercase font-medium text-sm">
            Nhiều ưu đãi hấp dẫn hơn khi đăng ký làm đại lý
          </p>
        )}
        <div
          className={`container xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm pt-4 sm:pt-8 pb-8  flex justify-center px-4 flex-wrap gap-3 mx-auto ${
            distableDesc ? "" : "sm:pb-12"
          }`}
        >
          {router.asPath === "/"
            ? features.map((f) => <CardFeature item={f} key={f.id} />)
            : features2.map((f) => <CardFeatureVertical item={f} key={f.id} />)}
        </div>
      </div>
    </div>
  );
};
Feature.defaultProps = defaultProps;
export default Feature;
