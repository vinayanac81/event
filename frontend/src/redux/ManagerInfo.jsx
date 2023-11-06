import { createSlice } from "@reduxjs/toolkit";

const initialState = {
manager:{}
};

export const managerDataSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    getManagerData:(state,action)=>{
// console.log(action.payload);
state.manager=action.payload
// console.log(state.manager);
    },
    logOutRedux:(state,action)=>{
      state.manager=""
      console.log(state.manager);
    }
  },
});

export const { getManagerData,logOutRedux} = managerDataSlice.actions;

export default managerDataSlice.reducer;