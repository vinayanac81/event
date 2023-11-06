import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getManagerData, logOutRedux } from "../../redux/ManagerInfo";
import axios from "axios";
import { ManagerUrl } from "../../config/BaseUrl";
const ManagerNav = () => {
  const navigate=useNavigate()
  const [showOptions, setshowOptions] = useState(false)
  const { manager } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const handleLogout = () => {
    
    dispatch(logOutRedux());
    localStorage.clear();
    navigate("/manager")
    
  };
  const getManagerInfo = async () => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.get(`${ManagerUrl}/get-manager-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data.manager.name);
        dispatch(getManagerData(data.manager));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setshowOptions(false)
    getManagerInfo();
  }, []);
  const handleShowOptions=()=>{
    setshowOptions(!showOptions)
  }
  return (
    <div className="p-2  fixed z-10 w-full shadow-md  bg-orange-500 drop-shadow-md  md:p-4">
      <div className="flex   px-14 h-14 items-center   justify-between w-full ">
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            <Link to={"/manager/dashboard"}>MANAGER</Link>{" "}
          </h2>
        </div>
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            {manager.name ? (
              <div className="relative">
              <div className="flex w-10 h-10 justify-center items-center rounded-full bg-slate-600" onClick={handleShowOptions}>{manager.name.charAt(0)}</div>
             {showOptions && <div className="fixed  z-4 drop-shadow-lg overflow-auto flex flex-col shadow-lg p-2  bg-slate-600 w-28">
          <Link onClick={handleShowOptions} to={"/manager/profile"}> <button>Profile</button></Link>   
           <button onClick={handleLogout}>Logout</button></div>}
              </div>
            ) : (
              <Link to={"/manager"}> LOGIN</Link>
            )}
          </h2>
          
        </div>
       
      </div>
      
    </div>
  );
};

export default ManagerNav;

// {cateringStatus && (
//   <>
//     <div className="w-[80%] mt-10 mx-auto relative  pt-10 rounded-lg flex  bg-indigo-900 flex-col">
//       <div className="flex w-full py-4 px-2 text-white font-bold text-3xl justify-center">
//         {" "}
//         <h2>Catering or Food Menu</h2>
//       </div>
//       <div className="flex justify-around p-4 text-xl text-slate-900  border-b font-medium gap- w-full">
//         <div className="flex w-[25%] justify-center">
//           <h2>Starters</h2>
//         </div>
//         <div className="flex w-[25%] justify-center">
//           <h2>Main</h2>
//         </div>
//         <div className="flex w-[25%] justify-center">
//           <h2>Desserts</h2>
//         </div>
//         <div className="flex w-[25%] justify-center">
//           <h2>Salads</h2>
//         </div>
//       </div>{" "}
//       {isCateringUploaded && (
//         <>
//           {uploadedCateringData.map((item) => {
//             return (
//               <div>
//                 <div className="flex p-4 border-b font-medium gap-  justify-around w-full ">
//                   <div className="flex justify-cente items-cente w-[25%] flex-col">
//                     {" "}
//                     <div className="flex justify-center mb-4">
//                       <div className="w-20 h-20 ">
//                         <img
//                           className="w-full h-full"
//                           src={item.starter_image}
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-around ">
//                       <div className="">
//                         <h2 className="text-md">
//                           {item.starter_name}
//                         </h2>
//                       </div>
//                       <div className="">{item.starter_price}</div>
//                     </div>
//                   </div>
//                   <div className="flex justify-cente items-cente w-[25%] flex-col">
//                     {" "}
//                     <div className="flex justify-center mb-4">
//                       <div className="w-20  h-20">
//                         <img
//                           className="w-full h-full"
//                           src={item.main_image}
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-around">
//                       <div className="">
//                         <h2 className="text-md">{item.main_name}</h2>
//                       </div>
//                       <div className="">{item.main_price}</div>
//                     </div>
//                   </div>
//                   <div className="flex justify-cente items-cente w-[25%] flex-col">
//                     {" "}
//                     <div className="flex justify-center mb-4">
//                       <div className="w-20  h-20">
//                         <img
//                           className="w-full h-full"
//                           src={item.dessert_image}
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-around">
//                       <div className="">
//                         <h2 className="text-md">
//                           {item.dessert_name}
//                         </h2>
//                       </div>
//                       <div className="">{item.dessert_price}</div>
//                     </div>
//                   </div>
//                   <div className="flex justify-cente items-cente w-[25%] flex-col">
//                     {" "}
//                     <div className="flex justify-center mb-4">
//                       <div className="w-20  h-20">
//                         <img
//                           className="w-full h-full"
//                           src={item.salad_image}
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-around">
//                       <div className="">
//                         <h2 className="text-md">{item.salad_name}</h2>
//                       </div>
//                       <div className="">{item.salad_price}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </>
//       )}
//       {uploadMenu && (
//         <>
//           <div className="absolute insert-0 flex flex-col top-16 w-full bg-green-500 ">
//             <div className="flex px-10 py-5 justify-between">
//               <div className="font-bold text-xl text-white">
//                 Catering Menu Details
//               </div>
//               <div className="">
//                 <button
//                   onClick={() => handleCateringMenu(false)}
//                   className="px-10 py-2 bg-violet-500 rounded text-white font-bold"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//             <form onSubmit={handleCateringSubmit} action="">
//               <div className="flex justify-around pb-10  pr-10 gap-0 items-center h-30 w-full">
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Starter Name</h2>
//                   </div>
//                   <div className="w-[80%] ">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="starterName"
//                       value={addCateringMenu.starterName}
//                       onChange={handleCateringChange}
//                       placeholder="starter name"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Starter Price</h2>
//                   </div>
//                   <div className="w-[80%] ">
//                     <input
//                       className=" rounded-lg bg-slate-600 h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="starterPrice"
//                       value={addCateringMenu.starterPrice}
//                       onChange={handleCateringChange}
//                       placeholder="Price/Head"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Starter Image</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 p-1 w-[100%] outline-none px- text-white font-bold"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleCateringStarterImage}
//                       placeholder="starter name"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-around pb-10  pr-10 gap-0 items-center h-30 w-full">
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%] ">
//                     <h2 className="font-bold ">Main Name</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="mainName"
//                       value={addCateringMenu.mainName}
//                       onChange={handleCateringChange}
//                       placeholder="main name"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Main Price</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="mainPrice"
//                       value={addCateringMenu.mainPrice}
//                       onChange={handleCateringChange}
//                       placeholder="Price/Head"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Main Image</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 p-1 w-[100%] outline-none px- text-white font-bold"
//                       type="file"
//                       onChange={handleCateringMainImage}
//                       placeholder="starter name"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-around pb-10  pr-10 gap-0 items-center h-30 w-full">
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Dessert Name</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="dessertName"
//                       value={addCateringMenu.dessertName}
//                       onChange={handleCateringChange}
//                       placeholder="dessert name"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Dessert Price</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="dessertPrice"
//                       value={addCateringMenu.dessertPrice}
//                       onChange={handleCateringChange}
//                       placeholder="Price/Head"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Dessert Image</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 p-1 w-[100%] outline-none px- text-white font-bold"
//                       type="file"
//                       onChange={handleCateringDessertImage}
//                       placeholder="starter name"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-around pb-10  pr-10 gap-0 items-center h-30 w-full">
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Salad Name</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="saladName"
//                       value={addCateringMenu.saladName}
//                       onChange={handleCateringChange}
//                       placeholder="salad name"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Salad Price</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 outline-none px-3 text-white font-bold"
//                       type="text"
//                       name="saladPrice"
//                       value={addCateringMenu.saladPrice}
//                       onChange={handleCateringChange}
//                       placeholder="salad price"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center  w-[30%]">
//                   <div className="flex w-[20%]">
//                     <h2 className="font-bold ">Salad Image</h2>
//                   </div>
//                   <div className="w-[80%]">
//                     <input
//                       className="bg-slate-600 rounded-lg h-10 p-1 w-[100%] outline-none px- text-white font-bold"
//                       type="file"
//                       onChange={handleCateringSaladImage}
//                       placeholder="starter name"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex w-full justify-center pb-8">
//                 <button className="px-12 rounded-lg py-2 bg-indigo-800 text-white font-medium hover:bg-indigo-900">
//                   Add{" "}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}
//       <div className="flex py-5 w-full">
//         <button
//           onClick={() => handleCateringMenu(true)}
//           className="mx-auto bg-pink-800 px-5 py-2 rounded-lg hover:bg-pink-900 font-bold text-white"
//         >
//           Add Menu
//         </button>
//       </div>
//     </div>
//   </>
// )}
