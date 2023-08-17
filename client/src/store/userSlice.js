import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    userId: null,
    
  },
  reducers: {
    userLogin(state, action) {
      state.authorized = true;
      state.userId = action.payload.userId;
      
      
    },
    userLogout(state) {
      
      state.authorized = false;
      state.userId = null;
      
    },
  },
});
export const { userLogin, userLogout } = UserSlice.actions;
export default UserSlice;
