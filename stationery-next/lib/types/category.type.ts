import { ICategoryResponse } from "./responses/category.type";

enum CategoryList {
  STATIONERY = "stationery",
  BOOK = "book",
  TOY = "toy",
}

export interface Category {
  _id: string;
  name: CategoryList;
}

export type Categories = ICategoryResponse[];
