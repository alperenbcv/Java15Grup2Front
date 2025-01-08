import React from 'react'
import SignInPageLeftBody from '../component/molecules/SignInMolecules/SignInPageLeftBody'
import SignInPageRightBody from '../component/molecules/SignInMolecules/SignInPageRightBody'
import { useNavigate } from 'react-router-dom'
import PasswordForgotRightBody from '../component/molecules/PasswordRecoverMolecules/PasswordForgotRightBody';

function ForgotPasswordPage() {
    const navigate = useNavigate();
  return (
    <div className="container-fluid sign-in-body">
    <div className="row">
    <button className='btn return-button' onClick={evt => navigate('/')}><i className="fa-solid fa-arrow-left return-icon fa-xl"></i></button>
    </div>
    <div className="row">
      <div className="col-6 input-col">
        <SignInPageLeftBody/>
      </div>
      <div className="col-6 input-col">
        <PasswordForgotRightBody/>
      </div>
    </div>
  </div>
  )
}

export default ForgotPasswordPage