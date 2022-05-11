export const listItemBuyCard = [
  {
    id: 1,
    link: "/thong-bao-nap-tien",
    srcImage: "/icons/icon-bell",
    text: "Thông báo nạp tiền",
  },
  {
    id: 2,
    link: "/danh-sach-ngan-hang",
    srcImage: "/icons/icon-bank",
    text: "Danh sách ngân hàng",
  },
  {
    id: 3,
    link: "/chinh-sach-chiet-khau",
    srcImage: "/icons/icon-payment-policy",
    text: "Chính sách chiết khấu",
  },
];

export const listItemAcount = [
  {
    id: 1,
    link: "/thong-tin-tai-khoan",
    srcImage: "/icons/icon-user",
    text: "Thông tin tài khoản",
  },
  {
    id: 2,
    link: "/doi-mat-khau",
    srcImage: "/icons/icon-lock",
    text: "Đổi mật khẩu",
  },
  {
    id: 3,
    link: "/doi-email",
    srcImage: "/icons/icon-lock",
    text: "Đổi E-mail",
  },
];

export const subProviders = [
  {
    id: 1,
    name: "Garena",
    image: `/images/card-garena.png`,
  },
  {
    id: 2,
    name: "GATE",
    image: `/images/card-gate.png`,
  },
  {
    id: 3,
    name: "FunCard",
    image: `/images/card-fun.png`,
  },
  {
    id: 4,
    name: "Vcoin",
    image: `/images/card-vcoin.png`,
  },
  {
    id: 5,
    name: "Gosu",
    image: `/images/card-gosu.png`,
  },
  {
    id: 6,
    name: "Sonha",
    image: `/images/card-sonhacoin.png`,
  },
  {
    id: 7,
    name: "Zing",
    image: `/images/card-zing.png`,
  },
  {
    id: 8,
    name: "VGP",
    image: `/images/card-vgp.png`,
  },
  {
    id: 9,
    name: "ONCASH",
    image: `/images/card-oncash.png`,
  },
];

export const cardValues = [
  {
    id: 1,
    name: "10000",
    value: 10000,
  },
  {
    id: 2,
    name: "20000",
    value: 20000,
  },
  {
    id: 3,
    name: "50000",
    value: 50000,
  },
  {
    id: 4,
    name: "100000",
    value: 100000,
  },
  {
    id: 5,
    name: "200000",
    value: 200000,
  },
  {
    id: 6,
    name: "500000",
    value: 500000,
  },
];

export const paymentMethods = [
  {
    id: 1,
    name: "VNpay",
    image: `/images/payment-vnpay.png`,
  },
  {
    id: 2,
    name: "momo",
    image: `/images/payment-momo.png`,
  },
  {
    id: 3,
    name: "viettel",
    image: `/images/payment-viettel.png`,
  },
  {
    id: 4,
    name: "nganluong",
    image: `/images/payment-nganluong.png`,
  },
];

export const paymentMethodAtms = [
  {
    id: 5,
    name: "vietcom",
    image: `/images/payment-vietcombank.png`,
  },
  {
    id: 6,
    name: "viettin",
    image: `/images/payment-viettin.png`,
  },
  {
    id: 7,
    name: "bidv",
    image: `/images/payment-bidv.png`,
  },
  {
    id: 8,
    name: "agri",
    image: `/images/payment-agri.png`,
  },
  {
    id: 9,
    name: "teck",
    image: `/images/payment-teck.png`,
  },
  {
    id: 10,
    name: "hdbank",
    image: `/images/payment-hdbank.png`,
  },
];

