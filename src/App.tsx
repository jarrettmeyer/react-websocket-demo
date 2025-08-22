import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import APIStatus from "./components/APIStatus";
import CreateTaskForm from "./components/CreateTaskForm";
import ListTasks from "./components/ListTasks";
import { TasksProvider } from "./providers/TasksProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <h1>React Websocket Demo</h1>
        <APIStatus />
        <CreateTaskForm />
        <ListTasks />
      </TasksProvider>
    </QueryClientProvider>
  );
}
