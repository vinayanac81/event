import { useState } from "react";
import "./App.css";

import UserNav from "./components/user/UserNav";
import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
     <Toaster position="top-center" />

     <UserNav/>
      <main className="bg-slate-100 min-h-[calc(100vh)]">
        <Outlet/>
      </main>
  
    </>
  );
}

export default App;
