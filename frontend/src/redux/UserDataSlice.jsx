import { createSlice } from "@reduxjs/toolkit";

const initialState = {
user:{}
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData:(state,action)=>{
console.log(action.payload);
state.user=action.payload
console.log(state.user);
    },
    logOutRedux:(state,action)=>{
      state.user=""
      console.log(state.user);
    }
  },
});

export const { getUserData,logOutRedux} = userDataSlice.actions;

export default userDataSlice.reducer;