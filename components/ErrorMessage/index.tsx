import React from "react";

type ErrorMessageProps = {
  code?: Number;
  customMessage?: string;
  className?: string;
  data?: string;
  type?: string;
};

const ErrorMessage = ({
  code,
  customMessage = "",
  className,
  data = "",
  type,
}: ErrorMessageProps) => {
  let sms = customMessage;
  if (!customMessage) {
    switch (code) {
      case -7:
        sms = "OTP không chính xác";
        break;
      case -41:
        sms = "Email đã được đăng ký.";
        break;
      case -42:
        sms = "Tài khoản đã tồn tại.";
        break;
      case -46:
        sms = "Tài khoản đã tồn tại.";
        break;
      case -48:
        sms = "Tài khoản đã bị khoá.";
        break;
      case -49:
        sms = "Tài khoản chưa được kích hoạt.";
        break;
      case -50:
        if (type === "FORGOT_PASSWORD") {
          if (data?.includes("@")) {
            sms = "Email chưa được đăng kí !";
          } else {
            if (data.length < 10 || data.length > 10) {
              sms = "SĐT không đúng định dạng. Vui lòng thử lại!";
            } else {
              sms = "SĐT chưa được đăng kí !";
            }
          }
        } else {
          sms = "SĐT chưa được đăng kí !";
          if (data?.includes("@")) {
            sms = "Email chưa được đăng kí !";
          }
        }
        break;
      case -51:
        sms = "Tài khoản không đủ số dư.";
        break;
      case -53:
        sms = "Mật khẩu không đúng.";
        break;
      case -97:
        sms = "Gửi OTP không thành công.";
        break;
      case -99:
        sms = "Lỗi hệ thống.";
        break;
      case -600:
        if (type === "FORGOT_PASSWORD") {
          if (data?.includes("@")) {
            sms = "Email chưa được đăng kí !";
          } else {
            if (data.length < 10 || data.length > 10) {
              sms = "SĐT không đúng định dạng. Vui lòng thử lại!";
            } else {
              sms = "SĐT chưa được đăng kí !";
            }
          }
        } else {
          sms = "Dữ liệu đầu vào không hợp lệ.";
        }
        break;
      case -613:
        sms = "Mật khẩu cũ không chính xác.";
        break;
      case -631:
        sms = "Tài khoản đã được kích hoạt.";
        break;
      case -641:
        sms = "Số điện thoại đã được đăng ký.";
        break;
      case -642:
        sms = "Số điện thoại không hợp lệ.";
        break;
      case -644:
        sms = "Số lần gửi mã xác thực quá giới hạn cho phép(3 lần/ngày).";
        break;
      case -645:
        sms = "Khoảng cách giữa 2 lần gửi OTP liên tiếp phải > 90s. ";
        break;
      case -663:
        sms = "Mật khẩu mới không được trùng mật khẩu cũ gần nhất.";
        break;
      case -10000:
        sms = "Bạn chưa đăng nhập.";
        break;
      case -10001:
        sms = "Thông tin truyền vào không hợp lệ.";
        break;
      case -10002:
        sms = "Số điện thoại không hợp lệ.";
        break;
      case -10003:
        sms = "Mật khẩu không hợp lệ.";
        break;
      case -10004:
        sms = "Tên đầy đủ không hợp lệ.";
        break;
      case -10005:
        sms = "OTP không hợp lệ.";
        break;
      case -10006:
        sms = "Thông tin đã hết hiệu lực.";
        break;
      case -10007:
        sms = "Token không hợp lệ.";
        break;
      case -10008:
        sms = "Captcha không chính xác.";
        break;
      case -10009:
        sms = "Mật khẩu cũ không hợp lệ.";
        break;
      case -10010:
        sms = "Mật khẩu mới không hợp lệ.";
        break;
      case -10011:
        sms = "Tài khoản đã được xác thức.";
        break;
      case -10012:
        sms = "Email đã được xác thức.";
        break;
      case -10013:
        sms = "Tài khoản chưa cập nhận Email.";
        break;
      case -10015:
        sms = "Tài khoản đã được kích hoạt.";
        break;
      case -900000:
        sms =
          "Đăng ký không thành công. Vui lòng kiểm tra kết nối mạng và thử lại.";
        break;
      case -900001:
        sms = "Vui lòng kiểm tra kết nối mạng và thử lại.";
        break;
      default:
        sms = "";
    }
  }
  return (
    <div className={`rounded-sm min-h-12 my-2 ${className ? className : ``}`}>
      <h1 className="text-red-500 text-base font-medium">{sms}</h1>
    </div>
  );
};

export default ErrorMessage;
