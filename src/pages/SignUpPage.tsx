import React from 'react'
import SignInPageLeftBody from '../component/molecules/SignInMolecules/SignInPageLeftBody'
import { useNavigate } from 'react-router-dom'
import './SignUpPage.css'
import SignUpPageRightBody from '../component/molecules/SignUpMolecules/SignUpPageRightBody';

function SignUpPage() {

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
        <SignUpPageRightBody/>
      </div>
    </div>
  </div>
  )
}

export default SignUpPage