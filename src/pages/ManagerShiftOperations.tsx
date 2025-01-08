import React from 'react';
import './ManagerShiftOps.css'; // CSS düzenlemeleri
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar';
import ManagerDashboardLeftBar from '../component/organisms/ManagerDashboardLeftBar';
import ManagerShiftOps from '../component/molecules/ShiftOpsMolecules/ManagerShiftOps';

function ManagerShiftOperations() {

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
          <h1 className='manager-dashboard-header'>Shift Operations</h1>
        </div>
        <div className="row">
          <ManagerShiftOps/>
        </div>
  </div>

</div>
</div>
  );
}

export default ManagerShiftOperations;
