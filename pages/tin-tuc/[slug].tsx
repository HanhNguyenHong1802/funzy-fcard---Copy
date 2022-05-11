import NewDetailContainer from "@/containers/NewDetailContainer";
import newAPI from "@/services/new";
import { slugToId } from "@/utils/index";
import { GetServerSideProps } from "next";
import React from "react";

type NewDetailProps = {
  newDetail: object;
  listNew: Array<object>;
};

const NewDetail = ({ newDetail, listNew }: NewDetailProps) => {
  return <NewDetailContainer newDetail={newDetail} listNew={listNew} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = parseInt(slugToId(params?.slug));
  const { newDetail, listNew } = await Promise.all([
    newAPI.getNewDetail({
      id,
    }),
    newAPI.getNews({
      page: 1,
      pageSize: 5,
    }),
  ])
    .then(([newDetail, news]) => {
      let listNewFilter = news?.data?.data || [];
      listNewFilter = listNewFilter?.filter((item: any) => item?.newsID != id);
      if (listNewFilter?.length > 4) {
        listNewFilter = listNewFilter?.slice(0, 4);
      }
      return {
        newDetail: newDetail?.data?.data || null,
        listNew: listNewFilter || [],
      };
    })
    .catch(() => {
      return {
        newDetail: null,
        listNew: [],
      };
    });
  return {
    props: { newDetail, listNew },
  };
};

export default NewDetail;
