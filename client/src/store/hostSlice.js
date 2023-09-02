import { createSlice } from "@reduxjs/toolkit";

const HostSlice = createSlice({
  name: "host",
  initialState: {
    authorized: false,
    hostId:null
  },
  reducers: {
    hostLogin(state, actions) {
      state.authorized = true;
      state.hostId = actions.payload.hostId;
      
    },
    hostLogout(state) {
      
      state.authorized = false;
      state.hostId=null
    },
  },
});
export const { hostLogin, hostLogout } = HostSlice.actions;
export default HostSlice;
