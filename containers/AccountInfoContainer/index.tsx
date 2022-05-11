import InputText from "@/components/Form/InputText";
import UploadFile from "@/components/UploadFile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getMoneyUpLevel,
  selectUserInfo,
  userInfoThunk,
} from "@/redux/userSlice";
import accountAPI from "@/services/account";
import { formatCurrency } from "@/utils/index";
import { getImageDomain } from "@/utils/getImageDomain";
import { toastError, toastSuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";
import { validateFullname } from "@/constants/validate";

type Inputs = {
  fullname: string;
  phone: string;
  email: string;
};

const schema = yup.object({
  fullname: validateFullname,
});

const AccountInfoContainer = () => {
  const user = useAppSelector(selectUserInfo);
  const userAgency = useAppSelector(getMoneyUpLevel);
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const imageRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameRender, setNameReder] = useState("");

  useEffect(() => {
    if (user) {
      const name = watch("fullname");
      const changed = name !== user.fullname;
      setIsChanged(changed);
      setValue("email", user?.email);
    }
  }, [watch("fullname"), user]);

  const onSubmit = async (data: Inputs) => {
    const AccountParams = { Email: user?.email, Fullname: data?.fullname };

    try {
      const response = await accountAPI.updateAccountInfo(AccountParams);
      if (response?.data?.code >= 0) {
        toastSuccess("Cập nhật thành công");
        dispatch(userInfoThunk());
      }
    } catch (error: any) {
      toastError(error?.data?.mess);
    }
  };

  const handleUploadAvt = async (avt: string) => {
    if (avt) {
      try {
        setLoading(true);
        const response = await accountAPI.updateAvatar(avt?.split(",")?.[1]);
        if (response?.data?.code >= 0) {
          toastSuccess("Cập nhật ảnh đại diện thành công");
          dispatch(userInfoThunk());
        }
      } catch (error: any) {
        toastError(error?.data?.mess);
      } finally {
        setLoading(false);
      }
    }
  };

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
      <div className="text-center md:text-left">
        <p className="font-semibold text-2xl">Thông tin tài khoản</p>
        <p className="my-2">
          Chỉnh sửa thông tin mà bạn sử dụng trên các dịch vụ của Fcard
        </p>
      </div>
      <hr />

      <div className="flex pb-5 pl-5 mt-3">
        <UploadFile
          imageStyles="rounded-full object-cover"
          imageRef={imageRef || user?.avatar}
          width={90}
          height={90}
          setData={handleUploadAvt}
          defaultImage={user?.avatar ? getImageDomain(user?.avatar) : ``}
          nameRender={nameRender}
          isAvt={true}
        >
          <div
            className="bg-[#EEF1F6] cursor-pointer rounded-full"
            style={{ width: `90px`, height: `90px` }}
            onClick={() => !loading && imageRef.current.click()}
          />
          <div className="absolute cursor-pointer rounded-full top-14 -right-2  z-[5]">
            <Image
              src="/icons/icon-camera.svg"
              alt="icon"
              width={27}
              height={27}
              className="bg-white rounded-full"
              onClick={() => !loading && imageRef.current.click()}
            />
          </div>
        </UploadFile>

        <div className="block ml-5">
          <h1
            className="font-bold text-lg line-clamp-1 mb-2 md:w-72 overflow-hidden"
            title={user?.fullname}
          >
            {user?.fullname}{" "}
          </h1>
          <div className="md:max-w-fit">
            {(user?.status === 0 || user?.status === 1) && (
              <Link href="/xac-thuc-tai-khoan?step=1">
                <a className="flex text-white hover:scale-105 bg-red-600 rounded-lg px-5 py-2 uppercase ">
                  <Image
                    src="/icons/icon-agency.svg"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                  <p className="pl-2"> Nâng cấp đại lý</p>
                </a>
              </Link>
            )}
            {user?.status === 2 && (
              <div className="flex text-white bg-[#f89736] rounded-lg px-5 py-2 uppercase">
                <Image
                  src="/icons/icon-agency.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p className="pl-2 font-bold"> Chờ xác thực</p>
              </div>
            )}
            {user?.status === 3 && (
              <div className="sm:flex items-center max-w-fit sm:max-w-none">
                <Link href="/thong-bao-nap-tien">
                  <a className="flex text-white hover:scale-105 bg-green-600 rounded-lg px-5 py-2 uppercase ">
                    <p>Nạp tiền</p>
                  </a>
                </Link>
                <p className="text-[#F89736] font-medium flex sm:justify-center gap-2 mt-2 sm:mt-0 sm:ml-2">
                  {" "}
                  <Image
                    src="/icons/icon-agency-active.svg"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                  Đại lý cấp {user.agencyType}
                </p>
              </div>
            )}
          </div>
          {userAgency.agencyNext && (
            <p className="mt-2 font-medium md:w-80 lg:w-full">
              Bạn cần chuyển thêm ít nhất{" "}
              <span className="text-[#f89736]">
                {formatCurrency(userAgency.moneyToLevelUp)}
              </span>{" "}
              để thành{" "}
              <span className="text-[#f89736]">
                Đại lý Cấp {userAgency.agencyNext}
              </span>
            </p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-3 w-full md:w-auto">
          <InputText
            register={register("phone")}
            placeholder="Số điện thoại"
            error={errors.phone}
            defaultValue={user?.username}
            classNameInput="bg-[#eef1f6] md:w-[calc(425px)] p-4 w-full"
            label="Số điện thoại:"
            className="my-2"
            disabled
          />
          <div className="flex items-end w-full">
            <InputText
              register={register("email")}
              placeholder="Email"
              error={errors.email}
              defaultValue={user?.email}
              classNameInput="bg-[#eef1f6] md:w-[calc(425px)] p-4 w-full"
              label="Email:"
              className="my-2 w-full md:w-fit"
              disabled
            />
            <div
              className="h-11 w-11 flex justify-center items-center bg-[#EEF1F6] rounded-sm mb-2 ml-1 cursor-pointer"
              onClick={() => router.push("/doi-email")}
            >
              <Image
                src="/icons/icon-pen.svg"
                width={20}
                height={20}
                alt="icon"
              />
            </div>
          </div>
          <div className="flex items-end w-full">
            <InputText
              register={register("fullname")}
              placeholder="Họ và tên"
              error={errors.fullname}
              defaultValue={user?.fullname}
              classNameInput="bg-[#eef1f6] md:w-[calc(425px)] p-4 w-full"
              label="Họ và tên(*):"
              className="my-2 w-full md:w-fit"
            />
            <div
              className="h-11 w-11 flex justify-center items-center bg-[#EEF1F6] rounded-sm mb-2 ml-1 cursor-pointer"
              onClick={() => setFocus("fullname")}
            >
              <Image
                src="/icons/icon-pen.svg"
                width={20}
                height={20}
                alt="icon"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="CẬP NHẬT"
          disabled={!isChanged}
          className={`cursor-pointer text-[#ffffff] text-base font-bold mt-3 bg-[#f89736] md:ml-3 py-3 rounded-md w-full md:w-[calc(425px)] ${
            !isChanged ? "opacity-30" : ""
          }`}
        />
      </form>
    </>
  );
};
export default AccountInfoContainer;
