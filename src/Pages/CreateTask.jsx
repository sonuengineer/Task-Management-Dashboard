import { useRef, useState, useEffect } from "react";
import Input from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import { useTasks } from "../context/TaskContext.jsx";
import { toast } from "react-toastify";

export default function CreateTask() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const ref = useRef();

  useEffect(() => {
    ref.current.focus(); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");

    addTask({ id: Date.now(), title, completed: status === "completed" });
    toast.success("Task Created!");
    setTitle("");
    ref.current.focus(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <Input ref={ref} label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <div className="input-group">
        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
