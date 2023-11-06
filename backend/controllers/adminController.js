import adminModel from "../models/adminModel.js";
import managerModel from "../models/managerModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
const Objectid = mongoose.Types.ObjectId;
export const adminLogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (admin) {
      if (admin.password === password) {
        res.json({ success: true, msg: "Successfully login" });
      } else {
        res.json({ msg: "Pasword incorrect", success: false });
      }
    } else {
      res.json({ msg: "Email not found", success: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const dashboard = async (req, res) => {
  try {
    const user = await userModel.find();
    const manager = await managerModel.find();
    const approverdManager = await managerModel.find({ approvel: true });
    // console.log(user.length,approverdManager.length,manager.length);
    const dashboardHeader = {
      Total_users: user.length,
      Total_managers: manager.length,
      Total_approved_managers: approverdManager.length,
    };
    res.json({ msg: "OK", success: true, dashboardHeader });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users) {
      res.json({ success: true, users });
    } else {
      res.json({ success: false, noExist: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getManagers = async (req, res) => {
  try {
    const managers = await managerModel.find({checked:false});
    // console.log(managers.length);
    if (managers.length === 0) {
      res.json({
        success: false,
        noExist: true,
        msg: "no pending for Approvel",
      });
    } else {
      res.json({ success: true, managers });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getApprovedManagers = async (req, res) => {
  try {
    const approved = await managerModel.find({ approval: true });
    if (approved.length === 0) {
      res.json({ success: true, msg: "no approved managers", noExist: true });
    } else {
      res.json({
        msg: "Approved Managers Data Fetched",
        success: true,
        approved,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const manageAccess = async (req, res) => {
  try {
    const { id, block } = req.body;
    const modifyAccess = !block;
    console.log(id, modifyAccess);
    const data = await userModel.updateOne(
      { _id: new Objectid(id) },
      {
        $set: {
          block: modifyAccess,
        },
      }
    );
    let Message;
    if (modifyAccess === true) {
      Message = "Account Blocked";
    } else {
      Message = "Account Unblocked";
    }
    const upatedData = await userModel.find();
    res.json({ success: true, msg: Message, upatedData });
  } catch (error) {
    console.log(error);
  }
};
export const manageManagerApproval = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(id, status);
    if (status === "reject") {
      managerModel
        .updateOne(
          { _id: new Objectid(id) },
          {
            $set: {
              reject: true,
              checked:true,
              approval:false
            },
          }
        )
        .then(() => {
          res.json({
            msg: "Manager request rejected.",
            success: false,
            reject: true,
          });
        });
    } else {
      managerModel
        .updateOne(
          { _id: new Objectid(id) },
          {
            $set: {
              approval: true,
              checked:true,
              reject:false
            },
          }
        )
        .then(() => {
          res.json({
            msg: "Manager request Approved.",
            success: true,
            approval: true,
          });
        });
    }
  } catch (error) {
    console.log(error);
  }
};
export const viewManager=async(req,res)=>{
  try {
    const id=req.params.id
    const data=await managerModel.find({_id:new Objectid(id)})
    res.json({msg:"data fetched",success:true,data})
  } catch (error) {
    console.log(error);
  }
}