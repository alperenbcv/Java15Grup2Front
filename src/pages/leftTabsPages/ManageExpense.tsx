import React, { useEffect, useState } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchGetMyPossessions } from '../../store/feature/possessionSlice';
import { fetchAddExpense, fetchGetMyEmployeesExpenses, fetchGetMyExpenses } from '../../store/feature/expenseSlice';
import ExpenseTable from '../../component/atoms/ExpenseTable';
import {Button, Divider, FloatButton, Input, Space } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ManageExpense() {
    const user = MyUseSelector((store)=> store.user.user);
    const dispatch = useDispatch<MyDispatch>();
    const [isAltered, setIsAltered] = useState(false);
    
    const [isAddExpense, setIsAddExpense] = useState(false);

    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");

    const addExpense = ()=>{
      const token = localStorage.getItem("token");
      if (user.role == "EMPLOYEE"){
        
        dispatch(fetchAddExpense({
          title: title,
          cost: Number(cost),
          description: description,
          token: token?token:""
        }))
        setIsAltered(!isAltered);
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
                <h1 className="manager-dashboard-header">Manage Expense</h1>
              </div>
              <div className="row">
                <ExpenseTable alter={isAltered} role={user.role} />
              </div>
              <div>
                <FloatButton onClick={()=>setIsAddExpense(!isAddExpense)} type='primary' tooltip={<div>Add an Expense</div>} />
              </div>
              <div>
                {isAddExpense?<div className='row mt-4 w-75 mx-auto'>
                  <Space direction='vertical' >
                  <Input onChange={evt=> setTitle(evt.target.value)} value={title} placeholder='Title'  />
                  <Input onChange={evt=> setDescription(evt.target.value)} value={description} placeholder='Description' />
                  <Input type='number' onChange={evt=> setCost(evt.target.value)} value={cost} placeholder='Cost' />
                  <Button type='primary' onClick={(evt)=>addExpense()}>Add Expense</Button>
                  </Space>
                  
                </div>:<></>}
              </div>
            </div>
          </div>
        </div>
      );
}


export default ManageExpense;