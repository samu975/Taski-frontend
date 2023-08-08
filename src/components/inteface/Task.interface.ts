import { Category } from "./Category.interface";
export interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
  expiredAt: string;
  category: Category;
}
