import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Chatcomponent from '../../Componenets/Host/chat/Chatcomponent'

function HostChat() {
  return (
    
    <div className="flex h-screen bg-gray-100">
     <Sidebar/> 
     <Chatcomponent/>
         </div>
  )
}

export default HostChat