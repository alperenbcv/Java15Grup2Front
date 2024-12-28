import React, { useEffect, useState } from 'react'
import './ManagerDashboardSideButton.css'
import { MyUseSelector } from '../../store';

interface SideButton {
    buttonName:string,
    buttonIcon:string,
    buttonLink?: string,
    role?: string
}
function ManagerDashboardSideButton(props:SideButton) {
    const {buttonName, buttonIcon, buttonLink, role} = props;
    const user = MyUseSelector(state=> state.user);
    const [buton,setButon] = useState(<></>);
    useEffect(()=>{
      setButon((!role || role === user.user.role)?<a href={buttonLink?buttonLink:undefined}>
      <button className='btn side-btn-manager'><i className={buttonIcon} style={{color:'white'}}></i><span className='manager-btn-text'>{buttonName}</span></button>
      </a>:<></>
    )}, [user.user, user.isProfileLoading])
  
    return(buton)

  
}

export default ManagerDashboardSideButton