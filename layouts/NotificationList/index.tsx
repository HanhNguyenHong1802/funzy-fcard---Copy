import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import authenticationAPI from "@/services/authentication";
import ErrorMessage from "@/components/ErrorMessage";
import { typeNotify } from "@/constants/index";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { timeSince } from "@/utils/index";
import useClickOutSide from "hooks/useClickOutSide";

const NotificationList = () => {
  const [notifyList, setNotifyList] = useState<Array<any>>([]);
  const [idNotifyUnRead, setIdNotifyUnRead] = useState<Array<any>>([]);
  const [countAllUnRead, setCountAllUnRead] = useState<number>(0);
  const [listAll, setListAll] = useState<boolean>(true);
  const [errorNotify, setErrorNotify] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [openNotify, setOpenNotify] = useState(false);
  const router = useRouter();
  const notiRef = useRef<any>(null);
  let clickOutSideNotify = useRef<any>(null);
  clickOutSideNotify = useClickOutSide(() => {
    setOpenNotify(false);
  });
  useEffect(() => {
    getNotifyList();
  }, [page]);

  const handleUpdateStatusAll = () => {
    if (countAllUnRead === 0) {
      return;
    }
    authenticationAPI
      .updateStateNotify({ LogID: 0 })
      .then((res) => {
        if (res?.data?.code >= 0) {
          setIdNotifyUnRead([]);
          setCountAllUnRead(0);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const handleUpdateStatusByID = (status: number, ID: number, link: string) => {
    if (link) {
      setOpenNotify(false);
      router.push(link);
    } else {
      const details = notifyList.find((n) => n.logID === ID);
      setDataModal(details);
      setOpenModal(true);
    }

    if (status) {
      return;
    }
    authenticationAPI
      .updateStateNotify({ LogID: ID })
      .then((res) => {
        if (res?.data?.code >= 0) {
          const list = idNotifyUnRead.filter((x) => x !== ID);
          setIdNotifyUnRead(list);
          if (countAllUnRead > 0) {
            setCountAllUnRead((x) => x - 1);
          }
        }
      })
      .catch((err) => console.log("err", err));
  };
  const getNotifyList = async () => {
    setLoading(true);
    try {
      const [dataNotify, unreadNotify] = await Promise.all([
        authenticationAPI.getNotify({ Page: page, PageSize: 20 }),
        authenticationAPI.getNotifyUnRead(),
      ]);

      const checkLoadMore = dataNotify.data.data.length == 20;
      setIsLoadMore(checkLoadMore);

      setNotifyList((x) => [...x, ...dataNotify.data.data]);
      const listUnRead =
        dataNotify?.data?.data?.map((n: any) => {
          if (n.status === 0) {
            return n.logID;
          }
        }) || [];
      setIdNotifyUnRead((x) => [...x, ...listUnRead]);
      setCountAllUnRead(unreadNotify.data.params[0]);
      setErrorNotify(false);
    } catch (error) {
      setErrorNotify(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreNotiFy = (e: any) => {
    if (
      e.target.scrollTop + 490 == notiRef.current.scrollHeight &&
      !loading &&
      isLoadMore
    ) {
      setPage((x) => x + 1);
    }
  };

  return (
    <>
      <div
        className="relative h-[54px] pt-2 w-12 flex justify-end"
        ref={clickOutSideNotify}
      >
        <div
          className="cursor-pointer flex justify-center items-center w-10 h-10 rounded-full bg-[#3C4D63]"
          onClick={() => setOpenNotify((x) => !x)}
        >
          <Image
            src={
              openNotify
                ? "/icons/icon-bell-active.svg"
                : "/icons/icon-bell.svg"
            }
            width={22}
            height={35}
          />
        </div>
        <p
          className={`w-[22px] h-[22px] text-white font-semibold text-sm rounded-full bg-[#f89736] text-center absolute top-1 -right-3 ${
            countAllUnRead === 0 ? "hidden" : ""
          }`}
        >
          {countAllUnRead}
        </p>
        {openNotify && (
          <div className="fixed sm:absolute top-[55px] sm:top-[54px] w-screen left-0 sm:left-auto sm:right-0 sm:w-96 bg-white shadow rounded-sm">
            <p className="font-medium flex border-b border-gray-200 p-3">
              Thông báo{" "}
              <span
                className="text-[#f89736] ml-auto font-normal cursor-pointer"
                onClick={() => handleUpdateStatusAll()}
              >
                Đánh dấu đã đọc
              </span>
            </p>
            <div className="font-medium flex border-b gap-2 border-gray-200 p-3">
              <button
                className={` font-medium p-1 w-24 rounded-md hover:text-white hover:bg-[#2C71FA] ${
                  listAll
                    ? "bg-[#2C71FA] text-white"
                    : "bg-[#EEF1F6] text-gray-500"
                }`}
                onClick={() => setListAll(true)}
              >
                Tất cả
              </button>
              <button
                className={` font-medium p-1 w-24 rounded-md hover:text-white hover:bg-[#2C71FA] ${
                  !listAll
                    ? "bg-[#2C71FA] text-white"
                    : "bg-[#EEF1F6] text-gray-500"
                }`}
                onClick={() => setListAll(false)}
              >
                Chưa đọc
              </button>
            </div>
            <div
              className="max-h-[490px] overflow-y-auto"
              onScroll={(e) => handleLoadMoreNotiFy(e)}
              ref={notiRef}
            >
              {errorNotify && (
                <ErrorMessage customMessage="Load thông báo không thành công" />
              )}
              {notifyList.map((x) => (
                <div
                  key={x.logID}
                  className={`flex p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${
                    idNotifyUnRead.includes(x.logID) ? "bg-[#EEF1F6]" : ""
                  } ${
                    !idNotifyUnRead.includes(x.logID) && !listAll
                      ? "hidden"
                      : ""
                  }`}
                  onClick={() =>
                    handleUpdateStatusByID(
                      x.status,
                      x.logID,
                      typeNotify[x.type].link
                    )
                  }
                >
                  <div
                    className="min-w-[4rem] h-16 rounded-xl flex justify-center item-center mr-4"
                    style={{ background: typeNotify[x.type].color }}
                  >
                    <Image
                      src={typeNotify[x.type].icon}
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-black">
                      {typeNotify[x.type].name}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: x.messages,
                      }}
                    ></p>
                    <p className="text-[#919191]">{timeSince(x.createdTime)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal
        open={openModal}
        handleClose={(e: MouseEvent) => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        center
      >
        {dataModal && (
          <div className="bg-white w-full max-w-md mx-auto my-10 relative rounded-lg">
            <button
              className="absolute text-white right-0 -top-7"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
            >
              Đóng
            </button>
            <div
              className="flex p-4 border-b border-gray-200"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="min-w-[4rem] h-16 rounded-xl flex justify-center item-center mr-4"
                style={{ background: typeNotify[dataModal.type].color }}
              >
                <Image
                  src={typeNotify[dataModal.type].icon}
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-black">
                  {typeNotify[dataModal.type].name}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: dataModal.messages,
                  }}
                ></p>
                <p className="text-[#919191]">
                  {timeSince(dataModal.createdTime)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NotificationList;
