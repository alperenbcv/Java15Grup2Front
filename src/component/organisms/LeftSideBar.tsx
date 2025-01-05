import React from 'react'
import DashboardHeaderLogo from '../molecules/DashboardMolecules/DashboardHeaderLogo'
import ManagerDashboardSideButtons from '../molecules/LeftTabs/ManagerDashboardSideButtons'

function LeftSideBar() {
  
  return (
    <div className="col-2 manager-side-bar">
      <div className=''>
      <div className="row">
            <DashboardHeaderLogo />
          </div>
          <div className="row">
            <span className="manager-menu-text">Main Menu</span>
            <hr className="manager-dash-hr-1" />
          </div>

          {/**ManagerDashBoardSideButtons */}
          <ManagerDashboardSideButtons/>
      </div>
          
        </div>
  )
}

export default LeftSideBar
