
import { useTasks } from "../TasksContext";
import { useEffect, useRef } from "react";

export default function ListTasks() {
  const { tasks, updateTask } = useTasks();
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
        const ws = new WebSocket(`ws://localhost:9001/tasks/${task.task_id}/ws`);
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

  // Cleanup only on unmount
  // useEffect(() => {
  //   return () => {
  //     Object.values(wsRefs.current).forEach((ws) => {
  //       if (ws && typeof ws.close === 'function') ws.close();
  //     });
  //     wsRefs.current = {};
  //   };
  // }, []);

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
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.task_id}>
            <td>{task.task_id}</td>
            <td>{task.duration}</td>
            <td>
              {task.state === "SUCCESS" ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>{task.state}</span>
              ) : (
                task.state ?? "UNKNOWN"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
