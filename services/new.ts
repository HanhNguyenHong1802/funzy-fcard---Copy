import { NewDetailParams, NewParams } from "@/models/authentication";
import { CommonResponse } from "@/models/common";
import { queryString } from "../utils";
import axiosClientNew from "./axiosClientNew";

const newAPI = {
  getNews(params: NewParams): Promise<CommonResponse> {
    const url = `/article/news?${queryString(params)}`;
    return axiosClientNew.get(url);
  },
  getNewDetail(params: NewDetailParams): Promise<CommonResponse> {
    const url = `/article/detail?${queryString(params)}`;
    return axiosClientNew.get(url);
  },
};
export default newAPI;
