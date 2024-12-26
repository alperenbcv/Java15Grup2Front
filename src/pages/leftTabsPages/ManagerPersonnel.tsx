import React from "react";
import ManagerDashboardSideButtons from "../../component/molecules/LeftTabs/ManagerDashboardSideButtons";
import DashboardPageTopBar from "../../component/molecules/DashboardMolecules/DashboardPageTopBar";
import ManagerCard from "../../component/atoms/ManagerCard";
import EmployeeDetailsChart from "../../component/molecules/ManagerCharts/EmployeeDetailsChart";
import EmployeeByDepartmantChart from "../../component/molecules/ManagerCharts/EmployeeByDepartmantChart";
import EmployeeLeaveChart from "../../component/molecules/EmployeeCharts/EmployeeLeaveChart";
import LeftSideBar from "../../component/organisms/LeftSideBar";
import ProfilePhoto from "../../component/atoms/ProfilePhoto";

function ManagePersonnel() {
  return (
    <div className="container-fluid manager-dashboard-container">
      <div className="row">
        {/* Sol Side Bar */}
        <LeftSideBar/>

        {/* Sağ Top Bar ve İçerik */}
        <div className="col-10 manager-dashboard-content">
          <div className="row">
            <DashboardPageTopBar />
          </div>
          <div className="row">
            <hr className="manager-dash-hr-2" />
          </div>
          <div className="row">
            <h1 className="manager-dashboard-header">Manage Personnel</h1>
          </div>
          <div className="row">
            <div className="col manager-card-col">
              <ManagerCard />
            </div>
            <div className="col manager-card-col">
              <ProfilePhoto/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePersonnel;