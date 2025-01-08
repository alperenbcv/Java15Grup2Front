import React from 'react'
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar'
import EmployeeDashboardLeftBar from '../component/organisms/LeftSideBar'
import EmployeeShiftList from '../component/molecules/EmployeeShiftMolecules/EmployeeShiftList'

function EmployeeShifts() {
  return (
    <div className="container-fluid manager-dashboard-container">
    <div className="row">
      {/* Sol Side Bar */}
      <div className="col-2 manager-side-bar">
        <EmployeeDashboardLeftBar/>
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
          <h1 className='manager-dashboard-header'>Shifts</h1>
        </div>
        <div className="row">
          <EmployeeShiftList/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmployeeShifts