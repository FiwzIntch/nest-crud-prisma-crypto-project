export interface ResponsePagination<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPage: number;
    totalItem: number;
  };
}
