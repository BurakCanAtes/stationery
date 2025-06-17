import { ProductResponse } from "./responses/product.type";

export interface ProductInCart {
  _id: string;
  product: ProductResponse;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}