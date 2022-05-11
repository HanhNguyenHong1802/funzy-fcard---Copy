import InputMoney from "@/components/Form/InputMoney";
import InputSelect from "@/components/Form/InputSelect";
import InputText from "@/components/Form/InputText";
import { useAppSelector } from "@/redux/hooks";
import { selectUserInfo } from "@/redux/userSlice";
import paymentAPI from "@/services/payment";
import { formatCurrency } from "@/utils/index";
import { toastError } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  clientName: string;
  amount: number;
  bank: string;
};

const schema = yup
  .object({
    clientName: yup.string().trim().required("Tên khách hàng không để trống"),
    amount: yup
      .string()
      .required("Số tiền chuyển không được để trống.")
      .min(4, "Số tiền chuyển không được nhỏ hơn 1.000 VNĐ.")
      .max(12, "Số tiền chuyển vượt quá giới hạn cho phép."),
    bank: yup.string().required("Chưa chọn ngân hàng"),
  })
  .required();

type AttentionProps = {
  text: string;
};

const TopupNotiContainer = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [sendNotiSuccess, setSendNotiSuccess] = useState(false);
  const [listBank, setListBank] = useState<Array<Object>>([]);
  const [chosenBank, setChosenBank] = useState<any>();
  const [code, setCode] = useState<Number>();
  const user = useAppSelector(selectUserInfo);
  useEffect(() => {
    if (!user) return;
    setValue("clientName", user?.fullname, { shouldValidate: true });
  }, [user]);

  const onSubmit = async (data: Inputs) => {
    const RechargeAgencyParams = {
      Fullname: user?.fullname,
      BankAccountID: parseInt(data.bank),
      Amount: data.amount,
    };
    try {
      const response = await paymentAPI.rechargeAgency(RechargeAgencyParams);
      if (response?.data?.code >= 0) {
        setCode(response?.data?.code);
        setSendNotiSuccess(true);
        const tmp = listBank.filter(
          (x: any) => x.bankAccountID === parseInt(data.bank)
        );
        setChosenBank(tmp[0]);
      }
    } catch (error) {
      console.log("error", error);
      toastError("Yêu cầu thất bại");
    }
  };

  const getBankAccount = () => {
    paymentAPI
      .getBanks()
      .then((res) => {
        setListBank(res?.data?.data);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => getBankAccount(), []);
  const Attention = ({ text }: AttentionProps) => (
    <div className="text-center p-3 border-[#f89736] border-dashed border-2 bg-[#f5f5f5] mb-10">
      <div className="max-w-xl mx-auto">
        <span className="text-sm">
          {text} số hotline
          <Link href="tel:+1900636919">
            <a className="text-[#3079DB] font-bold text-base"> 1900636919 </a>
          </Link>
          để được hỗ trợ.
        </span>
        <p className="text-red-600 text-sm">
          Yêu cầu sẽ được xử lý trong vòng 30 phút (Trong giờ hành chính)
        </p>
      </div>
    </div>
  );
  const infoArr = [
    {
      id: 1,
      label: "Ngân hàng",
      value: chosenBank?.bankName,
    },
    {
      id: 2,
      label: "Tên chủ tài khoản",
      value: chosenBank?.bankOwnerName,
    },
    {
      id: 3,
      label: "Số tài khoản",
      value: chosenBank?.bankAccountNumber,
    },
    {
      id: 4,
      label: "Số tiền chuyển",
      value: getValues("amount"),
    },
    {
      id: 5,
      label: "Nội dung",
      value: "F" + code,
    },
  ];
  const Info = () => (
    <div className="w-full my-6">
      <table className="w-full">
        <tbody className="w-full">
          {infoArr.map((item) => (
            <tr key={item.id} className="odd:bg-[#eef1f6] w-full p-3">
              <td className="py-2 text-right">{item.label}:</td>
              <td
                className={`text-left pl-2 font-bold break-words max-w-xs ${
                  item.id === 4 && "text-[#f89736]"
                }`}
              >
                {item.id === 4 ? formatCurrency(item.value) : item.value}{" "}
                {item.id === 4 && "VND"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {!sendNotiSuccess ? (
        <>
          <Attention text="Vui lòng điền thông tin vào các ô dưới đây để gửi thông báo nạp tiền hoặc liên hệ trực tiếp đến" />

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="md:w-fit w-full md:justify-between">
              <InputText
                register={register("clientName")}
                placeholder="Tên khách hàng"
                error={errors.clientName}
                defaultValue={user?.fullname}
                label="Họ và tên người chuyển tiền (*)"
                className="mb-3.5"
                classNameInput="line-clamp-1"
                disabled={true}
              />
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <InputMoney
                    className="mb-3.5"
                    label="Số tiền cần chuyển(*)"
                    name="amount"
                    error={error}
                    onChange={onChange}
                  />
                )}
              />
              <InputSelect
                register={register("bank")}
                placeholder="Chọn ngân hàng"
                label="Chuyển đến ngân hàng (*)"
                classNameInput="md:w-96 w-full focus:outline-none cursor-pointer focus:shadow-outline rounded bg-[#eef1f6] h-11 my-2"
                options={listBank?.map((item: any) => ({
                  value: item?.bankAccountID,
                  label: item?.bankName,
                }))}
              />
            </div>
            <input
              type="submit"
              value="GỬI THÔNG BÁO"
              disabled={!isValid}
              className={` text-white mt-8 bg-[#f89736] ${
                !isValid ? "opacity-30" : "cursor-pointer"
              } py-2 rounded-md w-full md:w-96 `}
            />
          </form>
        </>
      ) : (
        <div className="w-full">
          <div className="md:max-w-xl mx-auto text-center mb-10">
            <Image
              src="/icons/icon-tick.svg"
              alt="tick"
              width={40}
              height={40}
            />
            <p className="font-bold">
              Bạn vừa gửi thành công thông báo nạp tiền mã
              <span className="text-[#f89736] ml-1 font-semibold">
                F{code}
              </span>{" "}
              đến Fcard
            </p>
            <p>
              Vui lòng thực hiện chuyển tiền vào tài khoản theo thông tin sau
              trong vòng 30p
            </p>
            <Info />
            <p className="text-[#f89736]">
              Vui lòng chờ yêu cầu <span className="font-bold">F{code}</span>{" "}
              được xử lý hoàn tất để gửi thêm thông báo nạp tiền khác (nếu có).
            </p>
          </div>
          <Attention text="Nếu bạn có bất cứ thắc mắc hay ý kiến phản hồi  nào, vui lòng liên hệ với chúng tôi qua " />
        </div>
      )}
    </>
  );
};
export default TopupNotiContainer;
