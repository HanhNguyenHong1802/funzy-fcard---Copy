import * as yup from "yup";

export const validateConfirmPassword = (field = "newPassword") => {
  return yup
    .string()
    .required(`Xác nhận mật khẩu không được để trống.`)
    .max(
      32,
      "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
    )
    .oneOf([yup.ref(field), null], "Mật khẩu nhập lại không khớp.");
};

export const validateFullname = yup
  .string()
  .required("Họ và tên không được để trống")
  .min(4, "Vui lòng nhập đúng và đầy đủ họ tên của bạn.")
  .max(100, "Họ và tên phải dưới 100 ký tự.")
  .matches(
    /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,}(?: [a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+){1,}$/,
    "Vui lòng nhập đúng và đầy đủ họ tên của bạn."
  );

export const validatePassword = yup
  .string()
  .required(`Mật khẩu không được để trống.`)
  .max(
    32,
    "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
  )
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,32})/,
    "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
  );

export const validateNewPassword = (field = "oldPassword") => {
  return yup
    .string()
    .required(`Mật khẩu không được để trống.`)
    .max(
      32,
      "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,32})/,
      "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
    )
    .notOneOf(
      [yup.ref(field), null],
      "Mật khẩu mới không được trùng mật khẩu cũ gần nhất."
    );
};

export const validateEmail = yup
  .string()
  .required("Hãy nhập Email.")
  .max(318)
  .email(" Email không đúng định dạng.");

export const validatePhone = yup
  .string()
  .required("Hãy nhập số điện thoại")
  .min(10, "Số điện thoại phải gồm 10 chữ số.")
  .max(10, "Số điện thoại không tồn tại.");
export const validateCaptcha = yup.string().required("Hãy nhập mã Captcha");
