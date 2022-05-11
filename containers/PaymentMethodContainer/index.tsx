import paymentAPI from "@/services/payment";
import React, { useEffect, useState } from "react";

const PaymentMethodContainer = () => {
  const [listBank, setListBank] = useState<Array<Object>>([]);
  const getBankAccount = () => {
    paymentAPI
      .getBanks()
      .then((res) => {
        setListBank(res?.data?.data);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => getBankAccount(), []);
  const renderBankItem = (item: any) => (
    <div
      key={item.id}
      className="bg-[#eef1f6] mt-3 mx-3 text-left cursor-pointer w-[277px]"
    >
      <p className="text-[#141ed2] text-sm font-bold p-1">{item.bankName}</p>
      <div className="bg-[#182537] text-white p-3 text-left">
        <p>Chủ tài khoản: {item.bankOwnerName}</p>
        <p>Số tài khoản: {item.bankAccountNumber}</p>
        <p>Chi nhánh: {item.bankBranch}</p>
      </div>
    </div>
  );
  return (
    <>
      <div className="bg-[#eef1f6]">
        <div className="container place-content-center mx-auto py-4 text-center">
          <p className="uppercase font-bold text-xl">Nội dung chuyển khoản</p>
          <p className="text-red-600 font-semibold text-2xl my-2">
            NAP [MÃ YÊU CẦU THÔNG BÁO NẠP TIỀN]
          </p>
          <p>Ví dụ: NAP F01234</p>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="uppercase font-bold text-base mb-10">
          Ngân hàng hỗ trợ thanh toán
        </p>
        <div className="md:flex md:flex-wrap w-full ">
          {listBank.map((item) => renderBankItem(item))}
        </div>
      </div>
    </>
  );
};
export default PaymentMethodContainer;
