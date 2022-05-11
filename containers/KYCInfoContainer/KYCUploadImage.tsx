import ErrorMessage from "@/components/ErrorMessage";
import UploadFile from "@/components/UploadFile";
import { useAppDispatch } from "@/redux/hooks";
import { userInfoThunk } from "@/redux/userSlice";
import accountAPI from "@/services/account";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const KYCUploadImage = () => {
  const imgFrontIDCardRef = useRef<any>(null);
  const imgBackIDCardRef = useRef<any>(null);
  const imgPortraitRef = useRef<any>(null);
  const [frontIDCard, setFrontIDCard] = useState<string>("");
  const [backIDCard, setBackIDCard] = useState<string>("");
  const [portraitImg, setPortraitImg] = useState<string>("");
  const checkValid = !!frontIDCard && !!backIDCard && !!portraitImg;
  const [errCode, setErrCode] = useState<Number>(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleUploadImage = async () => {
    if (frontIDCard && backIDCard && portraitImg) {
      const VerifyAccountParams = {
        PassportType: 1,
        Picture1: frontIDCard?.split(",")?.[1],
        Picture2: backIDCard?.split(",")?.[1],
        Picture3: portraitImg?.split(",")?.[1],
      };
      try {
        const response = await accountAPI.verifyAccount(VerifyAccountParams);
        if (response?.data?.code >= 0) {
          toastSuccess(
            "Yêu cầu của bạn sẽ được xét duyệt trong 12 tiếng",
            {},
            2000
          );
          dispatch(userInfoThunk());
          router.push("/thong-tin-tai-khoan");
        }
      } catch (error: any) {
        setErrCode(error?.response?.data?.code);
        toastError("Xác thực thất bại", {}, 2000);
      }
    }
  };

  return (
    <>
      <p className="bg-[#3079DB] w-full text-white pt-2 pb-3 font-bold uppercase text-lg text-center mb-5 md:h-11 break-words ">
        Xác thực tài khoản để sử dụng nhiều dịch vụ hơn
      </p>
      <div className="p-3 border-[#f89736] border-dashed border-2 bg-[#fff4e7]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#f8462e] font-bold text-center text-lg">
            LƯU Ý KHI TẢI ẢNH CHÂN DUNG & GIẤY TỜ TÙY THÂN
          </p>
          <div className="max-w-screen-md my-4 mx-auto">
            <div className="flex">
              <img
                src="/icons/icon-tick-active.svg"
                width={20}
                height={20}
                className="mr-3"
              />
              Giấy tờ còn hạn sử dụng, là giấy tờ gốc, không phải scan hoặc
              photocopy
            </div>
            <div className="flex">
              <img
                src="/icons/icon-tick-active.svg"
                width={20}
                height={20}
                className="mr-3"
              />
              Không để ánh sáng lóa giấy tờ khi quay, chụp
            </div>
            <div className="flex">
              <img
                src="/icons/icon-tick-active.svg"
                width={20}
                height={20}
                className="mr-3"
              />
              Không tải ảnh giấy tờ mất góc, bị nhòe.
            </div>
            <div className="flex">
              <img
                src="/icons/icon-tick-active.svg"
                width={20}
                height={20}
                className="mr-3"
              />
              Ảnh ở định dạng *.jpg, *.jpeg, *.png, *.gif và tối đa 15MB
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="uppercase font-bold my-5">Tải lên ảnh giấy tờ tùy thân</p>
        {errCode < 0 && <ErrorMessage code={errCode} />}
        <div className="md:flex md:flex-wrap md:justify-around w-full justify-center mx-auto">
          <UploadFile
            className="bg-[#EEF1F6] md:m-1 m-2 rounded-2xl h-[calc(224px)] md:w-[calc(375px)] shadow"
            imageRef={imgFrontIDCardRef}
            imageStyles="object-cover h-[calc(224px)] md:w-[calc(375px)] w-full rounded-2xl"
            setData={setFrontIDCard}
            showCloseButton={true}
            callback={() => setFrontIDCard("")}
          >
            <div
              className="bg-[#eef1f6] items-center h-[calc(224px)] md:w-[calc(375px)] w-full justify-center flex flex-col rounded-2xl cursor-pointer"
              onClick={() => imgFrontIDCardRef.current.click()}
            >
              <Image
                src="/icons/icon-id-card.svg"
                width={46}
                height={40}
                alt="id"
              />
              <p className="text-[#919191] mt-1">
                Ảnh mặt trước CMND/ CCCD/ trang 2 hộ chiếu{" "}
              </p>
            </div>
          </UploadFile>
          <UploadFile
            className="md:m-1 m-2 rounded-2xl h-[calc(224px)] md:w-[calc(375px)] shadow"
            imageRef={imgBackIDCardRef}
            imageStyles="object-cover h-[calc(224px)] md:w-[calc(375px)] w-full rounded-2xl"
            setData={setBackIDCard}
            showCloseButton={true}
            callback={() => setBackIDCard("")}
          >
            <div
              className="bg-[#eef1f6] items-center md:w-[calc(375px)] w-full h-[calc(224px)] justify-center flex flex-col rounded-2xl cursor-pointer"
              onClick={() => imgBackIDCardRef.current.click()}
            >
              <Image
                src="/icons/icon-id-card.svg"
                width={46}
                height={40}
                alt="id"
              />
              <p className="text-[#919191] mt-1">
                Ảnh mặt trước CMND/ CCCD/ trang 3 hộ chiếu{" "}
              </p>
            </div>
          </UploadFile>
        </div>

        <p className="uppercase font-bold my-5">Tải lên ảnh chân dung</p>
        <UploadFile
          className="bg-[#EEF1F6] md:m-1 m-2 rounded-2xl h-[calc(224px)] md:w-[calc(375px)] shadow"
          imageRef={imgPortraitRef}
          imageStyles="object-cover h-[calc(224px)] md:w-[calc(375px)] w-full rounded-2xl"
          setData={setPortraitImg}
          showCloseButton={true}
          callback={() => setPortraitImg("")}
        >
          <div
            className="bg-[#eef1f6] items-center h-[calc(224px)] justify-center flex flex-col rounded-2xl cursor-pointer"
            onClick={() => imgPortraitRef.current.click()}
          >
            <Image
              src="/icons/icon-id-card.svg"
              width={46}
              height={40}
              alt="id"
            />
            <p className="text-[#919191] mt-1">Ảnh chân dung </p>
          </div>
        </UploadFile>
      </div>
      <button
        className={`bg-[#f89736] rounded w-full text-white pt-2 pb-3 font-bold uppercase text-lg 
        my-10 h-11 ${!checkValid && "opacity-30"}`}
        disabled={!checkValid}
        onClick={() => handleUploadImage()}
      >
        Hoàn tất
      </button>
    </>
  );
};
export default KYCUploadImage;
