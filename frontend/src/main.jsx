import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Book from "./pages/Manager/BookingDetails.jsx";
import UserHome from "./pages/user/UserHome.jsx";
import UserSignup from "./pages/user/UserSignup.jsx";
import UserOtp from "./pages/user/UserOtp.jsx";
import UserLogin from "./pages/user/UserLogin.jsx";
import UserProtectedRoute from "./components/user/UserProtectedRoute.jsx";
import CompanyList from "./pages/user/CompanyList.jsx";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import AdminApp from "./pages/admin/AdminApp.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import PublicProtectedRoute from "./components/user/PublicProtectedRoute.jsx";
import PublicManagerProtectedRoute from "./components/manager/PublicProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminManagers from "./pages/admin/AdminManagers.jsx";
import AdminApprovel from "./pages/admin/AdminApprovel.jsx";
import AdminSales from "./pages/admin/AdminSales.jsx";
import ManagerApp from "./pages/Manager/ManagerApp.jsx";
import ManagerLogin from "./pages/Manager/ManagerLogin.jsx";
import ManagerSignup from "./pages/Manager/ManagerSignup.jsx";
import ManagerOtp from "./pages/Manager/ManagerOtp.jsx";
import ViewManager from "./pages/admin/ViewManager.jsx";
import Dashboard from "./pages/Manager/Dashboard.jsx";
import Bookings from "./pages/Manager/Bookings.jsx";
import MenuList from "./pages/Manager/MenuList.jsx";
import Services from "./pages/Manager/Services.jsx";
import SalesReport from "./pages/Manager/SalesReport.jsx";
import AddedServices from "./pages/Manager/AddedServices.jsx";
import CompanyDetail from "./pages/user/CompanyDetail.jsx";
import SelectService from "./pages/user/SelectService.jsx";
import SelectedService from "./pages/user/SelectedService.jsx";
import CartLIst from "./pages/user/CartLIst.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import Booking from "./pages/user/Booking.jsx";
import BookingDetails from "./pages/user/BookingDetails.jsx";
import UserNav from "./components/user/UserNav.jsx";
import UserSelectedService from "./components/user/UserSelectedService.jsx";
import ManagerNav from "./components/manager/ManagerNav.jsx";
import ManagerProtectedRoute from "./components/manager/ManagerProtectedRoute.jsx";
import Profile from "./pages/Manager/Profile.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<UserHome />} />
        <Route
          path="signup"
          element={
            <PublicProtectedRoute>
              <UserSignup />
            </PublicProtectedRoute>
          }
        />
        <Route path="otp" element={<UserOtp />} />
        <Route
          path="login"
          element={
            <PublicProtectedRoute>
              <UserLogin />
            </PublicProtectedRoute>
          }
        />
        <Route
          path="company-list"
          element={
            <UserProtectedRoute>
              <CompanyList />
            </UserProtectedRoute>
          }
        />
        <Route
          path="company-detail/:id"
          element={
            <UserProtectedRoute>
              <CompanyDetail />
            </UserProtectedRoute>
          }
        />
        <Route
          path="select-service/:id"
          element={
            <UserProtectedRoute>
              <SelectService />
            </UserProtectedRoute>
          }
        />
        <Route
          path="selected-service/:id"
          element={
            <UserProtectedRoute>
              <SelectedService />
            </UserProtectedRoute>
          }
        />
        <Route
          path="cart-list/:id"
          element={
            <UserProtectedRoute>
              <CartLIst />
            </UserProtectedRoute>
          }
        />
        <Route
          path="checkout/:id"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />
        <Route
          path="booking"
          element={
            <UserProtectedRoute>
              <Booking />
            </UserProtectedRoute>
          }
        />
        <Route
          path="booking-details/:id"
          element={
            <UserProtectedRoute>
              <BookingDetails />
            </UserProtectedRoute>
          }
        />
      </Route>
      <Route path="/admin" element={<AdminApp />}>
        <Route index element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="managers" element={<AdminManagers />} />
        <Route path="managers/:id" element={<ViewManager />} />
        <Route path="approvel" element={<AdminApprovel />} />
        <Route path="sales" element={<AdminSales />} />
      </Route>
      <Route path="/manager" element={<ManagerApp />}>
        <Route
          index
          element={
            <PublicManagerProtectedRoute>
              <ManagerLogin />
            </PublicManagerProtectedRoute>
          }
        />
        <Route path="booking-detail/:id" element={<Book />} />
        <Route path="signup" element={<ManagerSignup />} />
        <Route path="otp" element={<ManagerOtp />} />
        <Route
          path="dashboard"
          element={
            <ManagerProtectedRoute>
              <Dashboard />
            </ManagerProtectedRoute>
          }
        />
        <Route path="bookings" element={<Bookings />} />
        <Route
          path="profile"
          element={
            <ManagerProtectedRoute>
              <Profile />
            </ManagerProtectedRoute>
          }
        />
        <Route path="menu-list" element={<MenuList />} />
        <Route path="services" element={<Services />} />
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="added-services" element={<AddedServices />} />
      </Route>
    </>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
