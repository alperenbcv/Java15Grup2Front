import React, { useEffect, useState } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchGetMyPossessions } from '../../store/feature/possessionSlice';
import { fetchGetMyExpenses } from '../../store/feature/expenseSlice';

function ManageExpense() {
    const dispatch = useDispatch<MyDispatch>();
    const expenseList = MyUseSelector((store)=> store.expense.expenseList);
    
    useEffect(()=>{
        dispatch(fetchGetMyExpenses())
        console.log(expenseList)
    },[])

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
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default ManageExpense