import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
