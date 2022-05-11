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
    background?: string;
  };
};
const CardFeatureVertical = ({ item }: CardFeatureProps) => {
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
          className={`w-[40%] sm:w-[23%] flex cursor-pointer border-b-4 p-3 rounded justify-center items-center z-[2] ${
            pathUrl.includes(item.link) || item?.childrenLink?.includes(pathUrl)
              ? ` border-[#F89736]`
              : ` border-transparent`
          }`}
          style={{
            backgroundColor: item?.background,
          }}
          onClick={() => handleClickFeature()}
        >
          <Image src={item.icon} width={36} height={36} />
          <div className="font-bold text-black sm:text-base text-xs uppercase ml-5">
            <span
              style={{
                color: item?.colorIcon,
              }}
            >
              {item.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CardFeatureVertical;
