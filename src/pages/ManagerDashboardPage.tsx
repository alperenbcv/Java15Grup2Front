import React from 'react';
import ManagerDashboardHeaderLogo from '../component/molecules/DashboardMolecules/DashboardHeaderLogo';
import './ManagerDashboardPage.css';
import ManagerDashboardSideButtons from '../component/atoms/ManagerDashboardSideButtons';
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar';
import EmployeeDetailsChart from '../component/molecules/ManagerCharts/EmployeeDetailsChart';
import EmployeeLeaveChart from '../component/molecules/EmployeeCharts/EmployeeLeaveChart';
import EmployeeByDepartmantChart from '../component/molecules/ManagerCharts/EmployeeByDepartmantChart';
import ManagerCard from '../component/atoms/ManagerCard';

function ManagerDashboardPage() {
  return (
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
              buttonName="Dashboard"
              buttonIcon="fa-solid fa-chalkboard-user"
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
            <h1 className='manager-dashboard-header'>Manager Dashboard</h1>
          </div>
          <div className="row">
            <div className="col manager-card-col">
                <ManagerCard />
            </div>
            <div className="col employee-details-chart">
            <EmployeeDetailsChart/>
            </div>  
            
          </div>
          <div className="row">
          <div className="col departmant-chart">
            <EmployeeByDepartmantChart/>
            </div>  
            <div className="col employee-leave-chart">
            <EmployeeLeaveChart/>
            </div>                
            </div>          
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboardPage;
