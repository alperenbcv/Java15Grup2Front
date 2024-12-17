import React from 'react'
import SignInPageLeftBody from '../component/molecules/SignInMolecules/SignInPageLeftBody'
import SignInPageRightBody from '../component/molecules/SignInMolecules/SignInPageRightBody'
import './SignInPage.css'
import { Navigate, useNavigate } from 'react-router-dom'

function SignInPage() {
  
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
          <SignInPageRightBody/>
        </div>
      </div>
    </div>
  )
}

export default SignInPage