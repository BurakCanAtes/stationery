export interface Meta {
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  page: number;
  totalPages: number;
  pageSize: number;
  isLastPage: boolean;
}