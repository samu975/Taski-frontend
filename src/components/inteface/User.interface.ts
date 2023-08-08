import { Category } from "./Category.interface";
import { Task } from "./Task.interface";

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  Categories: Category[];
  Tasks: Task[];
}
