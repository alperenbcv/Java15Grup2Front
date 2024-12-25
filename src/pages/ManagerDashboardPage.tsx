import React from 'react';

import './ManagerDashboardPage.css';
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar';
import EmployeeDetailsChart from '../component/molecules/ManagerCharts/EmployeeDetailsChart';
import EmployeeLeaveChart from '../component/molecules/EmployeeCharts/EmployeeLeaveChart';
import EmployeeByDepartmantChart from '../component/molecules/ManagerCharts/EmployeeByDepartmantChart';
import ManagerCard from '../component/atoms/ManagerCard';
import ManagerDashboardLeftBar from '../component/organisms/ManagerDashboardLeftBar';

function ManagerDashboardPage() {
  return (
    <div className="container-fluid manager-dashboard-container">
      <div className="row">
        {/* Sol Side Bar */}
        <div className="col-2 manager-side-bar">
          <ManagerDashboardLeftBar/>
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
