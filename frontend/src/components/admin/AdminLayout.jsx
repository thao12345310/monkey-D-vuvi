// src/layouts/AdminLayout.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet /> {/* Hiển thị các route con của admin */}
      </main>
    </div>
  );
};

export default AdminLayout;
