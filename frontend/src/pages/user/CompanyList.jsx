import React, { useEffect, useState } from "react";
import CompanyLIstLayout from "../../components/user/CompanyLIstLayout";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Url } from "../../config/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
const CompanyList = () => {
  const [limit, setlimit] = useState(1);
  const [page, setpage] = useState(1);
  const [filterByService, setfilterByService] = useState();
  // const [loading, setloading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [servicePage, setservicePage] = useState(1);
  let cou = 1;
  const [companyListBanner, setcompanyListBanner] = useState(false);
  const [filterByServiceBanner, setfilterByServiceBanner] = useState(false);
  const [companyList, setcompanyList] = useState([]);
  const [selectedService, setselectedService] = useState("");
    //loading and color
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("");
    let colors = [
      "#581845",
      "#00FFFF",
      "#FFC300",
      "#FF5733",
      "#C70039",
      "#900C3F ",
      "#0000FF",
    ];
  let pageCount = [];
  const navigate = useNavigate();
  const getAllCompanies = async () => {
    console.log("calss");
    setLoading(true);
    let randomColor=Math.floor(Math.random()*color.length)
      setColor(colors[randomColor])
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${Url}/get-all-companies?limit=${limit}&page=${page}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    if (data.tokenExp) {
      toast.error(data.msg);
      localStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (data.success) {
      const total = data.totalPages;
      // console.log(tot);
      settotalPage(total);
      // console.log(totalPage);
      // console.log(pageCount);
      setLoading(false);
      setcompanyListBanner(true);
      setfilterByService(false);
      setcompanyList(data.list);
    }
    // console.log(data);
  };
  useEffect(() => {
    getAllCompanies();
  }, [page]);
  const handleService = async (name) => {
    setservicePage(1);
    try {
      setLoading(true);
      let randomColor=Math.floor(Math.random()*color.length)
      setColor(colors[randomColor])
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${Url}/filter-by-services?limit=${limit}&page=${cou}&service=${name}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if(data.tokenExp){
        toast.error("Authentication Failed")
        localStorage.clear();
        navigate("/login")
      }
      console.log(selectedService);
      setselectedService(data.service);
      console.log(data);
      let manager = data.manager;
      // console.log(manager);
      const total = data.totalPages;
      // console.log(tot);
      settotalPage(total);
      let len = manager.length;
      let z = [];
      for (let i = 0; i < len; i++) {
        // console.log(data.manager[i].length);
        let d = data.manager[i];
        let de = d[0];
        console.log(de);
        z[i] = de;
      }
      //  console.log(z);
      setfilterByService(z);
      setcompanyListBanner(false);
      setfilterByServiceBanner(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(filterByService);
  for (let i = 1; i <= totalPage; i++) {
    pageCount.push(i);
  }
  // console.log(pageCount);
  const handlePage = (val) => {
    console.log(val);
    setpage(val);
  };
  const handleServicePage = (val) => {
    //  let cou=val
    setservicePage(val);
    //   console.log(servicePage);
    cou = val;
    pageClicked(selectedService);
  };
  const pageClicked = async (name) => {
    try {
      setloading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${Url}/filter-by-services?limit=${limit}&page=${cou}&service=${name}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(selectedService);
      setselectedService(data.service);
      console.log(data);
      let manager = data.manager;
      // console.log(manager);
      const total = data.totalPages;
      // console.log(tot);
      settotalPage(total);
      let len = manager.length;
      let z = [];
      for (let i = 0; i < len; i++) {
        // console.log(data.manager[i].length);
        let d = data.manager[i];
        let de = d[0];
        console.log(de);
        z[i] = de;
      }
      //  console.log(z);
      setfilterByService(z);
      setcompanyListBanner(false);
      setfilterByServiceBanner(true);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-[25%] bg-indigo-600">
        <CompanyLIstLayout onClick={handleService} />
      </div>
      <div className="w-[75%]">
        <div className="flex w-full relative ">
           {loading && (
        <>
          <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
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
      )}
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-center py-5">
              {" "}
              <h2 className="text-5xl font-bold text-indigo-700">
                Select You Company
              </h2>
            </div>

            {companyListBanner && (
              <>
                <div className="flex w-full justify-around py-10 gap-10 flex-wrap">
                  {companyList.map((item, id) => {
                    return (
                      <div
                        className="w-72 bg-blue-400 rounded-lg justify-center flex flex-wrap"
                        key={id}
                      >
                        <div className="flex w-52 justify-center mx-auto  h-52">
                          <img
                            src="https://img.freepik.com/premium-vector/alphabetical-letter-e-logo-collection_647881-448.jpg"
                            className="py-3 w-full h-full rounded-full"
                            alt=""
                          />
                        </div>
                        <div className="w-full  pb-2 flex justify-center mx-auto">
                          <h2 className="mx-auto font-bold text-xl text-slate-600">
                            {item.company_name}
                          </h2>
                        </div>
                        <div className="w-full text-slate-600 font-bold pb-2 flex  items-center flex-col">
                          <div className="flex justify-center">
                            <h2 className="font">
                              {item.place.charAt(0).toUpperCase() +
                                item.place.slice(1)}
                              ,
                            </h2>
                            <h2>
                              {item.district.charAt(0).toUpperCase() +
                                item.district.slice(1)}
                            </h2>
                          </div>
                          <div className="">
                            {item.state.charAt(0).toUpperCase() +
                              item.state.slice(1)}
                          </div>
                        </div>
                        <div className="flex justify-center pb-3 rounded  w-full">
                          <Link to={`/company-detail/${item._id}`}>
                            {" "}
                            <button className="bg-blue-500 rounded px-7 py-1">
                              Select
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full flex gap-2 justify-center pt-2">
                  {pageCount.map((count, id) => {
                    return (
                      <>
                        {page === count ? (
                          <div className="w-5  flex justify-center text-white font-bold bg-red-700 h-6">
                            <button onClick={() => handlePage(id + 1)}>
                              {count}
                            </button>
                          </div>
                        ) : (
                          <div className="w-5 flex justify-center text-white font-bold bg-slate-700 h-6">
                            <button onClick={() => handlePage(id + 1)}>
                              {count}
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </>
            )}
            {filterByServiceBanner && (
              <>
                <div className="flex w-full justify-around py-10 gap-10 flex-wrap">
                  {filterByService.map((item, id) => {
                    return (
                      <div
                        className="w-72 bg-blue-400 rounded-lg justify-center flex flex-wrap"
                        key={id}
                      >
                        <div className="flex w-52 justify-center mx-auto  h-52">
                          <img
                            src="https://img.freepik.com/premium-vector/alphabetical-letter-e-logo-collection_647881-448.jpg"
                            className="py-3 w-full h-full rounded-full"
                            alt=""
                          />
                        </div>
                        <div className="w-full  pb-2 flex justify-center mx-auto">
                          <h2 className="mx-auto font-bold text-xl text-slate-600">
                            {item.company_name}
                          </h2>
                        </div>
                        <div className="w-full text-slate-600 font-bold pb-2 flex  items-center flex-col">
                          <div className="flex justify-center">
                            <h2 className="font">
                              {item.place.charAt(0).toUpperCase() +
                                item.place.slice(1)}
                              ,
                            </h2>
                            <h2>
                              {item.district.charAt(0).toUpperCase() +
                                item.district.slice(1)}
                            </h2>
                          </div>
                          <div className="">
                            {item.state.charAt(0).toUpperCase() +
                              item.state.slice(1)}
                          </div>
                        </div>
                        <div className="flex justify-center pb-3 rounded  w-full">
                          <Link to={`/company-detail/${item._id}`}>
                            {" "}
                            <button className="bg-blue-500 rounded px-7 py-1">
                              Select
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex gap-2 justify-center pt-2">
                  {pageCount.map((count, id) => {
                    return (
                      <>
                        {servicePage === count ? (
                          <div className="w-5  flex justify-center text-white font-bold bg-red-700 h-6">
                            <button onClick={() => handleServicePage(id + 1)}>
                              {count}
                            </button>
                          </div>
                        ) : (
                          <div className="w-5 flex justify-center text-white font-bold bg-slate-700 h-6">
                            <button onClick={() => handleServicePage(id + 1)}>
                              {count}
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CompanyList;
