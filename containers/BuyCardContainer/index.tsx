import CardValue from "@/components/BuyCard/CardValue";
import SubProvider from "@/components/BuyCard/SubProvider";
import Title from "@/components/BuyCard/Title";
import Feature from "@/components/Feature";
import InputText from "@/components/Form/InputText";
import Loading from "@/components/Loading";
import { ERROR_CODE } from "@/constants/errorCode";
import {
  validateEmail,
  validateFullname,
  validatePhone,
} from "@/constants/validate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUserInfo, userInfoThunk } from "@/redux/userSlice";
import paymentAPI from "@/services/payment";
import { formatCurrency, formatPhoneNumber } from "@/utils/index";
import { toastError } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  phone: string;
  email: string;
  fullname: string;
};

const schema = yup
  .object({
    phone: validatePhone,
    email: validateEmail,
    fullname: validateFullname,
  })
  .required();

const BuyCardContainer = () => {
  const user = useAppSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [subProvider, setSubProvider] = useState<any>();
  const [cardValue, setCardValue] = useState<any>();
  // const [paymentMethod, setPaymentMethod] = useState<any>();
  // const [listBank, setListBank] = useState<Array<any>>([]);
  const [listCard, setListlistCard] = useState<Array<any>>([]);
  const [listCardDetail, setListCardDetail] = useState<Array<any>>([]);
  const [loading, setLoding] = useState(true);
  const [callApi, setCallApi] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.all([paymentAPI.getBanks(), paymentAPI.getCardCategories()])
      .then(([resBank, resCard]) => {
        // if (resBank?.data?.code >= 0) {
        //   setListBank(resBank?.data?.data);
        //   setPaymentMethod(resBank?.data?.data?.[0]);
        // }
        if (resCard?.data?.code >= 0) {
          setListlistCard(resCard?.data?.data);
          setSubProvider(resCard?.data?.data?.[0]);
        }
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          toastError("Bạn chưa đăng nhập.");
          router.push("/");
          return;
        }
        toastError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        router.push("/");
      })
      .finally(() => {
        setLoding(false);
      });
  }, []);

  useEffect(() => {
    if (!subProvider) return;
    const params = {
      CategoryId: subProvider?.categoryID,
    };
    paymentAPI
      .getCardDetail(params)
      .then((res) => {
        if (res?.data?.code >= 0) {
          setListCardDetail(res?.data?.data);
          setCardValue(res?.data?.data?.[0]);
        }
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          toastError("Bạn chưa đăng nhập.");
          router.push("/");
          return;
        }
        toastError(ERROR_CODE[err?.response?.data?.code]);
      });
  }, [subProvider]);

  useEffect(() => {
    if (!user) return;
    setValue("fullname", user?.fullname, { shouldValidate: true });
    setValue("phone", user?.username, { shouldValidate: true });
    setValue("email", user?.email, { shouldValidate: true });
  }, [user]);

  const handleChangeQuantity = (value: string) => {
    if (!value || parseInt(value) === 0) {
      setQuantity(1);
      return;
    }
    const regex = /^\d*(\.\d+)?$/;
    if (value.match(regex)) {
      setQuantity(parseInt(value));
    }
  };

  const handleSelectCard = (value: object, type = "SUB_PROVIDER") => {
    if (type === "SUB_PROVIDER") {
      setSubProvider(value);
      return;
    }
    setCardValue(value);
  };

  // const handleSelectPaymentMethod = (value: object) => {
  //   setPaymentMethod(value);
  // };

  const onSubmit = () => {
    if (quantity > 50) {
      toastError(
        "Số lượng thẻ mua trong một giao dịch không được vượt quá 50 thẻ."
      );
      return;
    }
    const params = {
      Quantity: quantity,
      CategoryID: subProvider?.categoryID,
      ProductID: cardValue?.productID,
    };
    if (user?.accountType === 2) {
      setCallApi(true);
      paymentAPI
        .buyCardAgency(params)
        .then((res) => {
          if (res?.data?.code >= 0) {
            router.push(
              `/mua-the/lich-su-mua-the?orderid=${res?.data?.data?.orderID}&status=1`
            );
            dispatch(userInfoThunk());
          }
        })
        .catch((err) => {
          const { status } = err.response;
          if (status === 401) {
            toastError("Bạn chưa đăng nhập.");
            router.push("/");
            return;
          }
          toastError(ERROR_CODE[err?.response?.data?.code]);
        })
        .finally(() => {
          setCallApi(false);
        });
    } else if (user?.accountType === 1) {
      setCallApi(true);
      paymentAPI
        .buyCard(params)
        .then((res) => {
          if (res?.data?.code >= 0) {
            window.location.href = res?.data?.params?.[0];
          }
        })
        .catch((err) => {
          const { status } = err.response;
          if (status === 401) {
            toastError("Bạn chưa đăng nhập.");
            router.push("/");
            return;
          }
          toastError(ERROR_CODE[err?.response?.data?.code]);
        })
        .finally(() => {
          setCallApi(false);
        });
    }
  };
  const onSubmitNologin = (data: Inputs) => {
    if (!isValid) return;
    setCallApi(true);
    if (quantity > 50) {
      toastError(
        "Số lượng thẻ mua trong một giao dịch không được vượt quá 50 thẻ."
      );
      return;
    }
    const params = {
      Quantity: quantity,
      CategoryID: subProvider?.categoryID,
      ProductID: cardValue?.productID,
      Email: data?.email,
      Username: data?.phone,
      Fullname: data?.fullname,
    };
    paymentAPI
      .buyCardNotLogin(params)
      .then((res) => {
        if (res?.data?.code >= 0) {
          window.location.href = res?.data?.params?.[0];
        }
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          toastError("Bạn chưa đăng nhập.");
          router.push("/");
          return;
        }
        toastError(ERROR_CODE[err?.response?.data?.code]);
      })
      .finally(() => {
        setCallApi(false);
      });
  };
  return (
    <>
      <div className="mt-[52px] w-full">
        <Feature disableTitle={true} distableDesc={true} />
        {loading ? (
          <Loading />
        ) : (
          <div className="container mx-auto my-8 max-w-screen-xl">
            <div className="lg:flex lg:flex-wrap mx-4">
              <div className="lg:w-8/12 lg:pr-4">
                <div className="mb-6">
                  <Title title="Lựa chọn nhà cung cấp" />
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                    {listCard.map((item) => (
                      <SubProvider
                        item={item}
                        active={subProvider?.categoryID === item?.categoryID}
                        key={item?.categoryID}
                        handleSelect={handleSelectCard}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <Title title="Chọn mệnh giá" />
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
                    {listCardDetail.map((item) => (
                      <CardValue
                        item={item}
                        active={cardValue?.productID === item?.productID}
                        key={item?.productID}
                        handleSelect={handleSelectCard}
                      />
                    ))}
                  </div>
                  <div className="flex flex-nowrap justify-end mt-6 items-center">
                    <span className="mr-3">Số lượng</span>
                    <ul className="flex flex-nowrap">
                      <li>
                        <button
                          className="bg-[#3079DB] rounded w-9 h-9"
                          onClick={() => {
                            quantity > 1 && setQuantity(quantity - 1);
                          }}
                        >
                          <span className="text-2xl leading-none text-[#ffffff] font-bold">
                            -
                          </span>
                        </button>
                      </li>
                      <li className="mx-1">
                        <input
                          type="text"
                          className="appearance-none border h-9 w-16 p-2 text-center font-bold text-base border-[#E5E5E5] rounded text-gray-700 leading-tight focus:outline-none focus:bg-[#ffffff]"
                          value={quantity}
                          onChange={(e) => handleChangeQuantity(e.target.value)}
                        />
                      </li>
                      <li>
                        <button
                          className="bg-[#3079DB] rounded w-9 h-9 "
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <span className="text-2xl leading-none text-[#ffffff] font-bold">
                            +
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-6">
                  <Title title="Thông tin nhận thẻ" />
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputText
                      register={register("fullname")}
                      placeholder="Họ và tên"
                      label="Họ và tên"
                      error={errors.fullname}
                      disabled={!!user}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputText
                      register={register("email")}
                      placeholder="Email nhận mã thẻ"
                      label="Email nhận mã thẻ"
                      error={errors.email}
                      disabled={!!user}
                    />
                    <InputText
                      register={register("phone")}
                      placeholder="Số điện thoại"
                      label="Số điện thoại"
                      error={errors.phone}
                      disabled={!!user}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-4/12 p-4 max-w-xl mx-auto border-dashed border border-[#F89736] bg-[#F5F5F5] h-fit">
                {/* <h4 className="uppercase text-center w-full bg-[#3079DB] py-2 font-bold text-[#ffffff] text-base">
                  Phương thức thanh toán
                </h4>
                <div className="flex justify-center my-4">
                  <button className="border border-[#E5E5E5] w-32 rounded h-16 bg-[#ffffff] flex justify-center p-2 items-center">
                    <img
                      src={paymentMethod?.image}
                      className="object-cover max-h-[calc(55px)]"
                      alt={paymentMethod?.name}
                    />
                    <h1>{paymentMethod?.bankName}</h1>
                  </button>
                  <button
                    className="rounded w-32 h-16 bg-[#ffffff] hover:bg-[#e7e6e6] text-[#182537] font-semibold uppercase ml-2"
                    onClick={() => setShowPopup(true)}
                  >
                    Thay đổi
                  </button>
                </div> */}
                <h4 className="uppercase text-center w-full bg-[#3079DB] py-2 font-bold text-[#ffffff] text-base">
                  Chi tiết giao dịch
                </h4>
                <div className="mb-4 mt-1">
                  <ul>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Loại thẻ
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {subProvider?.categoryName}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Mệnh giá
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {`${formatCurrency(cardValue?.value)}đ`}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Số lượng
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {quantity}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Tổng tiền
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {`${formatCurrency(cardValue?.value * quantity)}đ`}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Chiết khấu
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {cardValue?.discountRate + "%"}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Tổng tiền thanh toán
                      </span>
                      <span className="text-[#F89736] font-semibold text-base">
                        {`${formatCurrency(
                          (cardValue?.value *
                            quantity *
                            (100 - cardValue?.discountRate)) /
                            100
                        )}đ`}
                      </span>
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Họ và tên
                      </span>
                      {watch("fullname") && (
                        <span className="text-[#F89736] font-semibold text-base">
                          {watch("fullname")}
                        </span>
                      )}
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Email nhận
                      </span>
                      {watch("email") && (
                        <span className="text-[#F89736] font-semibold text-base">
                          {watch("email")}
                        </span>
                      )}
                    </li>
                    <li className="flex flex-row justify-between border-b border-[#E0E0E0] py-2">
                      <span className="text-[#182537] text-sm block mr-2 w-[calc(100px)] md:w-60 leading-6">
                        Số điện thoại
                      </span>
                      {watch("phone") && (
                        <span className="text-[#F89736] font-semibold text-base">
                          {formatPhoneNumber(watch("phone"))}
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
                <button
                  className={`w-full text-base text-[#ffffff] bg-[#f79636] uppercase hover:bg-[#ec8200] focus:outline-none p-2 focus:shadow-outline font-bold ${
                    callApi ? `opacity-30` : ``
                  }`}
                  value="Lưu thay đổi"
                  onClick={user ? onSubmit : handleSubmit(onSubmitNologin)}
                  disabled={callApi}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <PopupChangeMethodPayment
        show={showPopup}
        setShow={setShowPopup}
        handleSelectPaymentMethod={handleSelectPaymentMethod}
        paymentMethodAtms={listBank}
      /> */}
    </>
  );
};

export default BuyCardContainer;
