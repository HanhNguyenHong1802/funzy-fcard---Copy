import Modal from "@/components/Modal";
import { useAppSelector } from "@/redux/hooks";
import { selectUserInfo } from "@/redux/userSlice";
import Image from "next/image";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import CardPrintDetail from "./CardPrintDetail";

type PrintCardProps = {
  openModal: boolean;
  handleCloseModal: Function;
  data: any;
  typePrint: string;
};
const ExportCardModal = ({
  openModal,
  handleCloseModal,
  data,
  typePrint,
}: PrintCardProps) => {
  const contentRef = useRef(null);
  const user = useAppSelector(selectUserInfo);
  return (
    <Modal open={openModal} handleClose={handleCloseModal}>
      <div className="container max-w-sm sm:max-w-xl md:max-w-3xl xl:max-w-5xl shadow z-20 bg-white m-auto mt-12 relative ">
        <p
          className="absolute right-0 -top-8 text-white cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          Đóng
        </p>
        <div className="h-70 w-full uppercase text-white bg-[#182537] p-4 text-center font-semibold">
          <Image src={"/images/logo.png"} width={156} height={55} />
          <p className="uppercase my-2 text-xl">
            Đại lý cấp {user.agencyType} : Shop thẻ {user.fullname}
          </p>
          <ReactToPrint
            trigger={() => (
              <button className="uppercase bg-[#3079DB] w-32 h-8 px-2 text-white font-semibold rounded-md">
                In thẻ
              </button>
            )}
            content={() => contentRef.current}
          />
        </div>
        <section
          ref={contentRef}
          className="box-border float-left screen-print w-full"
        >
          {data.map((x: any, index: number) => (
            <CardPrintDetail
              key={x.productItemI}
              data={x}
              typePrint={typePrint}
              index={index}
              print={true}
            />
          ))}
        </section>
        <div
          className={`w-full grid grid-cols-1 p-6 gap-6 h-[75vh] overflow-y-auto ${
            typePrint === "A4" ? "sm:grid-cols-2 md:grid-cols-3" : ""
          }`}
        >
          {data.map((x: any, index: number) => (
            <CardPrintDetail
              key={x.productItemI}
              data={x}
              typePrint={typePrint}
              index={index}
              print={false}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ExportCardModal;
