import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Banner from '../../Componenets/Admin/Banner/Banner'

function AdminBanner() {
  return (
    <div>
       <div className="flex h-screen bg-gray-100">
       <Sidebar/>
       <Banner/>
       
      
      </div>
    </div>
  )
}

export default AdminBanner
