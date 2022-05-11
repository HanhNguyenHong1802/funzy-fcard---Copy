export interface CardStoreParams {
  ProductID?: number;
  ReferenceID?: number;
  Serial?: string;
  BeginDate?: Date;
  EndDate?: Date;
  ExpriredDate?: Date;
  Page: number;
  PageSize: number;
}

export interface StatusCardParams {
  ProductItemID: number;
  ExportOrderID: number;
  Status: number;
}
