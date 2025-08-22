import { useTasks } from "../TasksContext";

export default function ListTasks() {
  const { tasks } = useTasks();

  if (!tasks.length) {
    return <div>No tasks.</div>;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th></th>
          <th>task_id</th>
          <th>state</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.task_id}>
            <td></td>
            <td>{task.task_id}</td>
            <td>{task.state ?? "unknown"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
