import { useAppSelector } from "@/redux/hooks";
import { getMoneyUpLevel, selectUserInfo } from "@/redux/userSlice";
import { formatCurrency } from "@/utils/index";
import { getImageDomain } from "@/utils/getImageDomain";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DiscountPolicyContainer = () => {
  const user = useAppSelector(selectUserInfo);
  const userAgency = useAppSelector(getMoneyUpLevel);
  return (
    <>
      <div className="border-[0.5px] border-gray-300 p-3">
        <div className="mb-3 flex">
          <div>
            <Image
              src={
                user?.avatar
                  ? getImageDomain(user?.avatar)
                  : `/images/avatar.png`
              }
              alt="avt"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
          <div className="ml-5">
            <p className="text-lg font-bold">
              {user?.fullname} -{" "}
              {user?.accountType === 2 ? "Đại lý" : "Cá nhân"}
            </p>
            {user?.accountType === 1 && (
              <p>
                Trở thành đại lý để được hưởng nhiều chính sách ưu đãi và chiết
                khấu từ Fcard.
              </p>
            )}
            {user?.accountType === 1 ? (
              <Link href="/xac-thuc-tai-khoan?step=1">
                <a className="flex text-white hover:scale-105 bg-red-600 rounded-lg px-5 py-2 uppercase max-w-fit mt-2">
                  <Image
                    src="/icons/icon-agency.svg"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                  <p className="pl-2"> Nâng cấp đại lý</p>
                </a>
              </Link>
            ) : (
              <Link href="/thong-bao-nap-tien">
                <a className="flex text-white hover:scale-105 bg-green-600 rounded-lg px-5 py-2 uppercase w-[117px] mt-2">
                  <p className="pl-2"> nạp tiền</p>
                </a>
              </Link>
            )}
          </div>
        </div>
        <hr />
        <div className="my-3">
          {user?.accountType === 2 && (
            <>
              <div className="justify-between flex font-bold mb-3">
                <div className="flex">
                  Số tiền đã ký quỹ:
                  <p className="text-[#f89736]  ml-2">
                    {formatCurrency(user.balanceMonth)} VND
                  </p>
                </div>
                <p>
                  Đại lý cấp {userAgency.agencyNext || userAgency.agencyCurrent}
                </p>
              </div>
              <div className="relative w-full mb-3">
                <div className="bg-[#eef1f6] rounded-xl h-3" />
                <div
                  style={{ width: `${userAgency.progress}%` }}
                  className={`bg-[#f89736] rounded-xl h-3 absolute top-0 left-0`}
                />
              </div>
            </>
          )}
          {userAgency.agencyNext && (
            <span>
              Bạn cần chuyển thêm{" "}
              <span className="text-[#f89736] font-bold">
                {formatCurrency(userAgency.moneyToLevelUp)}đ
              </span>{" "}
              để thành{" "}
              <span className="font-bold">
                đại lý Cấp {userAgency.agencyNext}
              </span>
            </span>
          )}
        </div>
      </div>
      <div>
        <table
          className={`w-full mt-2 border border-gray-200 shadow text-center`}
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
export default DiscountPolicyContainer;
