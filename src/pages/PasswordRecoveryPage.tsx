import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignInPageLeftBody from '../component/molecules/SignInMolecules/SignInPageLeftBody';
import PasswordRecoverRightBody from '../component/molecules/PasswordRecoverMolecules/PasswordRecoverRightBody';

function PasswordRecoveryPage() {
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
        <PasswordRecoverRightBody/>
      </div>
    </div>
  </div>
  )
}

export default PasswordRecoveryPage