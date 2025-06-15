import { Pagination } from "../data.type";
import { Book, Stationery, Toy } from "../product.type";

export type ProductResponse = Stationery | Book | Toy;

export interface IGetAllProductsResponse extends Pagination {
  totalProducts: number;
  data: ProductResponse[];
}