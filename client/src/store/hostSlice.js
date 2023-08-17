import { createSlice } from "@reduxjs/toolkit";

const HostSlice = createSlice({
  name: "host",
  initialState: {
    authorized: false,
    
  },
  reducers: {
    hostLogin(state, actions) {
      state.authorized = true;
      
      
    },
    hostLogout(state) {
      
      state.authorized = false;
      
    },
  },
});
export const { hostLogin, hostLogout } = HostSlice.actions;
export default HostSlice;
