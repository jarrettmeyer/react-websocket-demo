import { createContext, useContext } from "react";

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

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within a TasksProvider");
  return ctx;
}
