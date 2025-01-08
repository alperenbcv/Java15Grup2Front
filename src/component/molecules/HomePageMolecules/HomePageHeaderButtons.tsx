import React from 'react'
import './HomePageHeaderButtons.css'
import GetStartedButton from '../../atoms/GetStartedButton'





function HomePageHeaderButtons() {
  
  return (
    <div className="col-2 d-flex p-1">
  <div className="col-5 align-content-center">
    {/* Dropdown Tetikleyici */}
    <button
      className="btn dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fa-solid fa-user fa-2xl" style={{ color: 'white' }}></i>
    </button>

    {/* Dropdown Menüsü */}
    <ul className="dropdown-menu drop-sign">
      <li>
        <a className="dropdown-item header-item" href="/sign-in">
          <i className="fa-solid fa-user-check" style={{ color: 'white', padding: '5px' }}></i>
          <span className="sign-in-text" style={{ color: 'white' }}>Sign In</span>
        </a>
      </li>
      <hr />
      <li>
        <a className="dropdown-item header-item" href="/sign-up">
          <i className="fa-solid fa-user-plus" style={{ color: 'white', padding: '5px' }}></i>
          <span className="sign-up-text" style={{ color: 'white' }}>Sign Up</span>
        </a>
      </li>
    </ul>
  </div>
  <div className="col-6 align-content-center">
    <GetStartedButton name="Get Started" />
  </div>
</div>
  )
}

export default HomePageHeaderButtons