import React from 'react'
import './AdminTotalSub.css'

function AdminTotalSub() {
  return (
    <>
    <div className="row">
    <i className="fa-solid fa-star fa-2xl total-sub-icon"></i>
    </div>
    <div className="row">
      <h1 className='total-subs'>3456</h1>
    </div>
    <div className="row"> 
      <span className='total-subs-title'>Total Active Subs</span>    
    </div>
    </>
  )
}

export default AdminTotalSub