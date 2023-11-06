import jwt from "jsonwebtoken";
import managerModel from "../models/managerModel.js";
import mongoose from "mongoose";
const Objectid = mongoose.Types.ObjectId;
import bcrypt from "bcrypt";
import serviceModel from "../models/serviceModel.js";
import bookingModel from "../models/bookingModel.js";
let Name;
let Mobile;
let Place;
let Company_name;
let District;
let State;
let Aadhar;
let Id;
let Pincode;
let Email;
let Password;
let Address;
export const signup = async (req, res) => {
  try {
    console.log("call");
    const {
      name,
      password,
      pincode,
      voterorlicence,
      aadhar,
      place,
      district,
      state,
      address,
      mobile,
      company,
      email,
    } = req.body;

    const manager = await managerModel.findOne({ email: email });
    if (manager) {
      res.json({ msg: "email id already signed", exist: true });
    } else {
      (Name = name), (Password = password);
      Pincode = pincode;
      Id = voterorlicence;
      Aadhar = aadhar;
      Place = place;
      (District = district), (State = state);
      (Address = address), (Mobile = mobile);
      Company_name = company;
      Email = email;
      res.json({ success: true, msg: "OTP sented successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signWithOtp = async (req, res) => {
  try {
    console.log("hy");
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newManager = new managerModel({
      name: Name,
      mobile: Mobile,
      place: Place,
      company_name: Company_name,
      district: District,
      state: State,
      adhaar: Aadhar,
      license_or_voterId: Id,
      email: Email,
      pincode: Pincode,
      password: hashedPassword,
      address: Address,
      manager_image: "",
      company_logo: "",
    });
    await newManager.save();
    res.json({
      msg: "Your request is sending to admin, After approval of admin, you can login. otherwise you cannot login",
      success: true,
    });
    // console.log("done");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await managerModel.findOne({ email: email });
    if (manager) {
      bcrypt
        .compare(password, manager.password)
        .then((status) => {
          if (status) {
            const block = manager.block;
            if (block === true) {
              res.json({
                msg: "Admin Blocked your account.",
                block: true,
                success: false,
              });
            } else {
              const approval = manager.approval;
              if (approval === true) {
                const token = jwt.sign({ id: manager._id }, "vinayan", {
                  expiresIn: "1d",
                });
                manager.password=null
                res.json({ msg: "Login successfully", success: true, token,manager });
              } else {
                res.json({
                  msg: "Waiting for approval",
                  succes: false,
                  notApproved: true,
                });
              }
            }
          } else {
            res.json({
              msg: "password error",
              passwordError: true,
              success: false,
            });
          }
        })
        .catch((err) => {
          // res.json({msg:"password error",passwordError:true,success:false})
          console.log(err);
        });
    } else {
      res.json({
        msg: "Email id not found, Please register first.",
        noExist: true,
        success: false,
      });
    }
  } catch (error) {
    res.json({ msg: "Something error" });
    console.log(error);
  }
};
export const getManagerData=async(req,res)=>{
  try {
    const {managerId}=req.body
const manager=await managerModel.findOne({_id:new Objectid(managerId)})
res.json({success:true,manager})
  } catch (error) {
    console.log(error);
  }
}
export const Managerdata = async (req, res) => {
  const id = req.body.managerId;
  const manager = await managerModel.findOne({ _id: new Objectid(id) });
  const booking = await bookingModel.find({
    manager_id: new Objectid(id),
  });
  
  if (manager) {
    manager.password = null;
    res.json({ success: true, managerData: manager,booking });
  } else {
    res.json({ msg: "Manager not found", success: false, noManager: true });
  }
};
export const selectServices = async (req, res) => {
  const {
    vehicleChecked,
    decorationChecked,
    stageServiceChecked,
    foodChecked,
    photography,
    managerId,
  } = req.body;
  try {
    console.log(req.body);
    const exist = await serviceModel.findOne({
      manager_id: new Objectid(managerId),
    });
    const manager=await managerModel.find({_id:new Objectid(managerId)})
    if (!exist) {
      const newService = new serviceModel({
        manager_id: managerId,
        catering_name: "Food Service",
        catering_status: foodChecked,
        stage_name: "Stage Service",
        stage_status: stageServiceChecked,
        decoration_name: "Decoration",
        decoration_status: decorationChecked,
        photography_name: "Photography",
        photography_status: photography,
        vehicle_name: "Luxury Vehicles",
        vehicle_status: vehicleChecked,
        cateringMenu: [
          {
            category_name: ["Starters", "Main", "Desserts", "Salads"],
            status: foodChecked,
          },
        ],
        stageMenu: [
          {
            category_name: ["Stage Photo", "Stage Budget", "Stage Size"],
            status: stageServiceChecked,
          },
        ],
        decorationMenu: [
          {
            category_name: [
              "Decoration Photo",
              "Including Photos",
              "Decoration Budget",
            ],
            status: decorationChecked,
          },
        ],
        photographyMenu: [
          {
            category_name: [
              "Recent Photography Photos",
              "Shop Name",
              "Mobile Number",
              "Address",
              "Budget",
            ],
            status: photography,
          },
        ],
        luxuryVehicleMenu: [
          {
            category_name: [
              "Vehicle",
              "Owner Name",
              "Mobile Number",
              "Rent Price",
            ],
            status: vehicleChecked,
          },
        ],
      });
      await newService.save();
      res.status(200).send({ success: true,manager });
    } else {
      res.status(200).send({ exist: true, message: "You have already added" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAddedServices = async (req, res) => {
  try {
    const { managerId } = req.body;
    const exist = await serviceModel.findOne({
      manager_id: new Objectid(managerId),
    });
    const manager=await managerModel.find({_id:new Objectid(managerId)})
    if (!exist) {
      const newService = new serviceModel({
        manager_id: managerId,
        catering_name: "Food Service",
        catering_status: false,
        stage_name: "Stage Service",
        stage_status: false,
        decoration_name: "Decoration",
        decoration_status: false,
        photography_name: "Photography",
        photography_status: false,
        vehicle_name: "Luxury Vehicles",
        vehicle_status: false,
        cateringMenu: [
          {
            category_name: ["Starters", "Main", "Desserts", "Salads"],
            status: false,
          },
        ],
        stageMenu: [
          {
            category_name: ["Stage Photo", "Stage Budget", "Stage Size"],
            status: false,
          },
        ],
        decorationMenu: [
          {
            category_name: [
              "Decoration Photo",
              "Including Photos",
              "Decoration Budget",
            ],
            status: false,
          },
        ],
        photographyMenu: [
          {
            category_name: [
              "Recent Photography Photos",
              "Shop Name",
              "Mobile Number",
              "Address",
              "Budget",
            ],
            status: false,
          },
        ],
        luxuryVehicleMenu: [
          {
            category_name: [
              "Vehicle",
              "Owner Name",
              "Mobile Number",
              "Rent Price",
            ],
            status: false,
          },
        ],
      });
      await newService.save();
      // res.status(200).send({ success: true });
      const data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      res.json({ success: true, service: data,manager });
    } else {
      // res.status(200).send({ exist: true, message: "You have already added" });
      const data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      res.json({ success: true, service: data });
    }
    // const data=await serviceModel.findOne({manager_id:new Objectid(managerId)})
    // res.json({success:true,service:data})
  } catch (error) {
    console.log(error);
  }
};
export const updateFoodStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;
    console.log(status, managerId);
    const data = await serviceModel.updateOne(
      { manager_id: new Objectid(managerId) },
      {
        $set: {
          catering_status: status,
        },
      }
    );
    const updateData = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({
      msg: "Service added successfully.",
      result: updateData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStageStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;
    console.log(status, managerId);
    const data = await serviceModel.updateOne(
      { manager_id: new Objectid(managerId) },
      {
        $set: {
          stage_status: status,
        },
      }
    );
    const updateData = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({
      msg: "Service added successfully.",
      result: updateData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateDecorationStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;
    console.log(status, managerId);
    await serviceModel.updateOne(
      { manager_id: new Objectid(managerId) },
      {
        $set: {
          decoration_status: status,
        },
      }
    );
    const updateData = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({
      msg: "Service added successfully.",
      result: updateData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updatePhotograpyStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;
    console.log(status, managerId);
    await serviceModel.updateOne(
      { manager_id: new Objectid(managerId) },
      {
        $set: {
          photography_status: status,
        },
      }
    );
    const updateData = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({
      msg: "Service added successfully.",
      result: updateData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateVehicleStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;
    console.log(status, managerId);
    await serviceModel.updateOne(
      { manager_id: new Objectid(managerId) },
      {
        $set: {
          vehicle_status: status,
        },
      }
    );
    const updateData = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({
      msg: "Service added successfully.",
      result: updateData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getMenuList = async (req, res) => {
  try {
    // console.log(req.body.managerId);
    const { managerId } = req.body;
    const data = await serviceModel.findOne({
      manager_id: new Objectid(managerId),
    });
    const manager=await managerModel.find({_id:new Objectid(managerId)})
    res.json({ success: true, menuList: data,manager });
  } catch (error) {
    console.log(error);
  }
};

export const addStarter = async (req, res) => {
  try {
    const { managerId, uploadStarterData } = req.body;
    // console.log(managerId,uploadStarterData);
    uploadStarterData.price = parseInt(uploadStarterData.price);
    let { image, price, name } = uploadStarterData;
    // console.log(image,price,name);
    await serviceModel.findOneAndUpdate(
      {
        manager_id: new Objectid(managerId),
      },
      {
        $set: {
          starter_status: true,
        },
      }
    );
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          starter_menu: [
            {
              starter_name: name,
              starter_price: price,
              starter_image: image,
            },
          ],
        },
      }
    );
    const menu_list = await serviceModel.find({
      manager_id: new Objectid(managerId),
    });
    res.json({ success: true, menu_list });
  } catch (error) {
    console.log(error);
  }
};
export const addMain = async (req, res) => {
  try {
    const { managerId, uploadMainData } = req.body;
    // console.log(managerId,uploadMainData);
    uploadMainData.price = parseInt(uploadMainData.price);
    let { image, price, name } = uploadMainData;
    console.log(image, price, name);
    await serviceModel.findOneAndUpdate(
      {
        manager_id: new Objectid(managerId),
      },
      {
        $set: {
          main_status: true,
        },
      }
    );
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          main_menu: [
            {
              main_name: name,
              main_price: price,
              main_image: image,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const addDessert = async (req, res) => {
  try {
    const { managerId, uploadDessertData } = req.body;
    uploadDessertData.price = parseInt(uploadDessertData.price);
    let { image, price, name } = uploadDessertData;
    console.log(image, price, name);
    await serviceModel.findOneAndUpdate(
      {
        manager_id: new Objectid(managerId),
      },
      {
        $set: {
          dessert_status: true,
        },
      }
    );
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          dessert_menu: [
            {
              dessert_name: name,
              dessert_price: price,
              dessert_image: image,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const addSalad = async (req, res) => {
  try {
    const { managerId, uploadSaladData } = req.body;
    uploadSaladData.price = parseInt(uploadSaladData.price);
    let { image, price, name } = uploadSaladData;
    console.log(image, price, name);
    await serviceModel.findOneAndUpdate(
      {
        manager_id: new Objectid(managerId),
      },
      {
        $set: {
          salad_status: true,
        },
      }
    );
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          salad_menu: [
            {
              salad_name: name,
              salad_price: price,
              salad_image: image,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteStarter = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          starter_menu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteMain = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          main_menu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteDessert = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          dessert_menu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteSalad = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          salad_menu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const addStageMenu = async (req, res) => {
  try {
    const { managerId, uploadStageData } = req.body;
    uploadStageData.price = parseInt(uploadStageData.price);
    let { image, price, size } = uploadStageData;
    console.log(size);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          stageMenu: [
            {
              manager_id: managerId,
              stage_image: image,
              stage_budget: price,
              stage_size: size,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          stageMenu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const addDecorationMenu = async (req, res) => {
  try {
    const { managerId, uploadDecorationData } = req.body;
    uploadDecorationData.price = parseInt(uploadDecorationData.price);
    let { image, price } = uploadDecorationData;
    console.log(image, price);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          decorationMenu: [
            {
              manager_id: managerId,
              decoration_image: image,
              decoration_amount: price,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteDecoration = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          decorationMenu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const addVehicleMenu = async (req, res) => {
  try {
    const { managerId, uploadVehicleData } = req.body;
    uploadVehicleData.price = parseInt(uploadVehicleData.price);
    let { image, price,name } = uploadVehicleData;
    console.log(image, price,name);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $push: {
          vehicleMenu: [
            {
              manager_id: managerId,
              vehicle_image: image,
              vehicle_amount: price,
              vehicle_name: name,
            },
          ],
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;
    // console.log(id);
    await serviceModel.findOneAndUpdate(
      { manager_id: new Objectid(managerId) },
      {
        $pull: {
          vehicleMenu: { _id: new Objectid(id) },
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const getBooking = async (req, res) => {
  try {
    const { managerId } = req.body;
    const manager=await managerModel.find({_id:new Objectid(managerId)})
    const booking = await bookingModel.find({
      manager_id: new Objectid(managerId),
    });
    
    // const success = await bookingModel.find({
    //   form: { $elemMatch: { status: "Success" } },
    // });
    // console.log(success.length);
    res.json({  booking,manager });
  } catch (error) {
    console.log(error);
  }
};
export const uploadImage=async(req,res)=>{
  try {
    const {image,managerId}=req.body
    // console.log(image,managerId);
    await managerModel.findOneAndUpdate({_id:new Objectid(managerId)},{
      $set:{
        manager_image:image
      }
    })
    // const manager=await managerModel.findOne({_id:new Objectid(managerId)})
res.json({success:true})
  } catch (error) {
    console.log(error);
  }
}