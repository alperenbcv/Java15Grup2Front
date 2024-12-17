import React from 'react';
import logo from '../../../icons/logo-white.png';
import './HomePageHeaderLogo.css'
import { useNavigate } from 'react-router-dom';

function HomePageHeaderLogo() {
  const navigate = useNavigate();
  return (
    <div className='col-2 logo-col' >
      <img className='logo-image' onClick={evt => navigate('/')} src={logo} alt="Logo" />
      <h1 className='logo-text' onClick={evt => navigate('/')}>CoreHR.</h1>
    </div>
  );
}

export default HomePageHeaderLogo;
