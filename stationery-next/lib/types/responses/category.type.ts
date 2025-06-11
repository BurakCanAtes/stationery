import { Categories } from "../category.type";

export interface IGetCategoriesResponse {
  total: number;
  data: Categories;
}