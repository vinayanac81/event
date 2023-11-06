import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ManagerNav from "../../components/manager/ManagerNav";

const ManagerApp = () => {
  return (
    <div>
      <Toaster />
      <ManagerNav />
      <main className="bg-slate-100  min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerApp;
