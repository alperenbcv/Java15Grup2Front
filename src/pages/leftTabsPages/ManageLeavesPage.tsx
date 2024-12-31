import React, { useEffect } from "react";
import LeftSideBar from "../../component/organisms/LeftSideBar";
import DashboardPageTopBar from "../../component/molecules/DashboardMolecules/DashboardPageTopBar";
import {
  fetchGetLeavesByManager,
  fetchManageState,
} from "../../store/feature/leaveSlice";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../store";
import { Button, Space, Table, Tag } from "antd";
import { ILeave } from "../../models/ILeave";
import { userInfo } from "os";
import Swal from "sweetalert2";
import state from "sweetalert/typings/modules/state";
import LeaveTable from "../../component/atoms/LeaveTable";

const { Column, ColumnGroup } = Table;

function ManageLeavesPage() {
  const dispatch = useDispatch<MyDispatch>();
  const leave = MyUseSelector((store) => store.leave);
  const leaveList = leave.leaveList;
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchGetLeavesByManager());
    console.log("leaveList: ", leaveList);
  }, []);

  const manageState = async (leaveId: string | undefined, state: string) => {
    if (state == "REJECTED") {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: true,
      });
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      dispatch(
        fetchManageState({
          token: token ? token : "token",
          leaveId: leaveId,
          state: state,
          rejectionReason: text,
        })
      );
    } else {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      dispatch(
        fetchManageState({
          token: token ? token : "token",
          leaveId: leaveId,
          state: state,
        })
      );
    }
  };

  return (
    <div className="container-fluid manager-dashboard-container">
      <div className="row">
        {/* Sol Side Bar */}
        <LeftSideBar />

        {/* Sağ Top Bar ve İçerik */}
        <div className="col-10 manager-dashboard-content">
          <div className="row">
            <DashboardPageTopBar />
          </div>
          <div className="row">
            <hr className="manager-dash-hr-2" />
          </div>
          <div className="row">
            <h1 className="manager-dashboard-header">Manage Leaves</h1>
          </div>
          <div className="row">
            <LeaveTable leaveList={leaveList} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageLeavesPage;
