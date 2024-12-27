import React from 'react'
import './DashboardPageTopBar.css'
import { MyUseSelector } from '../../../store'

function DashboardPageTopBar() {
    const manager = MyUseSelector(state=> state.user.user)
    
  return (
    <>
    <div className="col-6 top-bar-left">
        <div className="col-3">
            <button className='btn topbar-resize-btn'><i className="fa-solid fa-left-right"></i></button>
        </div>
        <div className="col-9">
            <input type="text" className="form-control topbar-search-bar" id="exampleFormControlInput1" placeholder="Search in HRMS"/>
        </div>
    </div>
    <div className="col-6 top-bar-right">
        <div className="row top-row-right">
        <div className="col-4">
            <button className='btn topbar-message-btn'><i className="fa-regular fa-envelope"></i></button>
        </div>
        <div className="col-4">
            <button className='btn topbar-notification-btn'><i className="fa-regular fa-bell"></i></button>
        </div>
        <div className="col-4">
            <button className='btn profile-img-button'><img className="profile-img-topbar"src={manager.pictureUrl} alt="profile-photo" /></button>
        </div>
        </div>
    </div>
    </>
  )
}

export default DashboardPageTopBar