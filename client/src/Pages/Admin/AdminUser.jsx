import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import User from '../../Componenets/Admin/user/User'

function AdminUser() {
  return (
    <div>
    <div className="flex h-screen bg-gray-100">
   <Sidebar/>
   <User/>
  
  </div>
</div>
  )
}

export default AdminUser
