import React from "react";
import InputPassword from "@/components/Form/InputPassword";
import Modal from "@/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type PrintCardProps = {
  openModal: boolean;
  handleCloseModal: Function;
  handleSubmitModal: Function;
};
type FormProps = {
  password: string;
};

const schema = yup
  .object({
    password: yup
      .string()
      .required(`Giá trị này là bắt buộc`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,30})/,
        "Vui lòng nhập mật khẩu dài 6-30 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
      ),
  })
  .required();
const EnterPasswordModal = ({
  openModal,
  handleCloseModal,
  handleSubmitModal,
}: PrintCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormProps) => {
    handleSubmitModal();
  };
  return (
    <Modal open={openModal} handleClose={handleCloseModal}>
      <div className="container max-w-sm m-auto sm:max-w-lg shadow z-20 bg-white mt-12 relative">
        <p
          className="absolute right-0 -top-8 text-white cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          Đóng
        </p>
        <div className="h-70 w-full uppercase text-white bg-[#3079DB] p-4 text-center font-semibold">
          Nhập mật khẩu
        </div>
        <div className="w-full flex flex-col gap-4 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputPassword
              register={register("password")}
              placeholder="Mật khẩu"
              label="Mật khẩu(*)"
              error={errors?.password}
            />
            <button
              type="submit"
              className={`w-full mt-4 uppercase bg-[#F89736] p-3 min-w-[150px] rounded-md flex justify-center gap-1 items-center text-white font-semibold ${
                !isValid ? "opacity-30" : ""
              }`}
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EnterPasswordModal;
