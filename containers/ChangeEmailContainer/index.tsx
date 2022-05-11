import ErrorMessage from "@/components/ErrorMessage";
import InputText from "@/components/Form/InputText";
import { validateEmail } from "@/constants/validate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUserInfo, userInfoThunk } from "@/redux/userSlice";
import accountAPI from "@/services/account";
import { toastSuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormProps = {
  email: string;
};

const schema = yup
  .object({
    email: validateEmail,
  })
  .required();

const ChangeEmailContainer = () => {
  const user = useAppSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    resetField,
    watch,
  } = useForm<FormProps>({ mode: "onChange", resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [errCode, setErrCode] = useState<Number>(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormProps) => {
    if (isValid && isDirty) {
      setLoading(true);
      accountAPI
        .updateEmail(data?.email)
        .then((resMail) => {
          if (resMail?.data?.code >= 0) {
            toastSuccess("Thay đổi email thành công", {}, 3000);
            resetField("email");
            dispatch(userInfoThunk());
            router.push("/thong-tin-tai-khoan");
          }
        })
        .catch((error) => {
          setErrCode(error?.response?.data?.code);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setErrCode(0);
  }, [watch("email")]);

  return (
    <>
      <div className="w-full max-w-screen-xl flex">
        <div className="w-full">
          <div className="border-b border-[#E5E5E5] ">
            <div className="text-2xl text-[#182537] font-semibold">
              <span>Đổi E-mail</span>
            </div>
            <p className="text-base my-2 text-[#515151]">
              Bạn nên sử dụng email của chính mình để tránh bị đánh cắp thông
              tin!
            </p>
          </div>
          <div className="md:w-[calc(425px)] mt-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-1 justify-center"
            >
              <div className="mb-2">
                <label className="block text-gray-700 text-md font-medium mb-2">
                  Email hiện tại:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="rounded-md bg-[#eef1f6] md:w-[calc(425px)] p-3 w-full h-[44px]"
                    defaultValue={user?.email}
                    disabled={true}
                    placeholder="Email hiện tại"
                  />
                </div>
              </div>

              <InputText
                register={register("email")}
                placeholder="Email mới"
                error={errors.email}
                classNameInput="bg-white md:w-[calc(425px)] p-4 border-[#eef1f6] w-full"
                label="Email mới(*):"
                className="my-2"
              />
              {errCode < 0 && <ErrorMessage code={errCode} />}
              <input
                type="submit"
                value={loading ? "Đang xử lý..." : "CẬP NHẬT"}
                disabled={!isDirty || !isValid || loading}
                className={`cursor-pointer text-[#ffffff] text-base uppercase font-bold bg-[#f89736] py-3 rounded-md w-full md:w-[calc(425px)] mt-2 ${
                  !isDirty || !isValid ? "opacity-30" : ""
                }`}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeEmailContainer;
