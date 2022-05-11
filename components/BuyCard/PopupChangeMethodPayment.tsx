import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import SubProvider from "./SubProvider";

type PropsComponent = {
  show: boolean;
  setShow: Function;
  handleSelectPaymentMethod: Function;
  paymentMethodAtms: Array<any>;
};

const PopupChangeMethodPayment = ({
  show,
  setShow,
  handleSelectPaymentMethod,
  paymentMethodAtms = [],
}: PropsComponent) => {
  const [paymentSelect, setPaymentSelect] = useState<any>({});
  const handleConfirmSelectPaymentMethod = () => {
    handleSelectPaymentMethod(paymentSelect);
    setShow(false);
  };
  useEffect(() => {
    setPaymentSelect(paymentMethodAtms?.[0]);
  }, [paymentMethodAtms]);
  return (
    <Modal open={show} handleClose={() => setShow(false)} center={true}>
      <div className="bg-white w-full max-w-2xl mx-4 my-10 relative z-30">
        <button
          className="absolute text-white right-0 -top-7"
          onClick={() => setShow(false)}
        >
          Đóng
        </button>
        <div className="">
          <h1 className="py-3 bg-[#3079DB] font-bold text-base text-[#ffffff] text-center uppercase">
            Thay đổi kênh thanh toán
          </h1>
          {/* <div className="bg-[#EEF1F6] py-2 px-5">
            <h4 className="font-semibold text-base">
              Ví điện tử, quét mã thanh toán
            </h4>
          </div>
          <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-[calc(150px)] md:max-h-[calc(250px)]">
            {paymentMethods?.map((item, inx) => (
              <SubProvider
                item={item}
                active={paymentSelect?.id === item?.id}
                key={inx}
                handleSelect={() => setPaymentSelect(item)}
              />
            ))}
          </div> */}
          <div className="bg-[#EEF1F6] py-2 px-5">
            <h4 className="font-semibold text-base">Ngân hàng nội địa</h4>
          </div>
          <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-[calc(150px)] ">
            {paymentMethodAtms?.map((item) => (
              <SubProvider
                item={item}
                active={paymentSelect?.bankAccountID === item?.bankAccountID}
                key={item?.bankAccountID}
                handleSelect={() => setPaymentSelect(item)}
              />
            ))}
          </div>
          <div className="my-4 text-center">
            <button
              className="rounded px-8 py-3 bg-[#f79636] hover:bg-[#ec8200] text-[#ffffff] font-semibold uppercase"
              onClick={handleConfirmSelectPaymentMethod}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupChangeMethodPayment;