export const listItemGuide = [
  // {
  //   id: 1,
  //   subLink: "/mua-the",
  //   srcImage: "/icons/icon-card",
  //   text: "Mua thẻ",
  // },
  // {
  //   id: 2,
  //   subLink: "/nang-cap-dai-ly",
  //   srcImage: "/icons/icon-store",
  //   text: "Nâng cấp đại lý",
  // },
  // {
  //   id: 3,
  //   subLink: "/nap-tien",
  //   srcImage: "/icons/icon-money",
  //   text: "Nạp tiền",
  // },
  {
    id: 4,
    subLink: "/cau-hoi-thuong-gap",
    srcImage: "/icons/icon-question",
    text: "Câu hỏi thường gặp",
  },
];
export const listQuestion = [
  {
    id: 1,
    question:
      "Tôi có thể kiểm tra được thông tin giao dịch của mình được không? Nếu được thì kiểm tra ở đâu ?",
    desc: 'Bạn có thể kiểm tra các thông tin về quá trình bán hàng thông qua các chức năng "Giao dịch"',
    answer:
      '<p>Bạn có thể kiểm tra các thông tin về quá trình bán hàng thông qua các chức năng "Giao dịch" </p>',
    slug: "kiem-tra-giao-dich",
  },
  {
    id: 2,
    question: "Khi bị mất mật khẩu tôi phải làm gì để có thể lấy lại ?",
    desc: 'Khi bị mất mật khẩu Fcard, Bạn có thể sử dụng chức năng "Quên Mật Khẩu" ở trang chủ của trang web "https://f365.com.vn".',
    answer:
      '<p>Khi bị mất mật khẩu Fcard, Bạn có thể sử dụng chức năng "Quên Mật Khẩu" ở trang chủ của trang web "https://f365.com.vn".</p>',
    slug: "quen-mat-khau",
  },
  {
    id: 3,
    question: "Tôi là Đại lý và muốn nạp thì thực hiện như thế nào ?",
    desc: 'Bạn có thể chọn "Nạp tiền" => Gửi thông báo nạp tiền => Thực hiện chuyển khoản đến Số tài khoản của Fcard => Phê duyệt nạp tiền thành công.',
    answer:
      '<p>Bạn có thể chọn "Nạp tiền" => Gửi thông báo nạp tiền => Thực hiện chuyển khoản đến Số tài khoản của Fcard => Phê duyệt nạp tiền thành công.</p>',
    slug: "nap-tien-dai-ly",
  },
  {
    id: 4,
    question: "Làm thế nào để tôi đăng ký làm đại lý Fcard ?",
    desc: 'Bạn vui lòng chọn "Nâng cấp đại lý" sau đó thực hiện chụp ảnh giấy tờ tùy thân (CCCS/CMND/HC) và ảnh khuôn mặt để Fcard xác thực người dùng là có thể trở thành đại lý của Fcard.',
    answer:
      '<p>Bạn vui lòng chọn "Nâng cấp đại lý" sau đó thực hiện chụp ảnh giấy tờ tùy thân (CCCS/CMND/HC) và ảnh khuôn mặt để Fcard xác thực người dùng là có thể trở thành đại lý của Fcard.</p>',
    slug: "nang-cap-dai-ly",
  },
  {
    id: 5,
    question: "Vì sao tôi bị giảm cấp đại lý ?",
    desc: "Hệ thống tính cấp đại lý của Fcard dựa trên số dư tối đa trong tháng trong tài khoản của quý khách, nên sau mỗi tháng cấp đại lý sẽ được đặt lại dựa trên số dư ngày đầu tiên của tháng.",
    answer:
      "<p>Hệ thống tính cấp đại lý của Fcard dựa trên số dư tối đa trong tháng trong tài khoản của quý khách, nên sau mỗi tháng cấp đại lý sẽ được đặt lại dựa trên số dư ngày đầu tiên của tháng.</p>",
    slug: "giam-cap-dai-ly",
  },
];

type typeNotifyParam = {
  [key: number]: any;
};

export const typeNotify: typeNotifyParam = {
  0: {
    id: 0,
    name: "Hệ thống",
    icon: "/icons/icon-transaction.svg",
    color: "#32C36A",
  },
  1: {
    id: 1,
    name: "Nạp tiền",
    icon: "/icons/icon-recharge.svg",
    color: "#F8462E",
    link: "/giao-dich?type=1",
  },
  2: {
    id: 2,
    name: "Mua mã thẻ",
    icon: "/icons/icon-card.svg",
    color: "#2C71FA",
    link: "/giao-dich?type=2",
  },
  3: {
    id: 3,
    name: "Tài khoản",
    icon: "/icons/icon-account.svg",
    color: "#f89736",
  },
};

type agencyLevel = {
  [key: number]: number;
};
export const agencyLevelByMoney: agencyLevel = {
  1: 100000000,
  2: 10000000,
  3: 1000000,
};
