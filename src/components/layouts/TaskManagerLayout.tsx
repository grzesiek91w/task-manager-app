import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const TaskManagerLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-grow p-4 overflow-y-auto bg-grey">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TaskManagerLayout;
