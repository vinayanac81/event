import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const Objectid = mongoose.Types.ObjectId;
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Razorpay from "razorpay";
import serviceModel from "../models/serviceModel.js";
import managerModel from "../models/managerModel.js";
import cartModel from "../models/cartModel.js";
import formModel from "../models/formModel.js";
import bookingModel from "../models/bookingModel.js";
import passport from "passport";
import dotenv from "dotenv";
import findOrCreate from "mongoose-findorcreate";
import { OAuth2Client } from "google-auth-library";
dotenv.config();
let Mobile;
let NameForDatabase;
let EmailForDatabase;
let PasswordForDatabase;
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "https://localhost:4000/auth/google/event",
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await userModel.findOne({ _id: new Objectid(profile.id) });
      if (user) {
        return cb(null, user);
      } else {
        const newUser = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          _id: new Objectid(profile.id),
        });
        return null, newUser;
      }
      // await  userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
const client = new OAuth2Client(process.env.CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    client
      .verifyIdToken({ idToken, audience: process.env.CLIENT_ID })
      .then((response) => {
        const { email_verified, picture, name, email } = response.payload;

        if (email_verified) {
          userModel.findOne({ email }).then((user) => {
            if (user) {
              const token = jwt.sign({ id: user._id }, "vinayan", {
                expiresIn: "1d",
              });
              const { _id, email, name, image } = user;
              return res.json({
                token,
                success:true,
                user: { _id, email, name, image },
              });
            } else {
              const password = email + process.env.JWT_SECRET;

              userModel
                .create({
                  name,
                  email,
                  image:picture,
                  password,
                  block:false
                })
                .then((data) => {
                  const token = jwt.sign({ _id: data._id }, "vinayan", {
                    expiresIn: "1d",
                  });
                  const { _id, email, name, image } = data;

                  return res.json({
                    success:true,
                    token,
                    user: { _id, email, name, image },
                  });
                })
                .catch((err) => {
                  return res.status(401).json({
                    message: "signup error",
                  });
                });
            }
          });
        } else {
          return res.status(400).json({
            error: "Google login failed. Try again",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.block) {
        res.status(200).json({
          msg: "admin blocked your contact.",
          success: false,
          block: true,
        });
      } else {
        bcrypt.compare(password, user.password).then((status) => {
          if (status) {
            // eslint-disable-next-line no-undef
            const token = jwt.sign({ id: user._id }, "vinayan", {
              expiresIn: "1d",
            }); //the jwt.sign() will generate the token,the expiresIn is for destory the session
            res
              .status(200)
              .json({ msg: "Login successfully", success: true, token: token });
          } else {
            res
              .status(200)
              .json({ msg: "Password Error", success: false, passError: true });
          }
        });
      }
    } else {
      res.status(200).json({
        msg: "email id not registered,Pls Signup",
        success: false,
        noUser: true,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Error in Login", success: false, error: true });
  }
};
export const userSignup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    Mobile = number;
    NameForDatabase = name;
    PasswordForDatabase = password;
    EmailForDatabase = email;
    userModel.findOne({ email: email }).then((response) => {
      if (response) {
        res
          .status(200)
          .json({ msg: "Email already registered", success: false });
      } else {
        res.status(200).json({ msg: "Otp sented successfully", success: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const resendOtp = async (req, res) => {
  // console.log(Mobile, "called");
  try {
    res.status(200).json({
      success: true,
      result: Mobile,
      message: "Otp sended successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(PasswordForDatabase, 10);
    PasswordForDatabase = hashedPassword;
    const newUser = new userModel({
      name: NameForDatabase,
      email: EmailForDatabase,
      mobile: Mobile,
      password: PasswordForDatabase,
      block:false
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "Your signUp verificatoin successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


export const userData = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = null;
    res.status(200).json({ userData: user, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const getAllCompanies = async (req, res) => {
  try {
    const { id } = req.body;
    const { limit, page } = req.query;
    const pages = page || 1;
    const limits = limit || 10;
    const exist = (pages - 1) * limits;

    console.log(exist, limit, page);
    const companiesLength = await managerModel.find({ approval: true });
    const companies = await managerModel
      .find({ approval: true })
      .skip(exist)
      .limit(limits);
    let totpage;
    let lengthVal = companiesLength.length;
    //  console.log(lengthVal);
    if (lengthVal > limits) {
      console.log("1");
      if (lengthVal % limits === 0) {
        console.log("2");
        totpage = lengthVal / limits;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totpage,
          list: companies,
        });
      } else {
        console.log("3");
        totpage = lengthVal / limits;
        totpage = Math.floor(totpage) + 1;
        res.json({
          msg: "Data fetched",
          success: true,
          totalPages: totpage,
          list: companies,
        });
      }
    } else if (lengthVal < limits) {
      console.log("4");
      totpage = lengthVal / limits;
      // console.log(totpage);
      totpage = Math.floor(totpage) + 1;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totpage,
        list: companies,
      });
    } else {
      console.log("5");
      totpage = lengthVal / limits;
      res.json({
        msg: "Data fetched",
        success: true,
        totalPages: totpage,
        list: companies,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const filterByService = async (req, res) => {
  try {
    const { userId } = req.body;
    const { limit, page, service } = req.query;
    console.log(service);
    const pages = page || 1;
    const limits = limit || 10;
    const exist = (pages - 1) * limits;
    console.log(page);
    if (service === "stage") {
      const companiesLength = await serviceModel.find({
        stage_status: true,
      });
      const result = await serviceModel
        .find({
          stage_status: true,
        })
        .skip(exist)
        .limit(limits);
      let z = [];
      let manager = [];
      for (let i = 0; i < result.length; i++) {
        z.push(result[i].manager_id);
        manager.push(await managerModel.find({ _id: result[i].manager_id }));
      }
      let totpage;
      let lengthVal = companiesLength.length;
      //  console.log(lengthVal);
      if (lengthVal > limits) {
        if (lengthVal % limits === 0) {
          totpage = lengthVal / limits;
          res.json({
            msg: "Data fetched",
            success: true,
            service,
            manager,
            totalPages: totpage,
          });
        } else {
          totpage = lengthVal / limits;
          totpage = Math.floor(totpage) + 1;
          res.json({
            msg: "Data fetched",
            success: true,
            manager,
            service,
            totalPages: totpage,
          });
        }
      } else if (lengthVal < limits) {
        totpage = lengthVal / limits;
        // console.log(totpage);
        totpage = Math.floor(totpage) + 1;
        res.json({
          msg: "Data fetched",
          success: true,
          service,
          manager,
          totalPages: totpage,
        });
      } else {
        totpage = lengthVal / limits;
        res.json({
          msg: "Data fetched",
          success: true,
          manager,
          service,
          totalPages: totpage,
        });
      }
      // console.log(manager);
    } else if (service === "food") {
      const companiesLength = await serviceModel.find({
        catering_status: true,
      });
      const result = await serviceModel
        .find({
          catering_status: true,
        })
        .skip(exist)
        .limit(limits);
      let z = [];
      let manager = [];
      for (let i = 0; i < result.length; i++) {
        z.push(result[i].manager_id);
        manager.push(await managerModel.find({ _id: result[i].manager_id }));
      }
      let totpage;
      let lengthVal = companiesLength.length;
      //  console.log(lengthVal);
      if (lengthVal > limits) {
        if (lengthVal % limits === 0) {
          totpage = lengthVal / limits;
          res.json({
            msg: "Data fetched",
            success: true,
            manager,
            service,
            totalPages: totpage,
          });
        } else {
          totpage = lengthVal / limits;
          totpage = Math.floor(totpage) + 1;
          res.json({
            msg: "Data fetched",
            success: true,
            manager,
            service,
            totalPages: totpage,
          });
        }
      } else if (lengthVal < limits) {
        totpage = lengthVal / limits;
        // console.log(totpage);
        totpage = Math.floor(totpage) + 1;
        res.json({
          msg: "Data fetched",
          success: true,
          manager,
          service,
          totalPages: totpage,
        });
      } else {
        totpage = lengthVal / limits;
        res.json({
          msg: "Data fetched",
          success: true,
          manager,
          service,
          totalPages: totpage,
        });
      }
      // console.log(manager);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      _id: new Objectid(req.body.userId),
    });
    const services = await serviceModel.findOne({
      manager_id: new Objectid(id),
    });
    const manager = await managerModel.findOne({ _id: new Objectid(id) });
    // console.log(services);
    manager.password = "";
    res.json({
      serviceDetails: services,
      userData: user,
      success: true,
      managerData: manager,
    });
  } catch (error) {
    console.log(error);
  }
};
let stageSelected;
let cateringSelected;
let vehicleSelected;
let decorationSelected;
let photograpySelected;
let managerId;
let isStarter;
export const selectedServices = async (req, res) => {
  try {
    const {
      stageService,
      cateringService,
      decorationService,
      photograpyService,
      vehicleService,
      id,
    } = req.body;
    stageSelected = stageService;
    cateringSelected = cateringService;
    decorationSelected = decorationService;
    vehicleSelected = vehicleService;
    photograpySelected = photograpyService;
    managerId = id;
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const selectedService = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId);
    await cartModel.deleteOne({ user_id: new Objectid(userId) });
    let stageData;
    if (stageSelected === true) {
      let Data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      stageData = Data.stageMenu;
    }
    let cateringData;
    let starter;
    if (cateringSelected === true) {
      let Data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      if (Data.starter_status === true) {
        isStarter = true;
        starter = Data.starter_menu;
      }
    }
    let decorationData;
    if (decorationSelected === true) {
      let Data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      decorationData = Data.decorationMenu;
    }
    let vehicleData;
    if (vehicleSelected === true) {
      let Data = await serviceModel.findOne({
        manager_id: new Objectid(managerId),
      });
      vehicleData = Data.vehicleMenu;
    }
    res.json({
      stageData,
      success: true,
      stageSelected,
      cateringSelected,
      decorationData,
      vehicleSelected,
      vehicleData,
      decorationSelected,
      starter,
      isStarter,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = async (req, res) => {
  try {
    const {
      userId,
      stageChecked,
      starterChecked,
      decorationChecked,
      vehicleChecked,
    } = req.body;
    // console.log(userId);
    // console.log(vehicleChecked);
    console.log(decorationChecked.length);
    const userCart = await cartModel.findOne({ user_id: new Objectid(userId) });
    let z = 0;
    let items = [];
    if (userCart) {
      console.log("y");

      for (let i = 0; i < stageChecked.length; i++) {
        console.log(stageChecked[i].category_name);
        await cartModel.findOneAndUpdate(
          { user_id: new Objectid(userId) },
          {
            $push: {
              categories: [
                {
                  id: stageChecked[i].id,
                  image: stageChecked[i].image,
                  category_name: stageChecked[i].category_name,
                  total_price: stageChecked[i].price,
                  price: stageChecked[i].price,
                  quantity: stageChecked[i].quantity,
                },
              ],
            },
          }
        );
      }
    } else {
      if (starterChecked.length > 0) {
        for (let i = 0; i < starterChecked.length; i++) {
          items[z] = starterChecked[i];
          z++;
          const ifUserCart = await cartModel.findOne({
            user_id: new Objectid(userId),
          });
          if (ifUserCart) {
            console.log("y");

            await cartModel.findOneAndUpdate(
              { user_id: new Objectid(userId) },
              {
                $push: {
                  categories: [
                    {
                      _id: starterChecked[i]._id,
                      image: starterChecked[i].image,
                      category_name: starterChecked[i].category_name,
                      total_price: starterChecked[i].price,
                      name: starterChecked[i].name,
                      price: starterChecked[i].price,
                      quantity: starterChecked[i].quantity,
                    },
                  ],
                },
              }
            );
          } else {
            const newCart = new cartModel({
              user_id: userId,
              categories: [
                {
                  _id: starterChecked[i]._id,
                  image: starterChecked[i].image,
                  category_name: starterChecked[i].category_name,
                  total_price: starterChecked[i].price,
                  name: starterChecked[i].name,
                  price: starterChecked[i].price,
                  quantity: starterChecked[i].quantity,
                },
              ],
            });
            await newCart.save();
          }
        }
      }
      for (let i = 0; i < stageChecked.length; i++) {
        items[z] = stageChecked[i];
        z++;
        const ifUserCart = await cartModel.findOne({
          user_id: new Objectid(userId),
        });
        if (ifUserCart) {
          console.log("y");

          await cartModel.findOneAndUpdate(
            { user_id: new Objectid(userId) },
            {
              $push: {
                categories: [
                  {
                    _id: stageChecked[i].id,
                    image: stageChecked[i].image,
                    category_name: stageChecked[i].category_name,
                    total_price: stageChecked[i].price,
                    price: stageChecked[i].price,
                    quantity: stageChecked[i].quantity,
                  },
                ],
              },
            }
          );
        } else {
          const newCart = new cartModel({
            user_id: userId,
            categories: [
              {
                id: stageChecked[i].id,
                image: stageChecked[i].image,
                category_name: stageChecked[i].category_name,
                total_price: stageChecked[i].price,
                price: stageChecked[i].price,
                quantity: stageChecked[i].quantity,
              },
            ],
          });
          await newCart.save();
        }
      }
      if (vehicleChecked.length > 0) {
        for (let i = 0; i < vehicleChecked.length; i++) {
          items[z] = vehicleChecked[i];
          z++;
          const ifUserCart = await cartModel.findOne({
            user_id: new Objectid(userId),
          });
          if (ifUserCart) {
            console.log("y");

            await cartModel.findOneAndUpdate(
              { user_id: new Objectid(userId) },
              {
                $push: {
                  categories: [
                    {
                      _id: vehicleChecked[i].id,
                      image: vehicleChecked[i].image,
                      category_name: vehicleChecked[i].category_name,
                      total_price: vehicleChecked[i].price,
                      price: vehicleChecked[i].price,
                      quantity: vehicleChecked[i].quantity,
                    },
                  ],
                },
              }
            );
          } else {
            const newCart = new cartModel({
              user_id: userId,
              categories: [
                {
                  _id: vehicleChecked[i].id,
                  image: vehicleChecked[i].image,
                  category_name: vehicleChecked[i].category_name,
                  total_price: vehicleChecked[i].price,
                  price: vehicleChecked[i].price,
                  quantity: vehicleChecked[i].quantity,
                },
              ],
            });
            await newCart.save();
          }
        }
      }
      if (decorationChecked.length > 0) {
        for (let i = 0; i < decorationChecked.length; i++) {
          items[z] = decorationChecked[i];
          z++;
          const ifUserCart = await cartModel.findOne({
            user_id: new Objectid(userId),
          });
          if (ifUserCart) {
            console.log("y");

            await cartModel.findOneAndUpdate(
              { user_id: new Objectid(userId) },
              {
                $push: {
                  categories: [
                    {
                      _id: decorationChecked[i].id,
                      image: decorationChecked[i].image,
                      category_name: decorationChecked[i].category_name,
                      total_price: decorationChecked[i].price,
                      price: decorationChecked[i].price,
                      quantity: decorationChecked[i].quantity,
                    },
                  ],
                },
              }
            );
          } else {
            const newCart = new cartModel({
              user_id: userId,
              categories: [
                {
                  _id: decorationChecked[i].id,
                  image: decorationChecked[i].image,
                  category_name: decorationChecked[i].category_name,
                  total_price: decorationChecked[i].price,
                  price: decorationChecked[i].price,
                  quantity: decorationChecked[i].quantity,
                },
              ],
            });
            await newCart.save();
          }
        }
      }
    }
    res.json({ success: true, msg: "Added to cart" });
  } catch (error) {
    console.log(error);
  }
};
export const getCartList = async (req, res) => {
  try {
    const { userId } = req.body;
    const cartList = await cartModel.findOne({ user_id: new Objectid(userId) });
    res.json({ cart_list: cartList, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const decrementQuantity = async (req, res) => {
  try {
    const { itemPrice, userId, itemId, itemQuantity } = req.body;

    let quantity = parseInt(itemQuantity - 1);
    let total = quantity * itemPrice;
    await cartModel.updateOne(
      { categories: { $elemMatch: { _id: new Objectid(itemId) } } },
      {
        $set: {
          "categories.$.quantity": quantity,
          "categories.$.total_price": total,
        },
      }
    );
    const cartList = await cartModel.findOne({ user_id: new Objectid(userId) });
    res.json({ update: cartList, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const incrementQuantity = async (req, res) => {
  try {
    const { itemPrice, userId, itemId, itemQuantity } = req.body;
    console.log(itemPrice, userId, itemId, itemQuantity);
    let quantity = parseInt(itemQuantity + 1);
    let total = quantity * itemPrice;
    await cartModel.updateOne(
      { categories: { $elemMatch: { _id: new Objectid(itemId) } } },
      {
        $set: {
          "categories.$.quantity": quantity,
          "categories.$.total_price": total,
        },
      }
    );
    const cartList = await cartModel.findOne({ user_id: new Objectid(userId) });
    res.json({ update: cartList, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const deleteCartItem = async (req, res) => {
  try {
    const { userId } = req.body;
    const itemId = req.params.id;
    await cartModel.updateOne(
      { user_id: new Objectid(userId) },
      {
        $pull: {
          categories: { _id: new Objectid(itemId) },
        },
      }
    );
    const cartList = await cartModel.findOne({ user_id: new Objectid(userId) });
    res.json({
      update: cartList,
      success: true,
      msg: "Item Deleted From Cart",
    });
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
};
export const orders = async (req, res) => {
  try {
    let amount = parseInt(req.body.totalAmount);
    // console.log(amount);
    let instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    let options = {
      amount: amount * 100,
      currency: "INR",
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        return res.send({ code: 500, message: "Server Error" });
      }
      return res.send({
        code: 200,
        message: "order created",
        data: order,
        success: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const addEvent = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.body.userId;
    let {
      startDate,
      time,
      name,
      mobile,
      pincode,
      district,
      email,
      address,
      state,
      place,
      countOfPeople,
      eventType,
      price,
    } = req.body.checkoutDetails;
    console.log(price);
    price = parseInt(price);
    const { manager } = req.query;
    console.log(manager);
    const formDate = new Date(startDate);
    // console.log(name, formDate, userId, orderId);
    const items = await cartModel.findOne({ user_id: userId });
    const formExist = await formModel.findOne({ user_id: userId });
    const bookingExist = await bookingModel.findOne({
      manager_id: new Objectid(manager),
    });
    if (formExist && bookingExist) {
      await formModel.findOneAndUpdate(
        { user_id: userId },
        {
          $push: {
            form: [
              {
                order_id: orderId,
                formName: name,
                formEmail: email,
                formMobile: mobile,
                address: address,
                pin: pincode,
                state: state,
                district: district,
                place: place,
                totalPrice: price,
                event_date: formDate,
                date: new Date(),
                time: time,
                count: countOfPeople,
                type: eventType,
                items: items,
                status: "pending",
              },
            ],
          },
        }
      );
      await bookingModel
        .findOneAndUpdate(
          { manager_id: new Objectid(manager) },
          {
            $push: {
              form: [
                {
                  order_id: orderId,
                  formName: name,
                  formEmail: email,
                  formMobile: mobile,
                  address: address,
                  pin: pincode,
                  state: state,
                  district: district,
                  place: place,
                  totalPrice: price,
                  event_date: formDate,
                  date: new Date(),
                  time: time,
                  count: countOfPeople,
                  type: eventType,
                  items: items,
                  status: "pending",
                },
              ],
            },
          }
        )
        .then(() => {
          res.status(200).send({ success: true, message: "success" });
        });
    } else if (!formExist && bookingExist) {
      const newForm = new formModel({
        user_id: userId,
        form: [
          {
            order_id: orderId,
            formName: name,
            formEmail: email,
            formMobile: mobile,
            address: address,
            pin: pincode,
            state: state,
            district: district,
            place: place,
            totalPrice: price,
            event_date: formDate,
            date: new Date(),
            time: time,
            count: countOfPeople,
            type: eventType,
            items: items,
            status: "pending",
          },
        ],
      });
      newForm.save();
      await bookingModel.findOneAndUpdate(
        { manager_id: new Objectid(manager) },
        {
          $push: {
            form: [
              {
                order_id: orderId,
                formName: name,
                formEmail: email,
                formMobile: mobile,
                address: address,
                pin: pincode,
                state: state,
                district: district,
                place: place,
                totalPrice: price,
                event_date: formDate,
                date: new Date(),
                time: time,
                count: countOfPeople,
                type: eventType,
                items: items,
                status: "pending",
              },
            ],
          },
        }
      );
      res.status(200).send({ success: true, message: "success" });
    } else if (formExist && !bookingExist) {
      await formModel.findOneAndUpdate(
        { user_id: userId },
        {
          $push: {
            form: [
              {
                order_id: orderId,
                formName: name,
                formEmail: email,
                formMobile: mobile,
                address: address,
                pin: pincode,
                state: state,
                district: district,
                place: place,
                totalPrice: price,
                event_date: formDate,
                date: new Date(),
                time: time,
                count: countOfPeople,
                type: eventType,
                items: items,
                status: "pending",
              },
            ],
          },
        }
      );
      const newBooking = new bookingModel({
        manager_id: manager,
        form: [
          {
            order_id: orderId,
            formName: name,
            formEmail: email,
            formMobile: mobile,
            address: address,
            pin: pincode,
            state: state,
            district: district,
            place: place,
            totalPrice: price,
            event_date: formDate,
            date: new Date(),
            time: time,
            count: countOfPeople,
            type: eventType,
            items: items,
            status: "pending",
          },
        ],
      });
      newBooking.save();
      res.status(200).send({ success: true, message: "success" });
    } else {
      const newForm = new formModel({
        user_id: userId,
        form: [
          {
            order_id: orderId,
            formName: name,
            formEmail: email,
            formMobile: mobile,
            address: address,
            pin: pincode,
            state: state,
            district: district,
            place: place,
            totalPrice: price,
            event_date: formDate,
            date: new Date(),
            time: time,
            count: countOfPeople,
            type: eventType,
            items: items,
            status: "pending",
          },
        ],
      });
      const newBooking = new bookingModel({
        manager_id: manager,
        form: [
          {
            order_id: orderId,
            formName: name,
            formEmail: email,
            formMobile: mobile,
            address: address,
            pin: pincode,
            state: state,
            district: district,
            place: place,
            totalPrice: price,
            event_date: formDate,
            date: new Date(),
            time: time,
            count: countOfPeople,
            type: eventType,
            items: items,
            status: "pending",
          },
        ],
      });
      newForm.save();
      newBooking.save();
      res.status(200).send({ success: true, message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const verify = async (req, res) => {
  const userId = req.body.userId;
  const orderId = req.body.response.razorpay_order_id;
  const { manager } = req.query;
  const newStatus = "Success";
  const failedStatus = "Failed";
  const body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;
  // eslint-disable-next-line no-undef
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("ku");
  if (expectedSignature === req.body.response.razorpay_signature) {
    console.log("ju");
    await formModel.updateOne(
      { form: { $elemMatch: { order_id: orderId } } },
      {
        $set: {
          "form.$.status": "Success",
        },
      }
    );
    await bookingModel.updateOne(
      { form: { $elemMatch: { order_id: orderId } } },
      {
        $set: {
          "form.$.status": "Success",
        },
      }
    );
    await cartModel.deleteOne({ user_id: userId });
    res
      .status(200)
      .send({ status: true, message: "Sign Valid", msg: "Order Success" });
  } else {
    await formModel.updateOne(
      { form: { $elemMatch: { order_id: orderId } } },
      {
        $set: {
          "form.$.status": "Failed",
        },
      }
    );
    await bookingModel.updateOne(
      { form: { $elemMatch: { order_id: orderId } } },
      {
        $set: {
          "form.$.status": "Failed",
        },
      }
    );
    res
      .status(200)
      .send({ status: true, message: "Sign inValid", msg: "Payment Failed" });
  }
};
export const getBooking = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const booking = await formModel.findOne({ user_id: new Objectid(userId) });
    // console.log(booking);
    res.json({ success:true, booking });
  } catch (error) {
    console.log(error);
  }
};
export const getBookingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const data = await formModel.findOne(
      {user_id:new Objectid(userId)},
      { form: { $elemMatch: { _id: new Objectid(id) } } }
    );
    res.json({ data, success: true });
  } catch (error) {
    console.log(error);
  }
};
