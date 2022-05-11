// import InputText from "@/components/Form/InputText";
// import { validateEmail, validatePhone } from "@/constants/validate";
// import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React from "react";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import InputTextArea from "@/components/Form/inputTextArea";

// type Inputs = {
//   fullname: string;
//   phone: string;
//   email: string;
//   content: string;
// };

// const schema = yup
//   .object({
//     fullname: yup.string().trim().required("Hãy nhập Họ và tên"),
//     email: validateEmail,
//     phone: validatePhone,
//     content: yup.string(),
//   })
//   .required();

const ContactContainer = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>({
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  // });
  // const onSubmit = (data: Inputs) => {
  //   console.log(data);
  // };

  return (
    <div className="mt-[54px] container mx-auto max-w-screen-xl px-5">
      <h1
        className="uppercase font-bold text-black text-xl pt-8 pb-2 relative block pr-3 border-b border-[#E5E5E5]
        before:content-[''] before:w-20 before:absolute before:bottom-0
        before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]"
      >
        Liên hệ
      </h1>
      <div className="w-full mt-4 relative ">
        <iframe
          title="captcha"
          className="w-full h-[450px]"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5823376305193!2d105.8531938145789!3d21.009372893816515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab906e04a829%3A0x8bf9545f0edf662!2sFTECH+CO.%2C+LTD!5e0!3m2!1sen!2s!4v1565755335321!5m2!1sen!2s"
        ></iframe>
        {/* <div className="w-5/6 mx-auto absolute -bottom-64 right-0 left-0 bg-white shadow p-6">
          <h4 className="uppercase font-bold text-xl text-center mb-3">
            Liên hệ với chúng tôi
          </h4>
          <form
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              register={register("fullname")}
              placeholder="Họ tên *"
              error={errors.fullname}
              defaultValue=""
              classNameInput="w-full !bg-white border border-[#E5E5E5]"
              className="w-full"
            />
            <InputText
              register={register("email")}
              placeholder="Email *"
              error={errors.email}
              defaultValue=""
              classNameInput="w-full !bg-white border border-[#E5E5E5]"
              className="w-full"
            />
            <InputText
              register={register("phone")}
              placeholder="Số điện thoại"
              error={errors.phone}
              defaultValue=""
              classNameInput="w-full !bg-white border border-[#E5E5E5]"
              className="w-full"
            />
            <InputTextArea
              className="w-full h-32 border border-[#E5E5E5] sm:col-span-3"
              classNameInput="!bg-white"
              register={register("content")}
            ></InputTextArea>
            <button
              className="w-full my-2 h-10 bg-[#f89736] sm:col-span-3 sm:col-start-2 sm:col-end-2 text-white font-semibold flex item-center justify-center p-2 gap-2"
              type="submit"
            >
              <Image src="/icons/icon-send.svg" width={15} height={23} />
              Gửi đi
            </button>
          </form>
        </div> */}
      </div>
      <div className="flex flex-col sm:flex-row w-full justify-between gap-4 my-20">
        <div className="sm:w-1/3 px-4  h-32 border border-[#E5E5E5]">
          <h4 className="mx-auto py-2 border-b border-[#E5E5E5] text-[#f89736] font-semibold flex items-center gap-2">
            <Image src="/icons/icon-address.svg" width={15} height={18} />
            Địa chỉ
          </h4>
          <p className="py-2">
            Tầng 6, Toà nhà eTown 2, 364 đường Cộng Hòa, Phường 13 Quận Tân Bình
          </p>
        </div>
        <div className="sm:w-1/3 px-4 h-32 border border-[#E5E5E5]">
          <h4 className="mx-auto py-2 border-b border-[#E5E5E5] text-[#f89736] font-semibold flex items-center gap-2">
            <Image src="/icons/icon-email.svg" width={15} height={18} />
            Email
          </h4>
          <p className="text-[#3079DB] font-medium py-2">info@funzy.vn</p>
        </div>
        <div className="sm:w-1/3 px-4 h-32 border border-[#E5E5E5]">
          <h4 className="mx-auto py-2 border-b border-[#E5E5E5] text-[#f89736] font-semibold flex items-center gap-2">
            <Image src="/icons/icon-hotline.svg" width={15} height={18} />
            Hotline
          </h4>
          <p className="py-2">
            Tổng đài:{" "}
            <span className="text-[#3079DB] font-semibold">1900636919</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
