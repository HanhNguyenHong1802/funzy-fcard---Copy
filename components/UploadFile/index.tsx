import { toastError } from "@/utils/toast";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
  imageStyles: string;
  width?: number;
  height?: number;
  defaultImage?: string;
  className?: string;
  imageRef?: any;
  setData?: Function;
  showCloseButton?: Boolean;
  isAvt?: boolean;
  nameRender?: string;
  callback?: Function;
};

const useDisplayImage = () => {
  const [result, setResult] = useState<any>("");

  const uploader = (e: any) => {
    const imageFile = e?.target?.files[0];
    const fileExtension = imageFile?.name?.split(".")?.at(-1);
    const allowedFileTypes = ["jpg", "png", "jpeg", "gif"];
    if (!fileExtension) return;
    else if (!allowedFileTypes.includes(fileExtension)) {
      toastError("Ảnh không dúng định dạng");
    } else if (imageFile && allowedFileTypes.includes(fileExtension)) {
      const reader = new FileReader();
      reader.addEventListener("load", (e: any) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    } else {
      setResult(null);
    }
  };
  return { result, uploader, setResult };
};

const UploadFile = ({
  children,
  imageStyles,
  width,
  height,
  defaultImage,
  className,
  imageRef,
  setData,
  showCloseButton = false,
  isAvt = false,
  nameRender,
  callback,
}: Props) => {
  const { result, uploader, setResult } = useDisplayImage();

  useEffect(() => {
    if (setData && typeof setData === "function") {
      setData(result);
    }
  }, [result]);

  const handleRemoveImage = () => {
    setResult(null);
    imageRef.current.value = "";
    callback && callback();
  };

  return (
    <div className={`relative ${className ? className : ``}`}>
      <div className="absolute cursor-pointer z-[5] w-full">
        {result || defaultImage ? (
          <img
            src={result || defaultImage}
            alt="avt"
            className={imageStyles ? imageStyles : ``}
            onClick={() => imageRef.current.click()}
            style={{ width: width, height: height }}
          />
        ) : (
          isAvt && (
            <div
              className="rounded-full w-[90px] h-[90px] cursor-pointer bg-[#f89736] flex items-center text-4xl text-[#FFFFFF] font-bold justify-center"
              onClick={() => imageRef.current.click()}
            >
              {nameRender}
            </div>
          )
        )}
      </div>
      <input
        type="file"
        accept="image/x-png,image/gif,image/jpeg,image/jpg"
        onChange={uploader}
        multiple={false}
        className="hidden"
        ref={imageRef}
      />
      {children}
      {showCloseButton && (
        <div
          className="absolute top-2 right-2 cursor-pointer"
          hidden={!result}
          onClick={handleRemoveImage}
        >
          <Image
            src="/icons/icon-close-white.svg"
            width={20}
            height={20}
            className="rounded-full bg-black p-1 z-[5]"
          />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
