import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignInPageLeftBody from '../component/molecules/SignInMolecules/SignInPageLeftBody';
import EmployeeActivationRightBody from '../component/molecules/EmployeeActivation/EmployeeActivationRightBody';

function EmployeeActivationPage() {

     const navigate = useNavigate();

  return (
    <div className="container-fluid sign-up-body">
    <div className="row">
    <button className='btn return-button' onClick={evt => navigate('/')}><i className="fa-solid fa-arrow-left return-icon fa-xl"></i></button>
    </div>
    <div className="row">
      <div className="col-4 input-col">
        <SignInPageLeftBody/>
      </div>
      <div className="col-8 input-col">
        <EmployeeActivationRightBody/>
      </div>
    </div>
  </div>
  )
}

export default EmployeeActivationPage