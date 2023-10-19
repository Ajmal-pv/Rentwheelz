import React from 'react'
import Sidebar from '../../Componenets/Admin/Home/Sidebar'
import Payments from '../../Componenets/Admin/Payments/Payments'

function AdminPayment() {
  return (
    <div>
    <div className="flex h-screen bg-gray-100">
   <Sidebar/>
   <Payments/>
  
  </div>
</div>
  )
}

export default AdminPayment