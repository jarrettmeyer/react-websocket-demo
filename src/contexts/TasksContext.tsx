
import { createContext } from "react";
import type { Task } from "../api/tasksApi";

export type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (task_id: string) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);


