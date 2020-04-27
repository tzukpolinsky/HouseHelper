import { User } from './user';
import { SubCategories } from './sub-categories';

export interface Category {
  id: string;
  user: User;
  name: string;
  subCategories: SubCategories[];
}
