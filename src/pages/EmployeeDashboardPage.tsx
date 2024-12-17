import React from 'react'
import ManagerDashboardSideButtons from '../component/atoms/ManagerDashboardSideButtons'
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar'
import ManagerDashboardHeaderLogo from '../component/molecules/DashboardMolecules/DashboardHeaderLogo'
import EmployeeCard from '../component/atoms/EmployeeCard'
import EmployeeLeaveCountChart from '../component/molecules/ManagerCharts/EmployeeLeaveCountChart'
import TeamMembersCard from '../component/molecules/EmployeeDashboard/TeamMembersCard'
import './EmployeeDashboardPage.css'
import EmployeeNotificationCard from '../component/molecules/EmployeeDashboard/EmployeeNotificationCard'

function EmployeeDashboardPage() {
  return(
  <div className="container-fluid manager-dashboard-container">
  <div className="row">
    {/* Sol Side Bar */}
    <div className="col-2 manager-side-bar">
      <div className="row">
        <ManagerDashboardHeaderLogo />
      </div>
      <div className="row">
        <span className="manager-menu-text">Main Menu</span>
        <hr className="manager-dash-hr-1" />
      </div>
      <div className="row">
        <ManagerDashboardSideButtons
          buttonName="Employee Dashboard"
          buttonIcon="fa-solid fa-user"
        />
      </div>
    </div>

    {/* Sağ Top Bar ve İçerik */}
    <div className="col-10 manager-dashboard-content">
      <div className="row">
        <DashboardPageTopBar />
      </div>
      <div className="row">
        <hr className='manager-dash-hr-2'/>
      </div>
      <div className="row">
        <h1 className='manager-dashboard-header'>Employee Dashboard</h1>
      </div>
      <div className="row">
        <div className="col manager-card-col">
            <EmployeeCard />
        </div>
        <div className="col employee-details-chart">
        <EmployeeLeaveCountChart/>
        </div>  
        
      </div>
      <div className="row">
      <div className="col team-members-col">
        <TeamMembersCard/>
        </div>  
        <div className="col employee-not-card">
        <EmployeeNotificationCard/>
        </div>                
        </div>          
    </div>
  </div>
</div>
);
}

export default EmployeeDashboardPage