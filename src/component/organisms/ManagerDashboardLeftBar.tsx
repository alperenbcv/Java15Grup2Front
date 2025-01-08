import React from 'react'
import DashboardHeaderLogo from '../molecules/DashboardMolecules/DashboardHeaderLogo';
import ManagerDashboardSideButtons from '../atoms/ManagerDashboardSideButtons';

function ManagerDashboardLeftBar() {
  return (
    <>
    <div className="row">
            <DashboardHeaderLogo />
          </div>
          <div className="row">
            <span className="manager-menu-text">Main Menu</span>
            <hr className="manager-dash-hr-1" />
          </div>
          <div className="row">
            <ManagerDashboardSideButtons
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
              navigation='/manager-dashboard'
            />
            <ManagerDashboardSideButtons buttonName='Employee Operations'
            buttonIcon='fa-solid fa-address-book' 
            navigation='/employee-ops'/>
            <ManagerDashboardSideButtons buttonName='Shift Operations'
            buttonIcon='fa-solid fa-wrench' 
            navigation='/shift-ops'/>
          </div>
    </>
  )
}

export default ManagerDashboardLeftBar