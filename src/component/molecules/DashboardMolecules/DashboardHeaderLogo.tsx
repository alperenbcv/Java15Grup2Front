import React from 'react';
import logo from '../../../icons/logo-white.png';
import './ManagerDashboardHeaderLogo.css'
import { useNavigate } from 'react-router-dom';

function DashboardHeaderLogo() {
  const navigate = useNavigate();
  return (
    <div className='col-2 logo-col-manager' >
      <img className='logo-image-dashboard-manager' onClick={evt => navigate('/manager-dashboard')} src={logo} alt="Logo" />
      <h1 className='logo-text-dashboard-manager' onClick={evt => navigate('/manager-dashboard')}>CoreHR.</h1>
    </div>
  );
}

export default DashboardHeaderLogo;
