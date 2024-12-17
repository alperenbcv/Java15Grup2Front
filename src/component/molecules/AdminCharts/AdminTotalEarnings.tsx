import React from 'react'
import './AdminTotalEarnings.css'

function AdminTotalEarnings() {
  return (
    <>
    <div className="row">
    <i className="fa-solid fa-dollar-sign fa-2xl total-dollar-sign"></i>
    </div>
    <div className="row">
      <h1 className='total-earnings'>$99,546.44</h1>
    </div>
    <div className="row"> 
      <span className='total-earnings-title'>Total Earnings</span>    
    </div>
    </>
  )
}

export default AdminTotalEarnings