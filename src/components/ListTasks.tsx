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
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>task_id</th>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>state</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.task_id}>
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{task.task_id}</td>
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{task.state ?? "unknown"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}