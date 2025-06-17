import { Category } from "./category.type";
import { Meta } from "./data.type";

export enum ProductTypes {
  STATIONERY = "Stationery",
  BOOK = "Book",
  TOY = "Toy",
}

export interface BaseProduct extends Meta {
  _id: string;
  name: string;
  category: Category;
  price: number;
  images: string[];
  stock: number;
  productType: ProductTypes;
}

export interface Stationery extends BaseProduct {
  productType: ProductTypes.STATIONERY;
  brand: string;
  color?: string;
}

export interface Book extends BaseProduct {
  productType: ProductTypes.BOOK;
  author: string;
  pages: number;
  publisher: string;
}

export interface Toy extends BaseProduct {
  productType: ProductTypes.TOY;
  ageRange: string;
  brand: string;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}