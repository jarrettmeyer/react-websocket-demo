import { createContext } from "react";

export type Task = {
  task_id: string;
  duration?: number;
  state?: string;
  date_done?: string;
};

export type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (task_id: string) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);


