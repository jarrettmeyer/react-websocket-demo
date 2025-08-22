import { useEffect, useRef } from "react";
import type { Task } from "../contexts/TasksContext";
import { useTasks } from "../hooks/useTasks";

export default function ListTasks() {
  const { tasks, updateTask, removeTask } = useTasks();
  const wsRefs = useRef<{ [key: string]: WebSocket }>({});

  // Only create sockets for new tasks
  useEffect(() => {
    tasks.forEach((task) => {
      // If the task is SUCCESS and a socket exists, close and delete it
      if (task.state === "SUCCESS" && wsRefs.current[task.task_id]) {
        wsRefs.current[task.task_id].close();
        delete wsRefs.current[task.task_id];
        console.log(`Closed websocket for task ${task.task_id}`);
        return;
      }
      // Only create a socket if it doesn't exist and the task is not SUCCESS
      if (!wsRefs.current[task.task_id] && task.state !== "SUCCESS") {
        const ws = new WebSocket(
          `ws://localhost:9001/tasks/${task.task_id}/ws`
        );
        console.log(`Created websocket for task ${task.task_id}`);
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data && data.task_id) {
              updateTask(data);
            }
          } catch {
            // Ignore parse errors
          }
        };
        wsRefs.current[task.task_id] = ws;
      }
    });
  }, [tasks, updateTask]);

  const revokeTask = async (task: Task) => {
    try {
      await fetch(`http://localhost:9001/tasks/${task.task_id}`, {
        method: "DELETE",
      });
    } catch {
      // TODO: handle errors
    }
  };

  if (!tasks.length) {
    return <div>No tasks.</div>;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>task_id</th>
          <th>duration</th>
          <th>state</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.task_id}>
            <td>{task.task_id}</td>
            <td>{task.duration}</td>
            <td>
              {task.state === "PENDING" ? (
                <span style={{ color: "gray", fontWeight: "bold" }}>
                  {task.state}
                </span>
              ) : task.state === "STARTED" ? (
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {task.state}
                </span>
              ) : task.state === "SUCCESS" ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  {task.state}
                </span>
              ) : task.state === "REVOKED" ? (
                <span style={{ color: "orange", fontWeight: "bold" }}>
                  {task.state}
                </span>
              ) : task.state === "FAILURE" ? (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {task.state}
                </span>
              ) : (
                task.state ?? ""
              )}
            </td>
            <td>
              {["PENDING", "STARTED"].includes(task.state ?? "") ? (
                <button
                  type="button"
                  aria-label="Revoke Task"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2em",
                    margin: "0 0.5rem",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    revokeTask(task);
                  }}
                  title="Revoke Task"
                >
                  🛑
                </button>
              ) : ["SUCCESS", "REVOKED", "FAILURE"].includes(
                  task.state ?? ""
                ) ? (
                <button
                  aria-label="Delete Task"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2em",
                    margin: "0 0.5rem",
                  }}
                  onClick={() => removeTask(task.task_id)}
                  title="Delete Task"
                >
                  🗑️
                </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
