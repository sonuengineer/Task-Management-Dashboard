import Card from "./Card.jsx";
import Button from "./Button.jsx";
import { useTasks } from "../context/TaskContext.jsx";
import { toast } from "react-toastify";

export default function TaskItem({ task }) {
  const { toggleTask } = useTasks();

  const handleToggle = () => {
    toggleTask(task.id);
    toast.info(task.completed ? "Marked as Pending" : "Marked as Completed");
  };

  return (
    <Card>
      <h4>{task.title}</h4>
      <p className={task.completed ? "completed" : "pending"}>
        {task.completed ? "Completed" : "Pending"}
      </p>
      <Button onClick={handleToggle}>Toggle Status</Button>
    </Card>
  );
}
