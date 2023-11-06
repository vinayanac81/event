import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./UserDataSlice";
import adminStatusSlice  from "./AdminStatus";
import  managerDataSlice  from "./ManagerInfo";
export const store = configureStore({
  reducer: {
   user:userSlice,
   status:adminStatusSlice,
   manager:managerDataSlice
  },
});