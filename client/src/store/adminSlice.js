import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    authorized: false,
    
  },
  reducers: {
    adminLogin(state, actions) {
      state.authorized = true;
      
      
    },
    adminLogout(state) {
      
      state.authorized = false;
      
    },
  },
});
export const { adminLogin, adminLogout } = AdminSlice.actions;
export default AdminSlice;
