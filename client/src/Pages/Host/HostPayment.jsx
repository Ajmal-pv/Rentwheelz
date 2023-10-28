import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Payment from '../../Componenets/Host/Payment/Payment'

function HostPayment() {
  return (
    <div className="flex bg-gray-100 w-[100vw]">
      <div className="w-full flex">
        <div className="w-[15vw] h-[100vh]   ">
          <Sidebar />
        </div>
        <div className="w-[85vw] flex-1  ">
          <Payment />
        </div>
      </div>
    </div>
  )
}

export default HostPayment