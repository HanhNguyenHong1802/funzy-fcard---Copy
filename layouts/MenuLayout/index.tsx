import Feature from "@/components/Feature";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
type MenuLayoutProps = {
  listItem: Array<any>;
  children?: any;
  type?: string;
};
const MenuLayout = ({ listItem, children, type }: MenuLayoutProps) => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  const listRecommendQuestion = [
    {
      id: 1,
      question: "Khi bị mất mật khẩu tôi phải làm gì để có thể lấy lại ?",
      query: "quen-mat-khau",
    },
    {
      id: 2,
      question:
        "Tôi có thể kiểm tra được thông tin giao dịch của mình được không? Nếu được thì kiểm tra ở đâu ?",
      query: "kiem-tra-giao-dich",
    },
    {
      id: 3,
      question: "Tôi là Đại lý và muốn nạp thì thực hiện như thế nào ?",
      query: "nap-tien-dai-ly",
    },
  ];
  return (
    <div style={{ minHeight: "calc(100vh - 52px)", marginTop: "52px" }}>
      {type === "guide" ? (
        <div className="bg-[#eef1f6] mt-[52px] h-36 w-full items-center flex">
          <div className="container max-w-screen-xl mx-auto relative">
            <div onClick={toggleHandler} className="flex">
              <div className="bg-white rounded text-gray-600 cursor-pointer p-4 w-full md:text-left text-center text-lg block">
                Chúng tôi có thể giúp gì?
              </div>
              <img
                src="/icons/icon-chevron-down.svg"
                alt="icon"
                className={`md:p-6 hidden md:block rounded rounded-l-none bg-[#f89736] cursor-pointer absolute h-[60px] right-0`}
              />
            </div>
            <div
              className={`absolute z-[1] h-0 opacity-0 w-full bg-white rounded divide-y top-[65px]
            divide-gray-100 shadow-xl transition-all duration-150 ${
              toggle && `h-auto opacity-100 p-[2px]`
            }`}
            >
              <ul
                className={`py-1 text-sm text-gray-700 dark:text-gray-200 hidden ${
                  toggle && `!block`
                }`}
              >
                {listRecommendQuestion?.map((item: any) => (
                  <li key={item?.id}>
                    <a
                      href={`/huong-dan/cau-hoi-thuong-gap?page=${item?.query}`}
                      className="block py-2 px-4 text-gray-600 hover:bg-gray-100 text-lg hover:text-[#f89736]"
                    >
                      {item?.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Feature disableTitle={true} distableDesc={true} />
      )}
      <div className="bg-white text-base w-full">
        <div className="container max-w-screen-xl mx-auto my-auto justify-between items-center">
          <div className="md:flex md:flex-wrap py-8 w-full">
            <div className="md:w-1/4 w-full md:min-h-[calc(70vh)] bg-[#eef1f6] flex flex-col justify-between ">
              <ul className="text-base block w-full">
                {listItem.map((item: any, index: any) => (
                  <li className="w-full group" key={index}>
                    <Link
                      href={
                        type === "guide"
                          ? `/huong-dan${item.subLink}`
                          : item.link
                      }
                    >
                      <a
                        className={`flex p-3 ${
                          router?.asPath.includes(
                            item?.link || item?.subLink
                          ) && "text-white bg-[#f89736]"
                        }  group-hover:bg-[#f89736] `}
                      >
                        <span
                          className={`group-hover:block pt-1 ${
                            router?.asPath.includes(item?.link || item?.subLink)
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <Image
                            src={`${item?.srcImage}.svg`}
                            width={20}
                            height={20}
                            alt="icon"
                          />
                        </span>
                        <span
                          className={`group-hover:hidden block pt-1 ${
                            router.pathname.includes(
                              item?.link || item?.subLink
                            ) && "hidden"
                          }`}
                        >
                          <Image
                            src={`${item?.srcImage}-active.svg`}
                            width={20}
                            height={20}
                            alt="icon"
                          />
                        </span>
                        <p className="ml-3 group-hover:text-white mb-1">
                          {item.text}
                        </p>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="bg-[#3079DB] bottom-0 pl-2 pt-3 pb-1 hidden w-full md:flex">
                <div className="hidden lg:block lg:place-self-center">
                  <Image
                    src="/icons/icon-phone-xl.svg"
                    alt="phone"
                    width={33}
                    height={38}
                  />
                </div>
                <div className="block ml-2 text-white">
                  <p className="font-semibold lg:text-lg text-base">
                    Chăm sóc khách hàng
                  </p>
                  <p className="font-bold lg:text-3xl text-2xl">1900636919</p>
                </div>
              </div>
            </div>
            <div className="md:w-3/4 md:mt-0 mt-3 w-full items-center mx-auto md:text-left">
              <div className="md:pr-0 md: pr-5 pl-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuLayout;
