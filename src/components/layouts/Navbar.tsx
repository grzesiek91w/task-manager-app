import { GrTasks } from "react-icons/gr";

const Navbar: React.FC = () => {
  
  return (
    <header className="w-full bg-gray-800 text-white shadow p-4 sticky z-10">
      <nav className="flex justify-center items-center">
        <div className="text-2xl font-bold flex gap-2 items-center">
        <GrTasks className="ml-4 w-10 h-10 text-white" />
        <span className="ml-16">Aplikacja do zarządzania zadaniami</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;