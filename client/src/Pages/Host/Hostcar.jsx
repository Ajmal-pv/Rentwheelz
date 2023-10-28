import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Car from '../../Componenets/Host/Car/Car'

function Hostcar() {
    
  return (
    <div className="flex bg-gray-100 w-[100vw]">
      <div className="w-full flex">
        <div className="w-[15vw] h-[100vh]   ">
          <Sidebar />
        </div>
        <div className="w-[85vw] flex-1  ">
          <Car />
        </div>
      </div>
    </div>
  )
}

export default Hostcar
