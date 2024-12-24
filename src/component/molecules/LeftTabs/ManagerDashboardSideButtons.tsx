import React from 'react'
import ManagerDashboardSideButton from '../../atoms/ManagerDashboardSideButton'

function ManagerDashboardSideButtons() {
  return (
    <div>
      <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Zimmet (perso only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="İzinler (perso only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Vardiyas (manager only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Manage Personnel (manager only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Tanımlamalar (admin only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Companies (admin only)"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Member Settings"
              buttonIcon="fa-solid fa-chalkboard-user"
              buttonLink='member-settings'
            />
          </div>
          <div className="row">
            <ManagerDashboardSideButton
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
            />
          </div>
    </div>
  )
}

export default ManagerDashboardSideButtons