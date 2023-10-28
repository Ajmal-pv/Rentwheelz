import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Chatcomponent from '../../Componenets/Host/chat/Chatcomponent'

function HostChat() {
  return (
    
    <div className="flex bg-gray-100 w-[100vw]">
      <div className="w-full flex">
        <div className="w-[15vw] h-[100vh]   ">
          <Sidebar />
        </div>
        <div className="w-[85vw] flex-1  ">
          <Chatcomponent />
        </div>
      </div>
    </div>
  )
}

export default HostChat