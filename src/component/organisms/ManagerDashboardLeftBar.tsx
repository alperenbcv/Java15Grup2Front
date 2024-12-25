import React from 'react'
import ManagerDashboardHeaderLogo from '../molecules/DashboardMolecules/DashboardHeaderLogo';
import ManagerDashboardSideButtons from '../atoms/ManagerDashboardSideButtons';

function ManagerDashboardLeftBar() {
  return (
    <>
    <div className="row">
            <ManagerDashboardHeaderLogo />
          </div>
          <div className="row">
            <span className="manager-menu-text">Main Menu</span>
            <hr className="manager-dash-hr-1" />
          </div>
          <div className="row">
            <ManagerDashboardSideButtons
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
            <ManagerDashboardSideButtons buttonName='Employee Operations'
            buttonIcon='fa-solid fa-address-book' />
          </div>
    </>
  )
}

export default ManagerDashboardLeftBar