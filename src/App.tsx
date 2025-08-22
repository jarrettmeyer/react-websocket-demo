
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

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  return (
    <QueryClientProvider client={queryClient}>
      <TasksContext.Provider value={{ tasks, addTask }}>
        <h1>React Websocket Demo</h1>
        <APIStatus />
        <CreateTaskForm />
        <ListTasks />
      </TasksContext.Provider>
    </QueryClientProvider>
  );
}
