import React from 'react'
import './ManagerDashboardSideButton.css'

interface SideButton {
    buttonName:string,
    buttonIcon:string,
    buttonLink?: string
}
function ManagerDashboardSideButton(props:SideButton) {
    const {buttonName, buttonIcon, buttonLink} = props;
  return (
    <a href={buttonLink?buttonLink:undefined}>
    <button className='btn side-btn-manager'><i className={buttonIcon} style={{color:'white'}}></i><span className='manager-btn-text'>{buttonName}</span></button>
    </a>
  )
}

export default ManagerDashboardSideButton