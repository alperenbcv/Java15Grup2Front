import React from 'react'
import './DashboardPageTopBar.css'
import { MyUseSelector } from '../../../store'
import { userLogout } from '../../../store/feature/userSlice'
import { useNavigate } from 'react-router-dom'

function DashboardPageTopBar() {
    const manager = MyUseSelector(state=> state.user.user)
    const navigate = useNavigate();
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
        <button className='btn dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" style={{paddingTop: "0px", paddingLeft: "0px"}}>
          <img className="profile-img-topbar"src={manager.pictureUrl?manager.pictureUrl:'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'} alt="profile-photo" style={{width: "40px", height: "40px", paddingTop: "0px", paddingLeft: "0px"}}/>
            </button>
              <ul className="dropdown-menu" >
                <li><a  onClick={(evt)=>{localStorage.removeItem("token");userLogout();navigate("/")}} className="dropdown-item header-item hover-item"><i className="fa-solid fa-user-check" style={{color:'white', padding:'5px'}}></i><span className="sign-in-text"style={{color:'white'}}>Log Out</span></a></li>
              </ul>
            <button className='btn profile-img-button'></button>
        </div>
        </div>
    </div>
    </>
  )
}

export default DashboardPageTopBar