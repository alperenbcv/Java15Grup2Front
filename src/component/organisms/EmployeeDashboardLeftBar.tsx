import React from 'react'
import ManagerDashboardSideButtons from '../atoms/ManagerDashboardSideButtons'
import DashboardHeaderLogo from '../molecules/DashboardMolecules/DashboardHeaderLogo'

function EmployeeDashboardLeftBar() {
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
               buttonName="Employee Dashboard"
               buttonIcon="fa-solid fa-user"
               navigation='/employee-dashboard'
            />
            <ManagerDashboardSideButtons buttonName="Shifts"
          buttonIcon="fa-solid fa-wrench"
          navigation='/emp-shifts'/>
          </div>
    </>
  )
}

export default EmployeeDashboardLeftBar