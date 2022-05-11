import Image from "next/image";
import React from "react";

const KYCDiscountPolicy = () => {
  return (
    <>
      <h1 className="text-[#f89736] font-bold text-xl uppercase text-center">
        Nâng cấp tài khoản đại lý
      </h1>
      <div className="max-w-screen-md my-8 mx-auto">
        <div className="flex gap-1 mb-2">
          <Image
            src="/icons/icon-tick-active.svg"
            width={15}
            height={15}
            className="mr-3"
          />
          <p>
            Trở thành Khách hàng đại lý của Fcard để được hưởng mức chiết khấu
            <strong> siêu ưu đãi</strong>
          </p>
        </div>
        <table className={`w-full mt-4 shadow text-center`}>
          <thead>
            <tr className="bg-[#3079DB] h-10 text-white text-md py-3 uppercase">
              <th colSpan={4} style={{ border: "none" }}>
                Chính sách chiết khấu
              </th>
            </tr>
            <tr className="bg-[#f0f0f0]">
              <th className="py-3">Đại lý</th>
              <th>Mức ký quỹ</th>
              <th>Chiết khấu</th>
              <th>Hạn mức mua</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">Cấp 0</td>
              <td>Dưới 1 triệu VND</td>
              <td>0%</td>
              <td>Tối đa bằng số dư hiện có</td>
            </tr>
            <tr>
              <td className="py-3">Cấp 1</td>
              <td>Từ 100 triệu VND trở lên</td>
              <td>7%</td>
              <td>Tối đa bằng mức ký quỹ / tháng</td>
            </tr>
            <tr>
              <td className="py-3">Cấp 2</td>
              <td>Từ 10 đến dưới 100 triệu VND </td>
              <td>5%</td>
              <td>Tối đa bằng mức ký quỹ / tháng</td>
            </tr>
            <tr>
              <td className="py-3">Cấp 3</td>
              <td>Từ 1 đến dưới 10 triệu VND </td>
              <td>3%</td>
              <td>Tối đa bằng mức ký quỹ / tháng</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-1 my-4">
          <Image
            src="/icons/icon-tick-active.svg"
            width={15}
            height={15}
            className="mr-3"
          />
          <p>
            Thủ tục <strong>nhanh chóng, dễ dàng,</strong> hai bước duy nhất
          </p>
        </div>
        <div className="flex mb-2 justify-between px-8">
          <div className="text-gray-400">
            <p>Cung cấp:</p>
            <p className="before:content-['•'] ml-2">
              &nbsp;ảnh CMND/ CCCD/ Hộ chiếu
            </p>
            <p className="before:content-['•'] ml-2">&nbsp;ảnh khuôn mặt</p>
          </div>
          <div className="flex items-center">
            <div className="text-[#516BFF] font-medium text-center">
              <p className="mb-2">Xác thực tài khoản</p>
              <Image
                src="/icons/icon-verification-account.svg"
                width={30}
                height={30}
                className=""
              />
            </div>
            <div
              className="w-32 -left-5 h-[1px] bg-[#516BFF] relative before:w-2 before:h-2 before:rounded-full before:absolute before:bg-[#516BFF] before:-top-1
            after:w-2 after:h-2 after:rounded-full after:absolute after:bg-[#516BFF] after:-top-1 after:right-0"
            ></div>
            <div className="text-[#516BFF] font-medium text-center">
              <p>Nạp tiền</p>
              <Image
                src="/icons/icon-cash-multiple.svg"
                width={40}
                height={40}
                className=""
              />
            </div>
          </div>
          <div className="text-gray-400 flex items-center">
            <p>ít nhất 1 triệu đồng</p>
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          <Image
            src="/icons/icon-tick-active.svg"
            width={15}
            height={15}
            className="mr-3"
          />
          <p>
            Hạn mức mua Tối đa bằng mức ký quỹ/ tháng, thanh toán bằng{" "}
            <strong>tài khoản thành viên Fcard</strong>
          </p>
        </div>
      </div>

      <style jsx>{`
        th,
        td {
          border: 1px solid #e5e5e5;
          border-collapse: collapse;
        }
      `}</style>
    </>
  );
};
export default KYCDiscountPolicy;
