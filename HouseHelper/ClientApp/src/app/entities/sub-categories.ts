import { Category } from './category';
import { Data } from './data';
export interface SubCategories {
  id: string;
  name: string;
  category: Category;
  description: string;
  data: Data[];
}
