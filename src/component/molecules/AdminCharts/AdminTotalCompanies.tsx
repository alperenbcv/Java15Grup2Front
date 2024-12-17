import React from 'react'
import './AdminTotalCompanies.css'

function AdminTotalCompanies() {
  return (
    <>
    <div className="row">
    <i className="fa-solid fa-building company-icon fa-2xl"></i>
    </div>
    <div className="row">
      <h1 className='total-company-count'>9999</h1>
    </div>
    <div className="row"> 
      <span className='total-company-title'>Total Companies</span>    
    </div>
    </>
  )
}

export default AdminTotalCompanies