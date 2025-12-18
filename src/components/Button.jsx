export default function Button({ children, onClick, type }) {
  return (
    <button className="btn" onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
}
