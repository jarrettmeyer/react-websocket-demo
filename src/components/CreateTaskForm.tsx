import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

export default function CreateTaskForm() {
  const [duration, setDuration] = useState(10);
  const { addTask } = useTasks();

  const createTaskMutation = useMutation({
    mutationFn: async (duration: number) => {
      const res = await fetch("http://localhost:9001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log("Task created:", data);
      addTask(data);
    },
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate(duration);
  };

  return (
    <form onSubmit={handleCreateTask} style={{ marginBottom: 16 }}>
      <label>
        Duration:
        <input
          type="number"
          name="duration"
          value={duration}
          step={1}
          onChange={(e) => setDuration(+e.target.value)}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
}
