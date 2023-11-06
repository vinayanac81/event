import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/manager/LeftLayout";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { ManagerUrl } from "../../config/BaseUrl";
import { ImagetoBase64 } from "../../assets/image/ImageBase64";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RandomColorPicker } from "../../config/RandomColor";
import { useDispatch } from "react-redux";
import { getManagerData } from "../../redux/ManagerInfo";
const MenuList = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(() => {
    fetchMenu();
    window.scrollTo(0, 0);
  }, []);
  const [loading, setloading] = useState(false);
  const [color, setcolor] = useState("");
  const [cateringStatus, setcateringStatus] = useState(false);
  const [addStarterMenu, setaddStarterMenu] = useState(false);
  const [uploadStarterData, setuploadStarterData] = useState({
    image: "",
    price: "",
    name: "",
  });
  const [isStarter, setisStarter] = useState(false);
  const [isStarterUploadedData, setisStarterUploadedData] = useState([]);
  const [addMainMenu, setaddMainMenu] = useState(false);
  const [uploadMainData, setuploadMainData] = useState({
    image: "",
    price: "",
    name: "",
  });
  const [isMain, setisMain] = useState(false);
  const [isMainUploadedData, setisMainUploadedData] = useState([]);
  const [addDessertMenu, setaddDessertMenu] = useState(false);
  const [uploadDessertData, setuploadDessertData] = useState({
    image: "",
    price: "",
    name: "",
  });
  const [isDessert, setisDessert] = useState(false);
  const [isDessertUploadedData, setisDessertUploadedData] = useState([]);
  const [addSaladMenu, setaddSaladMenu] = useState(false);
  const [uploadSaladData, setuploadSaladData] = useState({
    image: "",
    price: "",
    name: "",
  });
  const [isSalad, setisSalad] = useState(false);
  const [isSaladUploadedData, setisSaladUploadedData] = useState([]);
  //stage useState
  const [stageStatus, setstageStatus] = useState(false);
  const [addStageMenu, setaddStageMenu] = useState(false);
  const [uploadStageData, setuploadStageData] = useState({
    image: "",
    price: "",
    size: "",
  });
  const [isStage, setisStage] = useState(false);
  const [isStageUploadedData, setisStageUploadedData] = useState([]);
  //decoration
  const [decorationStatus, setdecorationStatus] = useState(false);
  const [addDecorationMenu, setaddDecorationMenu] = useState(false);
  const [uploadDecorationData, setuploadDecorationData] = useState({
    image: "",
    price: "",
  });
  const [isDecoration, setisDecoration] = useState(false);
  const [isDecorationUploadedData, setisDecorationUploadedData] = useState([]);
  //vehicle
  const [vehicleStatus, setvehicleStatus] = useState(false);
  const [addVehicleMenu, setaddVehicleMenu] = useState(false);
  const [uploadVehicleData, setuploadVehicleData] = useState({
    image: "",
    price: "",
    name: "",
  });
  const [isVehicle, setisVehicle] = useState(false);
  const [isVehicleUploadedData, setisVehicleUploadedData] = useState([]);
  //when page loaded it will run
  const fetchMenu = async () => {
    try {
      setloading(true);
      setcolor(RandomColorPicker());
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.get(`${ManagerUrl}/menu-list`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      dispatch(getManagerData(data.manager[0]))
      setloading(false);
      setisStarter(data.menuList.starter_status);
      setisMain(data.menuList.main_status);
      setisDessert(data.menuList.dessert_status);
      setisSalad(data.menuList.salad_status);
      setcateringStatus(data.menuList.catering_status);
      setstageStatus(data.menuList.stage_status);
      setdecorationStatus(data.menuList.decoration_status);
      setvehicleStatus(data.menuList.vehicle_status);
      setisStarterUploadedData(data.menuList.starter_menu);
      setisMainUploadedData(data.menuList.main_menu);
      setisDessertUploadedData(data.menuList.dessert_menu);
      setisSaladUploadedData(data.menuList.salad_menu);
      const stageLength = data.menuList.stageMenu.length;
      // console.log(stageLength)
      const decorationLength = data.menuList.decorationMenu.length;
      const vehicleLength = data.menuList.vehicleMenu.length;
      if (stageLength > 0) {
        setisStage(true);
        setisStageUploadedData(data.menuList.stageMenu);
      }
      if (decorationLength > 0) {
        setisDecoration(true);
        setisDecorationUploadedData(data.menuList.decorationMenu);
      }
      if (vehicleLength > 0) {
        setisVehicle(true);
        setisVehicleUploadedData(data.menuList.vehicleMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //catering
  const handleStarterPopup = () => {
    window.scrollTo(0, 0);
    setaddStarterMenu(!addStarterMenu);
  };
  const handleMainPopup = () => {
    window.scrollTo(0, 0);
    setaddMainMenu(!addMainMenu);
  };
  const handleDessertPopup = () => {
    window.scrollTo(0, 0);
    setaddDessertMenu(!addDessertMenu);
  };
  const handleSaladPopup = () => {
    window.scrollTo(0, 0);
    setaddSaladMenu(!addSaladMenu);
  };
  const handleStarterChange = (e) => {
    const { name, value } = e.target;
    setuploadStarterData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setuploadMainData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleDessertChange = (e) => {
    const { name, value } = e.target;
    setuploadDessertData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleSaladChange = (e) => {
    const { name, value } = e.target;
    setuploadSaladData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleStarterImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;
    console.log(data);

    setuploadStarterData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleMainImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;
    console.log(data);

    setuploadMainData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleDessertImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;
    console.log(data);

    setuploadDessertData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleSaladImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;
    console.log(data);

    setuploadSaladData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleUploadedStarterData = async (e) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-starter`,
        { uploadStarterData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadedMainData = async (e) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-main`,
        { uploadMainData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadedDessertData = async (e) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-dessert`,
        { uploadDessertData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadedSaladData = async (e) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-salad`,
        { uploadSaladData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteStarter = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-starter/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMain = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-main/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDessert = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-dessert/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSalad = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-salad/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //stage
  const handleStagePopup = () => {
    window.scrollTo(0, 0);
    setaddStageMenu(!addStageMenu);
  };
  const handleStageChange = async (e) => {
    const { name, value } = e.target;
    setuploadStageData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleStageImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;

    setuploadStageData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleUploadedStageData = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-stage-menu`,
        { uploadStageData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      handleStageUploadMenu(false);
      console.log(error);
    }
  };
  const deleteStage = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-stage/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //decoration
  const handleDecorationPopup = () => {
    window.scrollTo(0, 0);
    setaddDecorationMenu(!addDecorationMenu);
  };
  const handleDecorationChange = async (e) => {
    const { name, value } = e.target;
    setuploadDecorationData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleDecorationImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;

    setuploadDecorationData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleUploadedDecorationData = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-decoration-menu`,
        { uploadDecorationData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDecoration = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-decoration/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //vehicle
  const handleVehiclePopup = () => {
    window.scrollTo(0, 0);
    setaddVehicleMenu(!addVehicleMenu);
  };
  const handleVehicleChange = async (e) => {
    const { name, value } = e.target;
    setuploadVehicleData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleVehicleImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    const { name } = e.target;

    setuploadVehicleData((preve) => {
      return {
        ...preve,
        [name]: data,
      };
    });
  };
  const handleUploadedVehicleData = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.post(
        `${ManagerUrl}/add-vehicle-menu`,
        { uploadVehicleData },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVehicle = async (id) => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.put(
        `${ManagerUrl}/delete-vehicle/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        window.scrollTo(0, 0);
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-16">
      <div className="w-full  flex     bg-slate-950 ">
        <div className="w-[20%]  h-[91vh] bg-slate-950">
          <LeftLayout name="menuList" />
        </div>
        <div className="w-[80%] relative flex flex-col pb-10  bg-slate-700">
          {loading ? (
            <>
              <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[91vh] items-center justify-center">
                <div className="flex px-4 flex-col bg-opacity-90 items-center   py-5 rounded-lg  w-[65%]">
                  {" "}
                  <BounceLoader
                    color={color}
                    loading={loading}
                    cssOverride={{
                      borderColor: "blue",
                    }}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {addStageMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-4 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedStageData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Stage
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleStagePopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex py-2 items-center justify-between">
                        <div className="w-[30%] p-2 flex justify-center">
                          Stage Photo
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          Stage Budget
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          Stage Size
                        </div>
                      </div>
                      <div className="w-full text-white flex  items-center justify-between">
                        <div className="w-[30%]   flex justify-center">
                          <input
                            type="file"
                            // value={uploadStageData.image}
                            onChange={handleStageImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={uploadStageData.price}
                            onChange={handleStageChange}
                            name="price"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="size"
                            value={uploadStageData.size}
                            onChange={handleStageChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addStarterMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-10 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedStarterData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Starter
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleStarterPopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          Stater Name
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Starter Image
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Starter Price/Head
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={uploadStarterData.name}
                            onChange={handleStarterChange}
                            name="name"
                            className="py-2   rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="file"
                            // value={uploadStarterData.image}
                            onChange={handleStarterImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="price"
                            value={uploadStarterData.price}
                            onChange={handleStarterChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addMainMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-10 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedMainData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Noon Lunch
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleMainPopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          Main Name
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Main Image
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Main Price/Head
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={addMainMenu.name}
                            onChange={handleMainChange}
                            name="name"
                            className="py-2   rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="file"
                            value={addMainMenu.image}
                            onChange={handleMainImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="price"
                            value={addMainMenu.price}
                            onChange={handleMainChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addDessertMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-10 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedDessertData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Dessert
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleDessertPopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          Dessert Name
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Dessert Image
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Dessert Price/Head
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={addDessertMenu.name}
                            onChange={handleDessertChange}
                            name="name"
                            className="py-2   rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="file"
                            value={addDessertMenu.image}
                            onChange={handleDessertImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="price"
                            value={addDessertMenu.price}
                            onChange={handleDessertChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addSaladMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-10 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedSaladData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Salad
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleSaladPopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          Salad Name
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Salad Image
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          Salad Price/Head
                        </div>
                      </div>
                      <div className="w-full text-white flex p-2 items-center justify-evenly">
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={addSaladMenu.name}
                            onChange={handleSaladChange}
                            name="name"
                            className="py-2   rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="file"
                            value={addSaladMenu.image}
                            onChange={handleSaladImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[25%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="price"
                            value={addSaladMenu.price}
                            onChange={handleSaladChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addDecorationMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-4 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedDecorationData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Decoration
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleDecorationPopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex py-2 items-center justify-evenly">
                        <div className="w-[30%] p-2 flex justify-center">
                          Decoration Photo
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          Decoration Budget
                        </div>
                      </div>
                      <div className="w-full text-white flex  items-center justify-evenly">
                        <div className="w-[30%]   flex justify-center">
                          <input
                            type="file"
                            // value={uploadStageData.image}
                            onChange={handleDecorationImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={uploadDecorationData.price}
                            onChange={handleDecorationChange}
                            name="price"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {addVehicleMenu && (
                <>
                  <div className="absolute inset-0 backdrop-blur-md w-full h-[91vh] flex justify-center items-center top-0 bg-opacity-60">
                    <div className="flex px-4 flex-col bg-gray-500 bg-opacity-40   py-5 rounded-lg  w-[65%]">
                      <div className="w-full pb-3 items-center justify-between flex text-white font-bold">
                        <div className="">
                          <button
                            onClick={handleUploadedVehicleData}
                            className="px-8 bg-emerald-600 py-2 rounded-md"
                          >
                            Add Vehicle
                          </button>
                        </div>
                        <div className="">
                          <button
                            onClick={handleVehiclePopup}
                            className="px-8 bg-yellow-600 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="w-full text-white flex py-2 items-center justify-between">
                        <div className="w-[30%] p-2 flex justify-center">
                          Vehicle Photo
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          Vehicle Name
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          Price/Day
                        </div>
                      </div>
                      <div className="w-full text-white flex  items-center justify-between">
                        <div className="w-[30%]   flex justify-center">
                          <input
                            type="file"
                            // value={uploadStageData.image}
                            onChange={handleVehicleImage}
                            name="image"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          <input
                            type="text"
                            value={uploadVehicleData.name}
                            onChange={handleVehicleChange}
                            name="name"
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                        <div className="w-[30%] p-2 flex justify-center">
                          <input
                            type="text"
                            name="price"
                            value={uploadVehicleData.price}
                            onChange={handleVehicleChange}
                            className="py-2  rounded bg-gray-500 px-2 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {cateringStatus && (
                <>
                  <div className="w-[80%] flex flex-col pb-4 bg-indigo-800 mx-auto rounded-lg mt-4">
                    <div className="w-full flex py-2 text-white font-bold font-serif text-2xl justify-center">
                      <h2>Catering or Food Menu</h2>
                    </div>
                    <div className="w-full flex justify-evenly ">
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button
                          onClick={handleStarterPopup}
                          className="py-1 bg-blue-700 px-3 rounded-lg"
                        >
                          Add Starter
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button
                          onClick={handleMainPopup}
                          className="py-1 bg-red-700 px-3 rounded-lg"
                        >
                          Add Main
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button
                          onClick={handleDessertPopup}
                          className="py-1 bg-yellow-500 px-3 rounded-lg"
                        >
                          Add Dessert
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button
                          onClick={handleSaladPopup}
                          className="py-1 bg-emerald-500 px-3 rounded-lg"
                        >
                          Add Salad
                        </button>
                      </div>
                    </div>
                    {isStarter && (
                      <>
                        <div className="w-[90%] mx-auto my-4 flex-col bg-blue-700 flex justify-center">
                          <h2 className="flex p-2 text-white font-serif justify-center">
                            Starter Menu
                          </h2>
                          <div className="w-full flex justify-evenly">
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Name
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Image
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Price
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Option
                            </div>
                          </div>
                          {isStarterUploadedData.map((item, id) => {
                            return (
                              <div key={id}>
                                <div className="w-full items-center flex justify-evenly">
                                  <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                    {item.starter_name}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <div className="w-20 p-2 h-20">
                                      <img
                                        src={item.starter_image}
                                        className="w-full h-full"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    {item.starter_price}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <button
                                      onClick={() => deleteStarter(item._id)}
                                      className="bg-black rounded text-white font-bold px-4 py-2"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {isMain && (
                      <>
                        <div className="w-[90%] mx-auto my-4 flex-col bg-red-500 flex justify-center">
                          <h2 className="flex p-2 text-white font-serif justify-center">
                            Main Menu
                          </h2>
                          <div className="w-full flex justify-evenly">
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Name
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Image
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Price
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Option
                            </div>
                          </div>
                          {isMainUploadedData.map((item, id) => {
                            return (
                              <div key={id}>
                                <div className="w-full items-center flex justify-evenly">
                                  <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                    {item.main_name}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <div className="w-20 p-2 h-20">
                                      <img
                                        src={item.main_image}
                                        className="w-full h-full"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    {item.main_price}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <button
                                      onClick={() => deleteMain(item._id)}
                                      className="bg-black rounded text-white font-bold px-4 py-2"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {isDessert && (
                      <>
                        <div className="w-[90%] mx-auto my-4 flex-col bg-yellow-500 flex justify-center">
                          <h2 className="flex p-2 text-white font-serif justify-center">
                            Dessert Menu
                          </h2>
                          <div className="w-full flex justify-evenly">
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Name
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Image
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Price
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Option
                            </div>
                          </div>
                          {isDessertUploadedData.map((item, id) => {
                            return (
                              <div key={id}>
                                <div className="w-full items-center flex justify-evenly">
                                  <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                    {item.dessert_name}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <div className="w-20 p-2 h-20">
                                      <img
                                        src={item.dessert_image}
                                        className="w-full h-full"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    {item.dessert_price}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <button
                                      onClick={() => deleteDessert(item._id)}
                                      className="bg-black rounded text-white font-bold px-4 py-2"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {isSalad && (
                      <>
                        <div className="w-[90%] mx-auto my-4 flex-col bg-emerald-500 flex justify-center">
                          <h2 className="flex p-2 text-white font-serif justify-center">
                            Salad Menu
                          </h2>
                          <div className="w-full flex justify-evenly">
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Name
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Image
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Price
                            </div>
                            <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                              Option
                            </div>
                          </div>
                          {isSaladUploadedData.map((item, id) => {
                            return (
                              <div key={id}>
                                <div className="w-full items-center flex justify-evenly">
                                  <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                    {item.salad_name}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <div className="w-20 p-2 h-20">
                                      <img
                                        src={item.salad_image}
                                        className="w-full h-full"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    {item.salad_price}
                                  </div>
                                  <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                    <button
                                      onClick={() => deleteSalad(item._id)}
                                      className="bg-black rounded text-white font-bold px-4 py-2"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {stageStatus && (
                <>
                  <div className="w-[80%]  flex flex-col bg-indigo-800 mx-auto rounded-lg mt-4">
                    <div className="w-full flex font-serif py-2 text-white font-bold text-2xl justify-center">
                      <h2>Stage Menu</h2>
                    </div>
                    <div className="w-full flex justify-evenly ">
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-blue-700 px-10 rounded-lg">
                          Image
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-red-700 px-10 rounded-lg">
                          Price
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-yellow-500 px-10 rounded-lg">
                          Size
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-emerald-500 px-10 rounded-lg">
                          Option
                        </button>
                      </div>
                    </div>
                    {isStage && (
                      <>
                        {isStageUploadedData.map((item, id) => {
                          return (
                            <div key={id}>
                              <div className="w-full items-center flex justify-evenly">
                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <div className="w-20 p-2 h-20">
                                    <img
                                      src={item.stage_image}
                                      className="w-full h-full"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                  {item.stage_budget}
                                </div>

                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  {item.stage_size}
                                </div>
                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <button
                                    onClick={() => deleteStage(item._id)}
                                    className="bg-black rounded text-white font-bold px-4 py-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="w-full flex justify-center pb-4  pt-2">
                      <button
                        onClick={handleStagePopup}
                        className="px-10 py-2 bg-pink-700 text-white font-bold  rounded-lg hover:bg-pink-900"
                      >
                        Add Stage
                      </button>
                    </div>
                  </div>
                </>
              )}
              {decorationStatus && (
                <>
                  <div className="w-[80%]  flex flex-col bg-indigo-800 mx-auto rounded-lg mt-4">
                    <div className="w-full flex font-serif py-2 text-white font-bold text-2xl justify-center">
                      <h2>Decoration Menu</h2>
                    </div>
                    <div className="w-full flex justify-evenly ">
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-blue-700 px-10 rounded-lg">
                          Image
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-red-700 px-10 rounded-lg">
                          Budget
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-emerald-500 px-10 rounded-lg">
                          Option
                        </button>
                      </div>
                    </div>
                    {isDecoration && (
                      <>
                        {isDecorationUploadedData.map((item, id) => {
                          return (
                            <div key={id}>
                              <div className="w-full items-center flex justify-evenly">
                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <div className="w-20 p-2 h-20">
                                    <img
                                      src={item.decoration_image}
                                      className="w-full h-full"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                  {item.decoration_amount}
                                </div>

                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <button
                                    onClick={() => deleteDecoration(item._id)}
                                    className="bg-black rounded text-white font-bold px-4 py-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="w-full flex justify-center pb-4  pt-2">
                      <button
                        onClick={handleDecorationPopup}
                        className="px-10 py-2 bg-pink-700 text-white font-bold  rounded-lg hover:bg-pink-900"
                      >
                        Add Decoration
                      </button>
                    </div>
                  </div>
                </>
              )}
              {vehicleStatus && (
                <>
                  <div className="w-[80%]  flex flex-col bg-indigo-800 mx-auto rounded-lg mt-4">
                    <div className="w-full flex font-serif py-2 text-white font-bold text-2xl justify-center">
                      <h2>Vehilce Menu</h2>
                    </div>
                    <div className="w-full flex justify-evenly ">
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-blue-700 px-10 rounded-lg">
                          Image
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-red-700 px-10 rounded-lg">
                          Name
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-yellow-500 px-10 rounded-lg">
                          Price/day
                        </button>
                      </div>
                      <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                        <button className="py-1 bg-emerald-500 px-10 rounded-lg">
                          Option
                        </button>
                      </div>
                    </div>
                    {isVehicle && (
                      <>
                        {isVehicleUploadedData.map((item, id) => {
                          return (
                            <div key={id}>
                              <div className="w-full items-center flex justify-evenly">
                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <div className="w-20 p-2 h-20">
                                    <img
                                      src={item.vehicle_image}
                                      className="w-full h-full"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="w-[20%] h-[30%] p-2 flex justify-center font-serif text-white  ">
                                  {item.vehicle_name}
                                </div>

                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  {item.vehicle_amount}
                                </div>
                                <div className="w-[20%] p-2 flex justify-center font-serif text-white  ">
                                  <button
                                    onClick={() => deleteVehicle(item._id)}
                                    className="bg-black rounded text-white font-bold px-4 py-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="w-full flex justify-center pb-4  pt-2">
                      <button
                        onClick={handleVehiclePopup}
                        className="px-10 py-2 bg-pink-700 text-white font-bold  rounded-lg hover:bg-pink-900"
                      >
                        Add Vehicle
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
