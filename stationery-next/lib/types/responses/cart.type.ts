import { ProductInCart } from "../cart.type";

export interface ICartResponse {
  _id: string;
  page: number;
  totalPages: number;
  totalItemsInCart: number;
  pageSize: number;
  isLastPage: boolean;
  data: ProductInCart[];
  createdAt: string;
  updatedAt: string;
}