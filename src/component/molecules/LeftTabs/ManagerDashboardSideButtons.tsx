import React from 'react'
import ManagerDashboardSideButton from '../../atoms/ManagerDashboardSideButton'

function ManagerDashboardSideButtons() {
  return (
    <div>
      <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Zimmet"
              buttonIcon="fa-solid fa-list-check"
              role='EMPLOYEE'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="İzin Oluştur"
              buttonIcon="fa-regular fa-file-lines"
              buttonLink='leave'
              role='EMPLOYEE'
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
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink="manager-dashboard"
            />
          </div>
    </div>
  )
}

export default ManagerDashboardSideButtons