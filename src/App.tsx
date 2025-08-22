
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import APIStatus from "./components/APIStatus";
import CreateTaskForm from "./components/CreateTaskForm";
import ListTasks from "./components/ListTasks";
import { useState } from "react";
import { TasksContext } from "./TasksContext";
import type { Task } from "./TasksContext";

const queryClient = new QueryClient();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
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
      })
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
  <TasksContext.Provider value={{ tasks, addTask, updateTask }}>
        <h1>React Websocket Demo</h1>
        <APIStatus />
        <CreateTaskForm />
        <ListTasks />
      </TasksContext.Provider>
    </QueryClientProvider>
  );
}
