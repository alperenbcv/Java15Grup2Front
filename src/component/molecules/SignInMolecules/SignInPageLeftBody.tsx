import React from 'react'
import logo from '../../../icons/hrlogotransparent.png';
import './SignInPageLeftBody.css'

function SignInPageLeftBody() {
  return (
   <div className="col col-left">
        <div className="row left-row">
            <img className="site-logo" src={logo} alt="logo" />
        </div>
        <div className="row left-row">
            <span className='site-name'>CoreHR.</span>
        </div>
        <div className="row left-row">
            <hr className='hr'/>
        </div>
      </div>
  )
}

export default SignInPageLeftBody