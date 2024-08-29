import { MRT_ColumnFiltersState, MRT_SortingState } from "material-react-table";

export type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};
export interface IUserInfiniteList {
  payload: IPayloadCreator;
  tag: IQueryKeys;
}

export interface IQueryKeys {
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
  sorting: MRT_SortingState;
}

export interface IPayloadCreator {
  pageParam: number;
  fetchSize: number;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
  sorting: MRT_SortingState;
}
export interface IPayload {
  start: string;
  size: string;
  filters: string;
  globalFilter: string;
  sorting: string;
}
export type User = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};
