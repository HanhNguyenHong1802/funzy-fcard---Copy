import Copy from "@/components/Copy";
import Feature from "@/components/Feature";
import { SelectorInput } from "@/components/FilterInput";
import InputDateRangePicker from "@/components/Form/InputDateRangePicker";
import Pagination from "@/components/Pagination";
import { ERROR_CODE } from "@/constants/errorCode";
import paymentAPI from "@/services/payment";
import { formatCurrency, timeDateFormat } from "@/utils/index";
import { toastError, toastWarning } from "@/utils/toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import ExportCardModal from "../StoreCardContainer/ExportCardModal";
import PrintCardModal from "../StoreCardContainer/PrintCardModal";

const initState = {
  beginDate: "",
  endDate: "",
  type: 1, // 2:mua ma the --- 1:nap tien
  page: 1,
  pageSize: 10,
};

type Action = {
  type: string;
  payload?: any;
};

const CHANGE_PAGE = "CHANGE_PAGE";
const CHANGE_PAGE_SIZE = "CHANGE_PAGE_SIZE";
const CHANGE_DATE_FILTER = "CHANGE_DATE_FILTER";
const CHANGE_TYPE = "CHANGE_TYPE";

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case CHANGE_DATE_FILTER:
      return {
        ...state,
        beginDate: action?.payload?.[0],
        endDate: action?.payload?.[1],
        page: 1,
      };
    case CHANGE_TYPE:
      return { ...state, type: action?.payload, page: 1 };
    case CHANGE_PAGE:
      return { ...state, page: action?.payload };
    case CHANGE_PAGE_SIZE:
      return { ...state, pageSize: action?.payload, page: 1 };
    default:
      return state;
  }
};

