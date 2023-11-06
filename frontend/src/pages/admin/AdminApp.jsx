import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import AdminNav from '../../components/admin/AdminNav';
const AdminApp = () => {
  
  return (
    <div>
<Toaster/>
<AdminNav />
<main className="bg-slate-100 min-h-[calc(100vh)]">
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminApp