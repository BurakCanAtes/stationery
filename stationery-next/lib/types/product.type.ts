import { Category } from "./category.type";
import { Meta } from "./data.type";

enum ProductTypes {
  STATIONERY = "Stationery",
  BOOK = "Book",
  TOY = "Toy",
}

export interface BaseProduct extends Meta {
  _id: string;
  name: string;
  category: Category | string;
  price: number;
  images: string[];
  stock: number;
  productType: ProductTypes;
}

export interface Stationery extends BaseProduct {
  brand: string;
  color?: string;
}

export interface Book extends BaseProduct {
  author: string;
  pages: number;
  publisher: string;
}

export interface Toy extends BaseProduct {
  ageRange: string;
  brand: string;
}