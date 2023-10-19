import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Payment from '../../Componenets/Host/Payment/Payment'

function HostPayment() {
  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar/> 
    <Payment/>
     
   </div>
  )
}

export default HostPayment