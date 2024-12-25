import React from 'react'
import ManagerCard from '../component/atoms/ManagerCard';
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar';
import EmployeeLeaveChart from '../component/molecules/EmployeeCharts/EmployeeLeaveChart';
import EmployeeByDepartmantChart from '../component/molecules/ManagerCharts/EmployeeByDepartmantChart';
import EmployeeDetailsChart from '../component/molecules/ManagerCharts/EmployeeDetailsChart';
import ManagerDashboardLeftBar from '../component/organisms/ManagerDashboardLeftBar';
import EmployeeOpsList from '../component/molecules/EmpOpsMolecules/EmployeeOpsList';

function ManagerEmployeeOpsPage() {
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
                <h1 className='manager-dashboard-header'>Employee Operations</h1>
              </div>
              <div className="row">
                <EmployeeOpsList/>
              </div>
        </div>

    </div>
</div>
      );
}

export default ManagerEmployeeOpsPage