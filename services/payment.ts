import {
  BuyCardNotLoginParams,
  BuyCardParams,
  GetCardDetailParams,
  RechargeAgencyParams,
  GetCardsParams,
  GetHistoryTransParams,
} from "@/models/authentication";
import { CommonResponse } from "@/models/common";
import { CardStoreParams, StatusCardParams } from "@/models/payment";
import axiosClientPayment from "./axiosClientPayment";

const paymentAPI = {
  getBanks(): Promise<CommonResponse> {
    const url = "/pay/getbankaccount";
    return axiosClientPayment.get(url);
  },
  getCardCategories(): Promise<CommonResponse> {
    const url = "/pay/getcategories";
    return axiosClientPayment.get(url);
  },
  getCardDetail(params: GetCardDetailParams): Promise<CommonResponse> {
    let url = `/pay/getproducts?CategoryId=${params?.CategoryId}`;
    if (params?.ProductId) {
      url += `&ProductId=${params?.ProductId}`;
    }
    return axiosClientPayment.get(url);
  },
  buyCard(params: BuyCardParams): Promise<CommonResponse> {
    const webURL = window.location.origin;
    const url = `/pay/buycardpersonal`;
    return axiosClientPayment.post(url, {
      ...params,
      CallBackUrl: webURL + `/mua-the/ket-qua`,
    });
  },
  buyCardNotLogin(params: BuyCardNotLoginParams): Promise<CommonResponse> {
    const webURL = window.location.origin;
    const url = `/pay/buycardpersonal`;
    return axiosClientPayment.post(url, {
      ...params,
      CallBackUrl: webURL + `/mua-the/ket-qua`,
    });
  },
  rechargeAgency(params: RechargeAgencyParams): Promise<CommonResponse> {
    const url = "/pay/createinputwait";
    return axiosClientPayment.post(url, params);
  },
  buyCardAgency(params: BuyCardParams): Promise<CommonResponse> {
    const url = `/pay/buycardagency`;
    return axiosClientPayment.post(url, params);
  },
  getCards(params: GetCardsParams): Promise<CommonResponse> {
    const url = `/pay/getcards?OrderId=${params?.OrderId}`;
    return axiosClientPayment.get(url);
  },
  getHistoryTrans(params: GetHistoryTransParams): Promise<CommonResponse> {
    const url = `/pay/gettransactionhistory`;
    return axiosClientPayment.post(url, params);
  },
  getHistoryTopup(params: GetHistoryTransParams): Promise<CommonResponse> {
    const url = `/pay/getchargehistory`;
    return axiosClientPayment.post(url, params);
  },
  getListCardStore(params: CardStoreParams): Promise<CommonResponse> {
    const url = "/pay/getcardwarehouse";
    return axiosClientPayment.post(url, params);
  },
  updateStatusCard(params: StatusCardParams): Promise<CommonResponse> {
    const url = "/pay/updatestatus";
    return axiosClientPayment.post(url, params);
  },
  exportFileCard(
    params: CardStoreParams,
    config: any
  ): Promise<CommonResponse> {
    const url = "/pay/exportcardwarehouse";
    return axiosClientPayment.post(url, params, config);
  },
  exportFileHistory(
    params: { OrderID: number },
    config: any
  ): Promise<CommonResponse> {
    const url = "/pay/exportorder";
    return axiosClientPayment.get(url, { params: params, ...config });
  },
};

export default paymentAPI;
