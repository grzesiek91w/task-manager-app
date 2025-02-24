import SidebarItem from './SidebarItem';
import { FaTasks } from 'react-icons/fa';
import { MdAddTask } from "react-icons/md";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const sidebarItems = [
    { href: '/task-manager/tasks', label: 'Tasks', icon: <FaTasks /> },
    { href: '/task-manager/add-task', label: 'Add  Task', icon: <MdAddTask />},
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-14' : 'w-64'
      } h-full bg-gray-800 transition-all duration-300 ease-in-out relative`} // Ustawiono tło na szare
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-2.5 top-0 w-6 h-6 flex justify-center items-center hover:bg-purple-600 rounded-full transition cursor-pointer focus:outline-none bg-purple-700"
      >
        {isCollapsed ? (
          '>' 
        ) : (
          '<' 
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className="mt-4">
        <ul>
          {sidebarItems.map((item) => ( 
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              isCollapsed={isCollapsed}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;