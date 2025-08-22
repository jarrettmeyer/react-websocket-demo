import { useState, useEffect } from "react";
import { TasksContext, type Task } from "../contexts/TasksContext";
import type { ReactNode } from "react";

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("react-websocket-demo-tasks");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (task: Task) => {
    setTasks((prev) => {
      return prev.map((t) => {
        if (t.task_id === task.task_id && t.state !== task.state) {
          console.log(`Task ${task.task_id} state changed from ${t.state} to ${task.state}`);
          t.state = task.state;
          t.date_done = task.date_done;
        }
        return t;
      });
    });
  };

  const removeTask = (task_id: string) => {
    setTasks((prev) => prev.filter((t) => t.task_id !== task_id));
  };

  useEffect(() => {
    localStorage.setItem("react-websocket-demo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}
