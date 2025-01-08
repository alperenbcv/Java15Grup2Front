import React from 'react'
import './ManagerDashboardSideButtons.css'
import { useNavigate } from 'react-router-dom';

interface SideButton {
    buttonName:string,
    buttonIcon:string,
    navigation:string
}
function ManagerDashboardSideButtons(props:SideButton) {
    const {buttonName, buttonIcon, navigation} = props;
    const navigate = useNavigate();
  return (
    <>
    <button className='btn side-btn-manager' onClick={()=>navigate(navigation)}><i className={buttonIcon} style={{color:'white'}} ></i><span className='manager-btn-text'>{buttonName}</span></button>
    </>
  )
}

export default ManagerDashboardSideButtons