import React from 'react'
import './HomePageHeaderButtons.css'
import GetStartedButton from '../../atoms/GetStartedButton'

function HomePageHeaderButtons() {
  const clickToUserIcon = () => {
  }
  return (
    <div className="col-2 d-flex p-1">
        <div className="col-5 align-content-center">
            <button className='btn dropdown-toggle' onClick={clickToUserIcon} data-bs-toggle="dropdown" aria-expanded="false" ><i className="fa-solid fa-user fa-2xl" style={{color:'white'}} ></i></button>
              <ul className="dropdown-menu" >
                <li><a className="dropdown-item header-item" href="/sign-in"><i className="fa-solid fa-user-check" style={{color:'white', padding:'5px'}}></i><span className="sign-in-text"style={{color:'white'}}>Sign In</span></a></li>
                <hr />
                <li><a className="dropdown-item header-item" href="/sign-up"><i className="fa-solid fa-user-plus" style={{color:'white', padding:'5px'}}></i><span className="sign-up-text"style={{color:'white'}}>Sign Up</span></a></li>
              </ul>
        </div>
        <div className="col-6 align-content-center">
            <GetStartedButton name='Get Started'/>
        </div>        
    </div>
  )
}

export default HomePageHeaderButtons