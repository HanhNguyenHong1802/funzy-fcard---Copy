import React from "react";
import Image from "next/image";
import { selectUserInfo } from "@/redux/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openModalSignin } from "@/redux/modalSlice";

/**
 * Feature Card
 * @return {JSX.Element} The JSX Code for the Feature Card
 */
type CardFeatureProps = {
  item: {
    name: string;
    icon: any;
    colorTop: string;
    colorIcon: string;
    link: string;
    loginRequired: boolean;
    isPublic: boolean;
    removeWhenIsAgency: boolean;
    childrenLink?: Array<string>;
  };
};
const CardFeature = ({ item }: CardFeatureProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathUrl = router.pathname;
  const user = useAppSelector(selectUserInfo);
  const accountType = user?.status === 3 || null;

  const handleClickFeature = () => {
    if (!user && item.loginRequired) {
      dispatch(openModalSignin());
      return;
    }
    router.push(item.link);
  };
  return (
    <>
      {((item.isPublic && (!item.removeWhenIsAgency || !accountType)) ||
        (user && !item.isPublic && accountType)) && (
        <div
          className={`w-[40%] sm:w-[23%] h-[100px] sm:h-[173px] relative cursor-pointer border-b-4  ${
            pathUrl.includes(item.link) || item?.childrenLink?.includes(pathUrl)
              ? ` border-[#F89736]`
              : ` border-transparent`
          }`}
          onClick={() => handleClickFeature()}
        >
          <div
            className="h-1/2 w-full"
            style={{
              background:
                pathUrl.includes(item.link) ||
                item?.childrenLink?.includes(pathUrl) ||
                pathUrl === "/"
                  ? item.colorTop
                  : "#E9E9E9",
            }}
          />
          <div
            className="absolute w-[50px] h-[50px] sm:w-[87px] sm:h-[87px] m-auto top-0 bottom-0 left-0 right-0 shadow-md rounded-md sm:rounded-3xl flex justify-center items-center"
            style={{ background: item.colorIcon }}
          >
            <Image src={item.icon} width={30} height={30} />
          </div>
          <div className="w-full h-1/2 bg-white flex justify-center items-center pt-6 sm:pt-9 font-bold text-black sm:text-base text-xs uppercase">
            <span>{item.name}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CardFeature;
