import { createSlice } from "@reduxjs/toolkit";

const initialState = {
status:false
};

export const adminStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    getAdminStatus:(state,action)=>{
console.log(action.payload);
state.status=action.payload
    },
}
});

export const {getAdminStatus } = adminStatusSlice.actions;

export default adminStatusSlice.reducer;