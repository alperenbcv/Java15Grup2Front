import React, { useState } from "react";
import ManagerDashboardSideButtons from "../../component/molecules/LeftTabs/ManagerDashboardSideButtons";
import DashboardPageTopBar from "../../component/molecules/DashboardMolecules/DashboardPageTopBar";
import ManagerCard from "../../component/atoms/ManagerCard";
import EmployeeDetailsChart from "../../component/molecules/ManagerCharts/EmployeeDetailsChart";
import EmployeeByDepartmantChart from "../../component/molecules/ManagerCharts/EmployeeByDepartmantChart";
import EmployeeLeaveChart from "../../component/molecules/EmployeeCharts/EmployeeLeaveChart";
import LeftSideBar from "../../component/organisms/LeftSideBar";
import ProfilePhoto from "../../component/atoms/ProfilePhoto";
import PersonnelTable from "../../component/atoms/PersonnelTable";
import { Button, FloatButton, Input, Space } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../store";
import { fetchAddEmployee } from "../../store/feature/userSlice";

function ManagePersonnel() {
  const dispatch = useDispatch<MyDispatch>();
  const manager = MyUseSelector((store)=> store.user.user)
  const [isAddPersonnel, setIsAddPersonnel] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
const [tempRePassword, setTempRePassword] = useState("");
  const isDisabled = name === "" || surname === "" || email === "" || tempPassword === "" || tempRePassword=== "";
const addEmployee = () =>{
  if (tempPassword !== tempRePassword) {
    Swal.fire({
      title: "Error",
      text: "Password and repassword do not match",
      icon: "error"
  })
  } else if(manager.role != "MANAGER"){
    Swal.fire({
      title: "Error",
      text: "Only managers can add employee",
      icon: "error"
    })
  }
   else{
    const token = localStorage.getItem("token");
    dispatch(fetchAddEmployee({
      name: name,
      surname: surname,
      email: email,
      password: tempPassword,
      repassword: tempRePassword,
      token: token?token:""
    }))
   }


}

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
          <div className="">
            <FloatButton icon={<UserAddOutlined />} onClick={()=>setIsAddPersonnel(!isAddPersonnel)}  type='primary' tooltip={<div>Add a Personnel</div>} />
          </div>
          <div className="row">
            <PersonnelTable/>
          </div>
          {
            isAddPersonnel?
            <div className="row">
              <Space direction="vertical" style={{color: 'white'}}>
                <label htmlFor="name" >Employee Name</label>
                <Input id="name" placeholder="John" value={name} onChange={(evt)=>{
                  setName(evt.target.value)
                }} />
                <label htmlFor="surname" >Employee Surname</label>
                <Input id="surname" placeholder="Doe" value={surname} onChange={(evt)=>{
                  setSurname(evt.target.value)
                }} />
                <label htmlFor="e-mail" >E-mail</label>
                <Input type="email" id="e-mail" placeholder="example@mail.com" value={email} onChange={(evt)=>{
                  setEmail(evt.target.value)
                }} />
                <label htmlFor="pass" >Temporary Password</label>
                <Input type="password" id="pass" placeholder="********" value={tempPassword} onChange={(evt)=>{
                  setTempPassword(evt.target.value)
                }} />
                <label htmlFor="rePass" >Repeat Password</label>
                <Input type="password" id="rePass" placeholder="********" value={tempRePassword} onChange={(evt)=>{
                  setTempRePassword(evt.target.value)
                }} />
                {
                  isDisabled?<label className="text-danger" >Please fill all the field</label>:<></>
                }
                
                <Button onClick={addEmployee} type="primary" style={isDisabled?{backgroundColor:'gray', color:'white'}:{}} disabled={isDisabled} >Add Employee</Button>
              </Space>
            </div>
            :
            <></>
          }
          
        </div>
      </div>
    </div>
  );
}

export default ManagePersonnel;