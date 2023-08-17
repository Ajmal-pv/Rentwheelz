import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userSlice'
import HostSlice from './hostSlice'
import AdminSlice from './adminSlice'




const store = configureStore({
   reducer:{ user:UserSlice.reducer,
             host:HostSlice.reducer,
             admin:AdminSlice.reducer
                }
})
export default store