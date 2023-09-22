import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userSlice'
import HostSlice from './hostSlice'
import AdminSlice from './adminSlice'
import alertSlice from './alertSlice'




const store = configureStore({
   reducer:{ user:UserSlice.reducer,
             host:HostSlice.reducer,
             admin:AdminSlice.reducer,
             alert:alertSlice.reducer
                }
})
export default store