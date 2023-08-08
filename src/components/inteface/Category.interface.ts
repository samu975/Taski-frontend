import { Task } from "./Task.interface";

export interface Category {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}
