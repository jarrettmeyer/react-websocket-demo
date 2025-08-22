import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>React Websocket Demo</h1>
      <APIStatus />
      <CreateTaskForm />
    </QueryClientProvider>
  );
}

export default App;

function APIStatus() {
  const { data, status } = useQuery({
    queryKey: ["apiStatus"],
    queryFn: async () => {
      const uri = "http://localhost:9001/health";
      const response = await fetch(uri);
      return await response.json();
    },
  });

  return (
    <div style={{ marginBottom: "3rem" }}>
      {status === "success" && data?.status === "ok" && (
        <p style={{ color: "green", fontWeight: 600 }}>API OK</p>
      )}
      {status === "error" && (
        <p style={{ color: "red", fontWeight: 600 }}>Unable to connect</p>
      )}
      {status === "pending" && (
        <p style={{ color: "gray", fontWeight: 600}}>Connecting...</p>
      )}
    </div>
  );
}

function CreateTaskForm() {
  const [duration, setDuration] = useState(30);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Empty handler for now
  };

  return (
    <form onSubmit={handleCreateTask} style={{ marginBottom: 16 }}>
      <label>
        Duration:
        <input
          type="text"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
}
