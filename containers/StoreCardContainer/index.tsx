import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Feature from "@/components/Feature";
import Image from "next/image";
import { SelectorInput } from "@/components/FilterInput";
import PrintCardModal from "./PrintCardModal";
import ExportCardModal from "./ExportCardModal";
import { Controller, useForm } from "react-hook-form";
import InputDataPicker from "@/components/Form/InputDataPicker";
import InputDateRangePicker from "@/components/Form/InputDateRangePicker";
import InputText from "@/components/Form/InputText";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import paymentAPI from "@/services/payment";
import Loading from "@/components/Loading";
import { formatCurrency } from "@/utils/index";
import { toastWarning } from "@/utils/toast";
import DataTableStoreCard from "@/components/DataTable";

type FilterForm = {
  exportDate: Array<Date>; // ngay khoi tao
  expriedDate: Date; // time han su dung
  status: number; // trang thai
  serial: string; // so serial
  orderID: number; // ma giao dich
  cardValue: number; // menh gia the
  typeCard: number; // categoryID
};
const schema = yup
  .object({
    status: yup.number(),
    serial: yup.string(),
    productID: yup.number(),
    cardValue: yup.string(),
    typeCard: yup.string(),
  })
  .required();
const StoreCardContainer = () => {
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalRow, setTotalRow] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showModalPrint, setShowModalPrint] = useState<boolean>(false);
  const [showModalExportCard, setShowModalExportCard] =
    useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [valueCard, setValueCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataCardStore, setDataCardStore] = useState([]);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [selected, setSelected] = useState<Array<any>>([]);
  const [dataSelected, setDataSelected] = useState<Array<any>>([]);
  const [printType, setPrintType] = useState("");

  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FilterForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    getListCard();
  }, [
    watch("status"),
    watch("exportDate"),
    watch("expriedDate"),
    watch("typeCard"),
    watch("cardValue"),
    currentPage,
    pageSize,
  ]);

  useEffect(() => {
    getCardValue();
  }, [watch("typeCard")]);

  useEffect(() => {
    getCategories();
  }, []);

  const customFilterObj = () => {
    const data = getValues();
    const filterObj: { [key: string]: any } = {
      ReferenceID: data?.orderID || 0,
      Serial: data?.serial,
      BeginDate: data?.exportDate?.[0],
      EndDate: data?.exportDate?.[1],
      ExpriredDate: data?.expriedDate,
      Status: data?.status || -1,
      CategoryID: data?.typeCard || 0,
      ProductID: data?.cardValue || 0,
    };
    !data?.exportDate?.[0] && delete filterObj.BeginDate;
    !data?.exportDate?.[1] && delete filterObj.EndDate;
    !data?.expriedDate && delete filterObj.ExpriredDate;

    return filterObj;
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

  const getCardValue = () => {
    const data = getValues();
    paymentAPI
      .getCardDetail({
        CategoryId: data.typeCard || 0,
        ProductId: 0,
      })
      .then((res) => {
        const data = res?.data?.data || [];
        const customOption = data.map((c: any) => {
          const obj = {
            id: c.productID,
            title: `${formatCurrency(c.value)} - ${c.productName.replace(
              /[0-9]/g,
              ""
            )}`,
          };
          return obj;
        });
        customOption.unshift({ id: 0, title: "Tất cả" });
        setValue("cardValue", customOption?.[0]?.id);
        setValueCard(customOption);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const getCategories = () => {
    paymentAPI
      .getCardCategories()
      .then((res) => {
        const data = res?.data?.data || [];
        const customOption = data.map((c: any) => {
          const obj = { id: c.categoryID, title: c.categoryName };
          return obj;
        });
        customOption.unshift({ id: 0, title: "Tất cả" });
        setCategories(customOption);
      })
      .catch((err) => console.log("err", err));
  };

  const getListCard = () => {
    const params = customFilterObj();
    setLoading(true);
    paymentAPI
      .getListCardStore({
        Page: currentPage,
        PageSize: pageSize,
        ...params,
      })
      .then((res) => {
        setDataCardStore(res?.data?.data);
        const rowTotal = res?.data?.params?.[2];
        const pageTotal = Math.ceil(rowTotal / pageSize);
        setTotalRow(rowTotal);
        setTotalPage(pageTotal);
        setSelected([]);
      })
      .catch((err) => console.log("err", err))
      .finally(() => setLoading(false));
  };

  const onSubmit = (data: FilterForm) => {
    setCurrentPage(1);
    getListCard();
  };

  const handleDownloadFile = () => {
    const params = customFilterObj();
    const config = { responseType: "blob" };
    paymentAPI
      .exportFileCard(
        {
          Page: currentPage,
          PageSize: pageSize,
          ...params,
        },
        config
      )
      .then((res) => res.data)
      .then((blobby) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const objectUrl = window.URL.createObjectURL(blobby);
        anchor.href = objectUrl;
        anchor.download = "list-card.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
      });
  };

  const handleSelected = (data: Array<any>) => {
    const dataByID = dataCardStore.filter((x: any) =>
      data.includes(x.productItemID)
    );
    setDataSelected(dataByID);
    setSelected(data);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 52px)", marginTop: "52px" }}>
      <Feature disableTitle={true} distableDesc={true} />
      <div className="container m-auto px-2">
        <form
          className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="typeCard"
            render={({ field: { onChange, value } }) => (
              <SelectorInput
                onChange={(e: any) => {
                  onChange(e);
                  setCurrentPage(1);
                }}
                placeholder="Loại sản phẩm"
                options={categories}
                selectedID={value}
              />
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <SelectorInput
                onChange={(e: any) => {
                  onChange(e);
                  setCurrentPage(1);
                }}
                placeholder="Trạng thái"
                options={[
                  { id: -1, title: "Tất cả" },
                  { id: 0, title: "Chưa sử dụng" },
                  { id: 1, title: "Đã sử dụng" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="exportDate"
            render={({ field: { onChange, value } }) => (
              <InputDateRangePicker
                onChange={(e: any) => {
                  onChange(e);
                  setCurrentPage(1);
                }}
                placeholder="Thời gian khởi tạo"
                value={value}
                classNameInput="shadow !bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
          <Controller
            control={control}
            name="expriedDate"
            render={({ field: { onChange, value } }) => (
              <InputDataPicker
                onChange={(e: any) => {
                  onChange(e);
                  setCurrentPage(1);
                }}
                placeholder="Hạn sử dụng"
                value={value}
                classNameInput="shadow !text-base !bg-white appearance-none border rounded w-full py-3 pb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
          <Controller
            control={control}
            name="cardValue"
            render={({ field: { onChange, value } }) => (
              <SelectorInput
                onChange={(e: any) => {
                  onChange(e);
                  setCurrentPage(1);
                }}
                placeholder="Mệnh giá"
                options={valueCard}
                selectedID={value}
                disabled={valueCard.length === 0}
                value={value}
              />
            )}
          />
          <InputText
            register={register("orderID")}
            placeholder="Mã giao dịch"
            error={errors.orderID}
            classNameInput="shadow !bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <InputText
            register={register("serial")}
            placeholder="Số serial"
            error={errors.serial}
            classNameInput="shadow !bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            className="cursor-pointer shadow appearance-none w-full border bg-[#F89736] border-gray-200 text-white py-3 
          px-4 pr-8 rounded-md leading-tight focus:outline-none flex justify-center items-center"
            type="submit"
          >
            <Image src="/icons/icon-search.svg" width={25} height={15} /> Tìm
            kiếm
          </button>
        </form>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-10">
          <h2 className="uppercase font-bold mr-auto sm:ml-0">Kết quả</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              className="uppercase bg-[#3079DB] w-52 h-11 px-2 flex justify-center items-center text-white font-semibold rounded-md"
              onClick={() => setShowInfoCard((x) => !x)}
            >
              {!showInfoCard ? "Hiện thông tin thẻ" : "Ẩn thông tin thẻ"}
            </button>
            <button
              className="uppercase bg-[#EEF1F6] p-1 min-w-[150px] flex justify-center gap-1 items-center text-[#3079DB] font-semibold rounded-md"
              onClick={() => setShowModalPrint(true)}
            >
              <Image src="/icons/icon-print.svg" width={16} height={36} />
              In nhiều thẻ
            </button>
            <button
              className="uppercase bg-[#EEF1F6] p-1 min-w-[150px] flex justify-center gap-1 items-center text-[#3079DB] font-semibold rounded-md "
              onClick={() => handleDownloadFile()}
            >
              <Image src="/icons/icon-dowload.svg" width={16} height={36} />
              Tải ngay
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <Loading />
          ) : dataCardStore.length === 0 ? (
            <div className="font-semibold text-center mt-4">
              {" "}
              Chưa có dữ liệu
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto whitespace-nowrap">
                <DataTableStoreCard
                  data={dataCardStore}
                  pageCurrent={currentPage}
                  pageSize={pageSize}
                  showInfo={showInfoCard}
                  selected={selected}
                  onSelectRow={handleSelected}
                  handlePrintOne={(data: any) => {
                    setDataSelected([data]);
                    setSelected([data.productItemID]);
                    setShowModalPrint(true);
                  }}
                />
              </div>
              <Pagination
                className="my-4"
                pageSize={pageSize}
                currentPage={currentPage}
                totalPage={totalPage}
                onChangePageSize={(value: number) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                onChange={(value: number) => setCurrentPage(value)}
                totalRows={totalRow}
              />
            </>
          )}
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
    </div>
  );
};

export default StoreCardContainer;
