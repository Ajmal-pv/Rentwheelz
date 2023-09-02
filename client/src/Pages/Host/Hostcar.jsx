import React from 'react'
import Sidebar from '../../Componenets/Host/Home/Sidebar'
import Car from '../../Componenets/Host/Car/Car'

function Hostcar() {
    
  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar/> 
    <Car/>
  
   </div>
  )
}

export default Hostcar
