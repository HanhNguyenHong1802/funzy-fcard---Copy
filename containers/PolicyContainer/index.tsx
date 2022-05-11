import Link from "next/link";
import React from "react";

const PolicyContainer = () => {
  return (
    <>
      <div
        className="items-center w-full container mt-20 max-w-screen-md mx-auto"
        style={{ minHeight: `100vh` }}
      >
        <div className="text-center p-3 border-[#f89736] border-dashed border-2 bg-[#f5f5f5] mb-10">
          <div className="max-w-xl mx-auto py-4">
            <span className="text-xl font-bold">
              Khách hàng là đại lý tiến hành chuyển ít nhất{" "}
              <span className="text-[#f89736]">1.000.000đ</span>
              <div className="text-base font-normal">
                <span className="text-[#515151]">
                  vào 1 trong số các ngân hàng nhận tiền của
                </span>
                <Link href="https://fcard.funzy.vn">
                  <a className="text-[#3079DB]"> fcard.funzy.vn </a>
                </Link>
              </div>
            </span>
          </div>
        </div>

        <table
          className={`w-full mt-5 border border-gray-200 shadow text-center`}
        >
          <thead>
            <tr className="bg-[#3079DB] h-10 text-white text-md py-3">
              <th colSpan={4}>Chính sách chiết khấu</th>
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
export default PolicyContainer;
