import Image from "next/image";
import Link from "next/link";
import React from "react";

const KYCVerifyState = () => {
  return (
    <>
      <div className="mt-20 text-center mx-auto">
        <Image
          src="/icons/icon-tick.svg"
          width={38}
          height={40}
          alt="success"
          className="inline"
        />
        <p className="font-bold mb-8">
          Yêu cầu xác thực của bạn sẽ được xét duyệt trong vòng 12 tiếng
        </p>
        <div className="text-center p-3 border-[#f89736] border-dashed border-2 bg-[#f5f5f5] mb-10">
          <div className="max-w-xl mx-auto">
            <span className="text-sm">
              Nếu bạn có bất cứ thắc mắc hay ý kiến phản hồi nào, vui lòng liên
              hệ với chúng tôi qua số hotline
              <Link href="tel:+1900636919">
                <a className="text-[#3079DB] font-bold text-base">
                  {" "}
                  1900636919{" "}
                </a>
              </Link>
              để được hỗ trợ.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default KYCVerifyState;
