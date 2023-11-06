import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url } from "../../config/BaseUrl";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-hot-toast'

const CartLIst = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  localStorage.setItem("selected",false)
  console.log(id);
  const [cartList, setcartList] = useState([]);
  const [cartLength, setcartLength] = useState(0)
  const fetchCartList = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/get-cart-list`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      let len=data.cart_list.categories.length
     
      if(len==0){
        console.log(len);
        navigate("/company-list")
      }
      setcartList(data.cart_list.categories);
      // console.log(data.cart_list.categories.length);
      // console.log(data.cart_list.categories);
      setcartLength(data.cart_list.categories.length)
      // console.log(cartLength);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartList();
  }, []);
  const handleIncrement=async(e,itemId,itemPrice,itemQuantity)=>{
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${Url}/increment-quantity`,
        { itemPrice, itemId, itemQuantity },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
     console.log(data);
      setcartList(data.update.categories);
      setcartLength(cartList.length)
    } catch (error) {
      console.log(error);
    }
  }
  const handleDecrement=async(e,itemId,itemPrice,itemQuantity)=>{
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${Url}/decrement-quantity`,
        { itemPrice, itemId, itemQuantity },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    //  console.log(data);
      setcartList(data.update.categories);
      setcartLength(cartList.length)
    } catch (error) {
      console.log(error);
    }
  }
const handleDelete=async(item_id)=>{
  try {
    const token=localStorage.getItem("token")
    const {data}=await axios.delete(`${Url}/delete-from-cart/${item_id}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    console.log(data);
    let len=data.update.categories.length
     
    if(len==0){
      console.log(len);
      navigate("/company-list")
    }
    toast.success(data.msg)
    setcartList(data.update.categories);
    setcartLength(cartList.length)
  } catch (error) {
    console.log(error);
  }
}
// const prices = cartList.map((product) => product.total_price)
// const total = prices.reduce((acc, curr) => acc + curr)

const totalPrice = cartList.reduce((acc, curr) => acc + curr.total_price, 0)
const totalItem=cartList.reduce((acc,curr)=>acc+curr.quantity,0)
// console.log('total: ', {totalPrice,totalItem} )
  return (
    <>
    <div classname="container">
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#d2c9ff" }}
      >
        <div className="container py-4 px-4 h-100">
          <div className="row d-flex font-bold justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: 15 }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Cart List</h1>
                          <h6 className="mb-0 text-muted">
                            {cartLength === 1
                              ? `${cartLength} item`
                              : `${cartLength} items`}{" "}
                          </h6>
                        </div>
                        <hr className="my-4" />
                        {cartList.map((item, id) => {
                          return (
                            <div key={id} >
                              <div className="row mb-4 d-flex justify-content-between align-items-center">
                                <div className="col-md-2 col-lg-2 col-xl-2">
                                  <img
                                    src={item.image}
                                    className="img-fluid  rounded-3"
                                    
                                  />
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-3">
                                  <h6 className="text-muted">
                                    {item.category_name}
                                  </h6>
                                  <h6 className="text-black mb-0"></h6>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 d-flex">
                                  <div className="">
                                    <span className="input-group-btn">
                                      <button onClick={(event)=>handleDecrement(event,item._id,item.price,item.quantity)}
                                        type="button"
                                        class="quantity-left-minus bg-slate-900 btn  hover:bg-emerald-500  btn-number"
                                        data-type="minus"
                                        data-field=""
                                      >
                                        <span className="glyphicon text-white text-xl font-bold  glyphicon-minus">
                                          -
                                        </span>
                                      </button>
                                    </span>
                                  </div>
                                  <div className="mx-1 px-4 flex items-center text-white font-bold bg-emerald-500 rounded-md">
                                    <span>{item.quantity}</span>
                                  </div>
                                 
                                  <span className="input-group-btn">
                                    <button
                                    onClick={(event)=>handleIncrement(event,item._id,item.price,item.quantity)}
                                      type="button"
                                      className="quantity-right-plus bg-slate-900 btn  hover:bg-emerald-500 btn-number"
                                      data-type="plus"
                                      data-field
                                    >
                                      <span className="glyphicon text-white text-xl  font-bold glyphicon-plus">
                                        +
                                      </span>
                                    </button>
                                  </span>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                  <h6 className="mb-0">{item.total_price}</h6>
                                </div>
                                <div className="col-md-3  col-lg-2 col-xl-2">
                                <button type="button" onClick={()=>handleDelete(item._id)} className="btn bg-red-600 btn-danger">Delete</button>
                                </div>
                                
                              </div>
                            </div>
                          );
                        })}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <h6 className="mb-0">
                            
                              Back to shop
                         
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold w-full flex justify-center mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">items {totalItem}</h5>
                          <h5>Total : {totalPrice}</h5>
                        </div>
                        <h5 className="text-uppercase mb-3">Shipping Charge 100 Rupees</h5>
                       
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>{totalPrice+100}</h5>
                        </div>
                     
                     <Link className="w-full flex justify-center" to={`/checkout/${id}`}><button
                          type="button"
                          className="btn btn-dark btn-block bg-slate-900 btn-lg"
                          data-mdb-ripple-color="dark"
                        >
                         Continue to Checkout
                        </button></Link>   
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default CartLIst;
