import { useTasks } from "../context/TaskContext.jsx";
import { useMemo } from "react";
import Card from "../components/Card.jsx";

export default function Dashboard() {
  const { tasks } = useTasks();

  const { total, completed, pending } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <Card>
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </Card>
        <Card>
          <h3>Completed Tasks</h3>
          <p>{completed}</p>
        </Card>
        <Card>
          <h3>Pending Tasks</h3>
          <p>{pending}</p>
        </Card>
      </div>
    </div>
  );
}
