import express from "express";
import passport from "passport";
import {
  resendOtp,
  verifyOtp,
  userSignup,
  userLogin,
  userData,
  getAllCompanies,
  getCompanyDetail,
  selectedServices,
  selectedService,
  addToCart,
  getCartList,
  decrementQuantity,
  deleteCartItem,
  incrementQuantity,
  orders,
  addEvent,
  verify,
  getBooking,
  getBookingDetails,
  filterByService,
  googleLogin,
} from "../controllers/userController.js";
import cookieSession from "cookie-session";
const app = express();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());
import userAuth from "../middleware/userAuth.js";
const router = express.Router();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel.js";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
let gId;
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "http://localhost:4000/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      gId = profile.id;
      const user = await userModel.findOne({ google_id: profile.id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          google_id: profile.id,
        });
        return done(null, newUser);
      }
    }
  )
);
router.post("/signup", userSignup);
router.post("/resend-otp", resendOtp);
router.post("/otp", verifyOtp);
router.post("/login", userLogin);
router.post("/googlelogin",googleLogin)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//   }),
//   function (req, res) {
//     res.redirect("/google-login");
//   }
// );
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:5173/login");
  }
);
router.get("/failed", (req, res) => {
  res.send("Failed");
});
// router.get("/success", async(req, res) => {
//  const userData=await userModel.findOne({google_id:gId})
//  console.log(userData.email);
//  res.json({userData})
// });
router.get("/google-login", async (req, res) => {
  const userData = await userModel.findOne({ google_id: gId });
  console.log(userData.email);
  res.json({ userData });
});
router.post("/userData", userAuth, userData);
router.post("/company-list", userAuth);
router.get("/get-all-companies", userAuth, getAllCompanies);
router.get("/filter-by-services", userAuth, filterByService);
router.get("/get-company-detail/:id", userAuth, getCompanyDetail);
router.post("/selected-services", userAuth, selectedServices);
router.get("/selected-service", userAuth, selectedService);
router.post("/add-to-cart", userAuth, addToCart);
router.get("/get-cart-list", userAuth, getCartList);
router.put("/decrement-quantity", userAuth, decrementQuantity);
router.put("/increment-quantity", userAuth, incrementQuantity);
router.delete("/delete-from-cart/:id", userAuth, deleteCartItem);
router.post("/orders", userAuth, orders);
router.post("/add-event/:id", userAuth, addEvent);
router.post("/verify", userAuth, verify);
router.get("/booking", userAuth, getBooking);
router.get("/booking-details/:id", userAuth, getBookingDetails);
export default router;

// loading ? (
//   <>
//     <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-20 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
//       <div className="flex px-4 flex-col bg-opacity-90 items-center   py-5 rounded-lg  w-[65%]">
//         {" "}
//         <BounceLoader
//           color={color}
//           loading={loading}
//           cssOverride={{
//             borderColor: "blue",
//           }}
//           size={300}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         />
//       </div>
//     </div>
//   </>
// )
