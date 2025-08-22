const baseApiUrl = "http://localhost:9001";
const baseWsUrl = "ws://localhost:9001";

export type Task = {
  task_id: string;
  duration?: number;
  state?: string;
  date_done?: string;
};

// export async function getTasks(): Promise<Task[]> {
//   const res = await fetch(`${baseApiUrl}/tasks`);
//   if (!res.ok) throw new Error("Failed to fetch tasks");
//   return res.json();
// }

export async function getTask(taskId: string): Promise<Task> {
  const res = await fetch(`${baseApiUrl}/tasks/${taskId}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const res = await fetch(`${baseApiUrl}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

// export async function updateTask(task: Task): Promise<Task> {
//   const res = await fetch(`${baseApiUrl}/${task.task_id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(task),
//   });
//   if (!res.ok) throw new Error("Failed to update task");
//   return res.json();
// }

export async function deleteTask(taskId: string): Promise<void> {
  const res = await fetch(`${baseApiUrl}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export function subscribeToTask(taskId: string): WebSocket {
  return new WebSocket(`${baseWsUrl}/tasks/${taskId}/ws`);
}
