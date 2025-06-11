enum CategoryList {
  STATIONERY = "stationery",
  BOOK = "book",
  TOY = "toy",
}

export interface Category {
  _id: string;
  name: CategoryList;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Categories = Category[];