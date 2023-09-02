import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hostLogout } from '../../../store/hostSlice';


function Home() {

  return (
    
      



    
    
     
      <div className="flex-1 p-6">
        {/* Content for each section goes here */}
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="bg-white p-4 shadow rounded">
          {/* Dashboard content goes here */}
        </div>
      </div>
    


    
  )
}

export default Home
