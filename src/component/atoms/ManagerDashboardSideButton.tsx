import React from 'react'
import './ManagerDashboardSideButton.css'

interface SideButton {
    buttonName:string,
    buttonIcon:string
}
function ManagerDashboardSideButton(props:SideButton) {
    const {buttonName, buttonIcon} = props;
  return (
    <>
    <button className='btn side-btn-manager'><i className={buttonIcon} style={{color:'white'}}></i><span className='manager-btn-text'>{buttonName}</span></button>
    </>
  )
}

export default ManagerDashboardSideButton