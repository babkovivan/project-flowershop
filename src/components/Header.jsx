import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-[#eee] shadow">
      <Link to="/" className="text-xl font-bold">Цветочная лавка</Link>
      <nav className="flex gap-4">
        <Link to="/favorites" className="px-3 py-1 rounded bg-slate-200">Избранное</Link>
      </nav>
    </header>
  );
}
