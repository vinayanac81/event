import React, { useEffect } from 'react'
import LeftLayout from '../../components/manager/LeftLayout'

const SalesReport = () => {
  useEffect(()=>{
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  },[])
  return (
    <div className='py-16'>
    <div className="w-full h-[91vh] flex bg-slate-500">
       <div className="w-[20%] h-full bg-slate-950">
       <LeftLayout name="salesReport"/>
       </div>
       <div className="w-[80%] bg-slate-700">
           
       </div>
    </div>
  
</div>
  )
}

export default SalesReport