import Modal from "@/components/Modal";
import Image from "next/image";
import React from "react";

type PrintCardProps = {
  openModal: boolean;
  handleClickModal: Function;
  handleCloseModal: Function;
};
const PrintCardModal = ({
  openModal,
  handleCloseModal,
  handleClickModal,
}: PrintCardProps) => {
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
          Chọn mẫu in
        </div>
        <div className="w-full flex flex-col gap-4 p-8">
          <button
            className="w-full uppercase bg-[#EEF1F6] p-1 min-w-[150px] flex justify-center gap-1 items-center text-[#3079DB] font-semibold"
            onClick={() => handleClickModal("heat")}
          >
            <Image src="/icons/icon-print.svg" width={16} height={36} />
            In thẻ trên máy in nhiệt
          </button>
          <button
            className="w-full uppercase bg-[#EEF1F6] p-1 min-w-[150px] flex justify-center gap-1 items-center text-[#3079DB] font-semibold"
            onClick={() => handleClickModal("A4")}
          >
            <Image src="/icons/icon-print.svg" width={16} height={36} />
            In thẻ trên trang A4 (in dọc)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintCardModal;
