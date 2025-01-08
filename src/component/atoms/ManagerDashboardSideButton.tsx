import React, { useEffect, useState } from 'react'
import './ManagerDashboardSideButton.css'
import { MyUseSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

interface SideButton {
    buttonName:string,
    buttonIcon:string,
    buttonLink?: string,
    role?: string,
    excludeRole?: string
}
function ManagerDashboardSideButton(props:SideButton) {
    const {buttonName, buttonIcon, buttonLink, role, excludeRole} = props;
    const user = MyUseSelector(state=> state.user);
    const [buton,setButon] = useState(<></>);
    const navigate = useNavigate();
    useEffect(()=>{
      setButon(((!role && !excludeRole) || (role && role === user.user.role) || (excludeRole && excludeRole !== user.user.role))?<a onClick={evt=>navigate("/"+buttonLink)}>
      <button className='btn side-btn-manager w-100'><i className={buttonIcon} style={{color:'white'}}></i><span className='manager-btn-text'>{buttonName}</span></button>
      </a>:<></>
    )}, [user.user, user.isProfileLoading])
  
    return(buton)

  
}

export default ManagerDashboardSideButton