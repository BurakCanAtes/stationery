import { Categories, Category } from "../category.type";
import { Meta } from "../data.type";

export type ICategoryResponse = Category & Meta;

export interface IGetCategoriesResponse {
  total: number;
  data: Categories;
}
