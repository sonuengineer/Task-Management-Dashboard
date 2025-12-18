import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";
import TaskItem from "../components/TaskItem.jsx";
import Pagination from "../components/Pagination.jsx";
import useDebounce from "../hooks/useDebounce.js";
import Button from "../components/Button.jsx";

export default function Tasks() {
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const debouncedSearch = useDebounce(search, 400);

  const processedTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === "completed") result = result.filter(t => t.completed);
    else if (filter === "pending") result = result.filter(t => !t.completed);

    if (debouncedSearch)
      result = result.filter(t =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

    if (sortBy === "az") result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "za") result.sort((a, b) => b.title.localeCompare(a.title));
    else if (sortBy === "completed") result.sort((a, b) => b.completed - a.completed);
    else if (sortBy === "pending") result.sort((a, b) => a.completed - b.completed);

    return result;
  }, [tasks, filter, debouncedSearch, sortBy]);

  useEffect(() => setCurrentPage(1), [filter, debouncedSearch, sortBy]);

  const totalPages = Math.ceil(processedTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedTasks.slice(start, start + ITEMS_PER_PAGE);
  }, [processedTasks, currentPage]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Tasks</h2>
        <Button onClick={() => navigate("/tasks/create")}>+ Create Task</Button>
      </div>

      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="controls">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
          <option value="completed">Completed First</option>
          <option value="pending">Pending First</option>
        </select>
      </div>

     <div className="task-list">
  {paginatedTasks.map(task => <TaskItem key={task.id} task={task} />)}
</div>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
