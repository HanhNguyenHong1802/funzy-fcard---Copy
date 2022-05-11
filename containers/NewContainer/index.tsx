import Banner from "@/components/Banner";
import Loading from "@/components/Loading";
import NewHot from "@/components/New/NewHot";
import NewItem from "@/components/New/NewItem";
import newAPI from "@/services/new";
import { toastError } from "@/utils/toast";
import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { useEffect } from "react";

const initState = {
  culture: "vi",
  cateId: "",
  keywords: "",
  tags: "",
  ishot: -1,
  page: 1,
  pageSize: 15,
};

type Action = {
  type: string;
  payload?: any;
};

const CHANGE_CULTURE = "CHANGE_CULTURE";
const CHANGE_CATE_ID = "CHANGE_CATE_ID";
const CHANGE_KEYWORDS = "CHANGE_CHANGE_KEYWORDS";
const CHANGE_TAGS = "CHANGE_TAGS";
const CHANGE_IS_HOT = "CHANGE_IS_HOT";
const CHANGE_PAGE = "CHANGE_PAGE";
const CHANGE_PAGE_SIZE = "CHANGE_PAGE_SIZE";

const reducer = (state = initState, action: Action) => {
  switch (action.type) {
    case CHANGE_CULTURE:
      return { ...state, culture: action?.payload, page: 1 };
    case CHANGE_CATE_ID:
      return { ...state, cateId: action?.payload, page: 1 };
    case CHANGE_KEYWORDS:
      return { ...state, keywords: action?.payload, page: 1 };
    case CHANGE_TAGS:
      return { ...state, tags: action?.payload, page: 1 };
    case CHANGE_IS_HOT:
      return { ...state, ishot: action?.payload, page: 1 };
    case CHANGE_PAGE:
      return { ...state, page: action?.payload };
    case CHANGE_PAGE_SIZE:
      return { ...state, pageSize: action?.payload };
    default:
      return state;
  }
};

const NewContainer = () => {
  const router = useRouter();
  const [query, dispatch] = useReducer(reducer, initState);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [listNew, setListNew] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    newAPI
      .getNews(query)
      .then((res) => {
        if (res?.data?.code >= 0) {
          if (query.page > 1) {
            setListNew((pre) => pre.concat(res?.data?.data));
          } else {
            setListNew(res?.data?.data);
          }
          setHasMore(query?.page * query?.pageSize < res?.data?.params?.[2]);
        }
      })
      .catch(() => {
        toastError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        router.push("/");
      })
      .finally(() => {
        setLoading(false);
        setLoadMore(false);
      });
  }, [query]);

  const handleLoadMore = () => {
    dispatch({ type: CHANGE_PAGE, payload: query.page + 1 });
    setLoadMore(true);
  };

  return (
    <div style={{ marginTop: "52px" }}>
      <Banner />
      <div className="container max-w-screen-xl min-h-[calc(70vh)] mx-auto mt-4">
        <div className="mx-4">
          <div className="border-b border-[#E5E5E5] relative mb-4">
            <h1 className="text-[calc(28px)] font-semibold pb-2 text-[#182537] inline-block before:content-[''] before:absolute before:-bottom-[calc(1px)] before:w-[calc(87px)] before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]">
              Tin tức
            </h1>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {listNew?.[0] && <NewHot item={listNew?.[0]} />}
                <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-4">
                  {listNew?.[1] && (
                    <NewItem layout="vertical" item={listNew?.[1]} />
                  )}
                  {listNew?.[2] && (
                    <NewItem layout="vertical" item={listNew?.[2]} />
                  )}
                </div>
              </div>
              <div className="grid my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listNew?.slice(3) &&
                  listNew
                    ?.slice(3)
                    ?.map((item: any) => (
                      <NewItem item={item} key={item?.newsID} />
                    ))}
              </div>
              {hasMore && (
                <div className="justify-center flex my-5">
                  <button
                    className={`py-2 px-7 rounded bg-[#F89736] text-base font-medium text-[#ffffff] uppercase ${
                      loadMore ? `opacity-30` : ``
                    }`}
                    onClick={handleLoadMore}
                    disabled={loadMore}
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewContainer;
