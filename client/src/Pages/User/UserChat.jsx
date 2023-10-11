import React from 'react'
import Navbar from '../../Componenets/User/Home/NavBar'
import ChatComponent from '../../Componenets/User/chat/ChatComponent'

function UserChat() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <ChatComponent/>
     
    </div>
  )
}

export default UserChat