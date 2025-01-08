import React, { useEffect, useState } from "react";
import DashboardPageTopBar from "../../component/molecules/DashboardMolecules/DashboardPageTopBar";
import LeftSideBar from "../../component/organisms/LeftSideBar";
import PersonnelTable from "../../component/atoms/PersonnelTable";
import { Button, FloatButton, Input, Modal, Space } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../store";
import { fetchAddEmployee, fetchEmployeeRegister, fetchGetMyEmployees, fetchGetProfile } from "../../store/feature/userSlice";
import { IBaseResponse } from "../../models/IBaseResponse";
import { unwrapResult } from "@reduxjs/toolkit";

function ManagePersonnel() {
  const dispatch = useDispatch<MyDispatch>();

  const manager = MyUseSelector((store)=> store.user.user)
  const [isAddPersonnel, setIsAddPersonnel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("")
  const [tempPassword, setTempPassword] = useState("");
const [tempRePassword, setTempRePassword] = useState("");
  const isDisabled = name === "" || surname === "" || email === "" || department === "";

const addEmployee = () =>{
  setConfirmLoading(true)
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
    dispatch(fetchEmployeeRegister({
      name: name,
      surname: surname,
      email: email,
      department: department,
      token: token ? token : "",
    }))
      .then(unwrapResult)
      .then((payload: IBaseResponse) => {
        setConfirmLoading(false);
        setIsAddPersonnel(false);
    
        if (payload.code === 200) {
          dispatch(fetchGetMyEmployees());
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
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
            <FloatButton  style={{width:'50px', height:'50px'}} icon={<UserAddOutlined />} onClick={()=>setIsAddPersonnel(!isAddPersonnel)}  type='primary' tooltip={<div>Add a Personnel</div>} />
          </div>
          <div className="row">
            <PersonnelTable/>
          </div>
          {
            
            <Modal open={isAddPersonnel} onCancel={()=>setIsAddPersonnel(!isAddPersonnel)} onOk={addEmployee} confirmLoading={confirmLoading} okText='Add Personnel' okButtonProps={{
              disabled: isDisabled
            }} >
              <Space direction="vertical" style={{fontWeight:'bold'}}>
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
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select className="form-select" id="department" onChange={evt => {setDepartment(evt.target.value)}}
               value={department}>
                  <option selected disabled>
                    Deparment
                  </option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="SALES">SALES</option>
                  <option value="IT">IT</option>
                  <option value="LEGAL">LEGAL</option>
                  <option value="RESEARCH">RESEARCH</option>
                  <option value="ENGINEERING">ENGINEERING</option>
                  <option value="ADMINISTRATION">ADMINISTRATION</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                </select>
                {
                  isDisabled?<label className="text-danger" >Please fill all the field</label>:<></>
                }
              </Space>
            </Modal>
            
          }
          
        </div>
      </div>
    </div>
  );
}

export default ManagePersonnel;