const TransactionContainer = () => {
  const router = useRouter();
  const typeTransaction = router?.query?.type;
  const [query, dispatch] = useReducer(reducer, {
    ...initState,
    type: typeTransaction,
  });
  const [trans, setTrans] = useState<any>();
  const [listTrans, setListTrans] = useState([]);
  const [listCard, setListCard] = useState<any>([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [showModalPrint, setShowModalPrint] = useState<boolean>(false);
  const [showModalExportCard, setShowModalExportCard] =
    useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<Array<any>>([]);
  const [printType, setPrintType] = useState("");

  useEffect(() => {
    let params;
    if (query.beginDate && query.endDate) {
      params = {
        page: query.page,
        pageSize: query.pageSize,
        Type: typeTransaction || query.type,
        BeginDate: query.beginDate,
        EndDate: query.endDate,
      };
    } else {
      params = {
        page: query.page,
        pageSize: query.pageSize,
        Type: typeTransaction || query.type,
      };
    }
    paymentAPI
      .getHistoryTrans(params)
      .then((res) => {
        setListTrans(res?.data?.data);
        setTotalRows(res?.data?.params?.[2]);
        setTrans(undefined);
      })
      .catch((err) => {
        toastError(ERROR_CODE[err?.response?.data?.code]);
      })
      .finally(() => {});
  }, [query, typeTransaction]);

  useEffect(() => {
    if (trans?.referenceID) {
      paymentAPI
        .getCards({
          OrderId: parseInt(trans?.referenceID + ""),
        })
        .then((res) => {
          if (res?.data?.code >= 0) {
            if (res?.data?.data.length <= 0) {
              toastError("Giao dịch không tồn tại");
              return;
            }
            setListCard(res?.data?.data);
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
          router.push("/");
        });
    }
  }, [trans]);

  const handleSearch = () => {
    if (!dateFilter?.[0] && !dateFilter?.[1]) {
      dispatch({ type: CHANGE_DATE_FILTER, payload: ["", ""] });
    }
    if (!dateFilter?.[0] || !dateFilter?.[1]) return;
    dispatch({ type: CHANGE_DATE_FILTER, payload: dateFilter });
  };
  const handleDowloadExcel = (orderID: number) => {
    if (!orderID) return;
    const config = { responseType: "blob" };
    paymentAPI
      .exportFileHistory({ OrderID: orderID }, config)
      .then((res) => res.data)
      .then((blobby) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const objectUrl = window.URL.createObjectURL(blobby);
        anchor.href = objectUrl;
        anchor.download = "history-transaction.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
      });
  };
  const handleClickPrintType = (value: any) => {
    if (dataSelected.length === 0) {
      toastWarning("Chưa chọn thẻ in!");
      return;
    }
    setShowModalPrint(false);
    setPrintType(value);
    setShowModalExportCard(true);
  };
  return (
    <>
      {" "}
      <div className="mt-[52px] w-full">
        <Feature disableTitle={true} distableDesc={true} />
        <div className="container xl:max-w-screen-xl lg:max-w-screen-lg m-auto lg:flex gap-4 py-6 px-2 min-h-[50vh]">
          <div className="lg:w-2/3">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3">
              <SelectorInput
                onChange={(value: Number) => {
                  router.replace("/giao-dich", undefined, { shallow: true });
                  dispatch({
                    type: CHANGE_TYPE,
                    payload: parseInt(value + ""),
                  });
                }}
                options={[
                  { id: 0, title: "Tất cả" },
                  { id: 1, title: "Nạp tiền" },
                  { id: 2, title: "Mua mã thẻ" },
                ]}
                selectedID={query.type}
                value={typeTransaction}
              />
              <InputDateRangePicker
                onChange={(value: any) => setDateFilter(value)}
                placeholder="Thời gian"
                value={dateFilter}
                classNameInput="shadow !bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                className="cursor-pointer shadow appearance-none w-full border bg-[#F89736] border-gray-200 text-white py-3 
          px-4 pr-8 rounded-md leading-tight focus:outline-none flex justify-center items-center sm:col-span-2 md:col-start-2 md:col-end-4 xl:col-span-1"
                onClick={handleSearch}
              >
                <Image src="/icons/icon-search.svg" width={25} height={15} />{" "}
                Tìm kiếm
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <h2 className="uppercase font-bold mr-auto sm:ml-0">Kết quả</h2>
            </div>
            <div className="w-full overflow-x-auto whitespace-nowrap">
              <table className="w-full mt-2 border border-gray-200 shadow">
                <thead>
                  <tr className="bg-[#3079DB] h-10 text-white font-semibold text-md">
                    <th className="min-w-[70px]">STT</th>
                    <th className="min-w-[70px]">Mã giao dịch</th>
                    <th className="min-w-[70px]">Loại giao dịch</th>
                    <th className="min-w-[70px]">Tổng tiền</th>
                    <th className="min-w-[70px]">Thời gian</th>
                    <th className="min-w-[140px]">Trạng thái</th>
                    <th className="min-w-[100px]">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-center font-semibold">
                  {listTrans.map((x: any, index) => {
                    return (
                      <tr
                        className={`h-10 ${
                          index % 2 === 0 ? "" : "bg-[#EEF1F6]"
                        }`}
                        key={index}
                      >
                        <td>{(query.page - 1) * query.pageSize + index + 1}</td>
                        <td>{x?.transID}</td>
                        <td>{x?.serviceName}</td>
                        <td>{formatCurrency(x?.grandAmount)}</td>
                        <td>{timeDateFormat(x?.createdTime)}</td>
                        <td>Thành công</td>
                        <td className="text-[#3079DB] flex gap-4 justify-center items-center">
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              setTrans({
                                ...x,
                                type: x?.referenceID === 0 ? 1 : 2,
                              })
                            }
                          >
                            {" "}
                            Chi tiết
                          </p>
                          <Image
                            src="/icons/icon-dowload.svg"
                            width={18}
                            height={35}
                            className={
                              x?.referenceID !== 0
                                ? "cursor-pointer"
                                : "invisible"
                            }
                            onClick={() => handleDowloadExcel(x?.referenceID)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              className="my-4"
              pageSize={query.pageSize}
              currentPage={query.page}
              totalPage={Math.ceil(totalRows / query.pageSize)}
              onChangePageSize={(value: number) =>
                dispatch({ type: CHANGE_PAGE_SIZE, payload: value })
              }
              onChange={(value: number) =>
                dispatch({ type: CHANGE_PAGE, payload: value })
              }
              totalRows={totalRows}
            />
          </div>
          <div className="lg:w-1/3 bg-white border border-[#F89736] border-dashed rounded-sm flex p-4">
            {!trans ? (
              <p className="font-semibold m-auto max-w-xs text-center">
                Chọn <span className="text-[#3079DB]">{`"Chi tiết"`}</span> giao
                dịch để xem chi tiết của một giao dịch
              </p>
            ) : (
              <div className="w-full">
                <p className="bg-[#3079DB] w-full h-10 text-center p-1 rounded-sm text-white font-semibold text-xl">
                  Thông tin chi tiết
                </p>
                <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                  Mã giao dịch{" "}
                  <span className="text-[#F89736]">{trans?.transID}</span>
                </p>
                <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                  Loại giao dịch{" "}
                  <span className="text-[#F89736]">
                    {trans.type === 2 ? "Mua mã thẻ" : "Nạp tiền"}
                  </span>
                </p>
                <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                  Thời gian{" "}
                  <span className="text-[#F89736]">
                    {timeDateFormat(trans?.createdTime)}
                  </span>
                </p>
                {trans.type === 2 && (
                  <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                    Loại thẻ{" "}
                    <span className="text-[#F89736]">
                      {listCard?.[0]?.categoryName}
                    </span>
                  </p>
                )}
                {trans.type === 2 && (
                  <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                    Số lượng{" "}
                    <span className="text-[#F89736]">{listCard?.length}</span>
                  </p>
                )}
                <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                  {trans.type === 2 ? "Tổng số tiền" : "Số tiền nạp"}{" "}
                  <span className="text-[#F89736]">
                    {formatCurrency(trans?.partnerMoney) + "đ"}
                  </span>
                </p>
                {trans.type === 2 && (
                  <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                    Chiết khấu{" "}
                    <span className="text-[#F89736]">
                      {formatCurrency(trans?.discount) + "đ"}
                    </span>
                  </p>
                )}
                {trans.type === 2 && (
                  <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                    Số tiền thanh toán{" "}
                    <span className="text-[#F89736]">
                      {formatCurrency(trans?.grandAmount) + "đ"}
                    </span>
                  </p>
                )}
                <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                  Trạng thái <span className="text-[#32C36A]">Thành công</span>
                </p>
                {trans.type === 1 && (
                  <p className="w-full border-b-2 border-gray-200 h-10 p-1 font-medium flex justify-between items-center">
                    Tài khoản nhận{" "}
                    <span className="text-[#F89736]">{trans?.username}</span>
                  </p>
                )}
                {trans.type === 2 && (
                  <>
                    <div className="bg-[#EEF1F6] w-full mt-2 text-center p-2 rounded-sm text-black font-medium">
                      Danh sách thẻ
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      <table className="w-full mt-2 text-sm ">
                        <thead className="h-10 font-medium border-b border-gray-200 ">
                          <tr className="text-left">
                            <th>STT</th>
                            <th>Thông tin</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold align-top">
                          {listCard?.map((item: any, index: number) => (
                            <tr
                              key={item?.productItemID}
                              className="border-b border-gray-200"
                            >
                              <td className="text-[#F89736] py-2">
                                {index + 1}
                              </td>
                              <td className="py-2">
                                <p className="font-bold">{item?.code}</p>
                                <p className="font-thin text-gray-500">
                                  serial: <span>{item?.serial}</span>
                                </p>
                                <p>
                                  Loại thẻ:{" "}
                                  <span className="text-[#F89736]">
                                    {item?.categoryName}
                                  </span>
                                </p>
                                <p></p>
                                <p>
                                  Mệnh giá:{" "}
                                  <span className="text-[#F89736]">
                                    {formatCurrency(item?.value)} vnđ
                                  </span>
                                </p>
                                <p>
                                  HSD:{" "}
                                  <span className="text-gray-400">
                                    {timeDateFormat(item?.expriredDate)}
                                  </span>
                                </p>
                              </td>
                              <td className="flex gap-x-5 py-2">
                                <Copy
                                  value={item?.code}
                                  className="relative top-[3px]"
                                />
                                <Image
                                  src="/icons/icon-print.svg"
                                  className="cursor-pointer ml-5"
                                  width={15}
                                  height={18}
                                  onClick={() => {
                                    setShowModalPrint(true);
                                    setDataSelected([item]);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p
                      className="uppercase m-auto mt-4 h-10 p-2 text-center rounded-sm bg-[#3079DB] text-white font-semibold cursor-pointer"
                      onClick={() => {
                        setShowModalPrint(true);
                        setDataSelected(listCard);
                      }}
                    >
                      In nhiều thẻ
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <PrintCardModal
        openModal={showModalPrint}
        handleCloseModal={() => setShowModalPrint(false)}
        handleClickModal={handleClickPrintType}
      />
      <ExportCardModal
        data={dataSelected}
        typePrint={printType}
        openModal={showModalExportCard}
        handleCloseModal={() => setShowModalExportCard(false)}
      />
    </>
  );
};

export default TransactionContainer;
