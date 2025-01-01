import React from 'react'
import ManagerDashboardSideButton from '../../atoms/ManagerDashboardSideButton'

function ManagerDashboardSideButtons() {
  return (
    <div>
      <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Possessions"
              buttonIcon="fa-solid fa-list-check"
              buttonLink='possession'
              role='EMPLOYEE'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Add a Leave"
              buttonIcon="fa-regular fa-file-lines"
              buttonLink='leave'
              role='EMPLOYEE'
            />
            <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Expenses"
              buttonIcon="fa-regular fa-file-lines"
              buttonLink='expense'
              excludeRole='ADMIN'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Vardiyas"
              buttonIcon="fa-solid fa-chalkboard-user"
              role='MANAGER'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Personnel (manager only)"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink='manage-personnel'
              role='MANAGER'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Leaves"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink='manage-leaves'
              role='MANAGER'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Tanımlamalar"
              buttonIcon="fa-solid fa-chalkboard-user"
              role='ADMIN'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Companies"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink='companies'
              role='ADMIN'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Member Settings"
              buttonIcon="fa-solid fa-cog"
              buttonLink='member-settings'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Company Comment"
              buttonIcon="fa-solid fa-cog"
              buttonLink='company-comment'
              role='MANAGER'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink="manager-dashboard"
            />
          </div>
    </div>
    </div>
  )
}

export default ManagerDashboardSideButtons