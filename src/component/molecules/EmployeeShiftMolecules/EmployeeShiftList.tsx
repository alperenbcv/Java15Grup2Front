import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IShiftResponseManager } from '../../../models/IShiftResponseManager';
import { MyDispatch, MyUseSelector } from '../../../store';
import { fetchShiftListEmployee, fetchShiftListManager } from '../../../store/feature/shiftSlice';

function EmployeeShiftList() {
    const dispatch = useDispatch<MyDispatch>();
    const shiftList = MyUseSelector((state) => state.shift.empShiftList);
    const isShiftListLoading = MyUseSelector((state) => state.shift.isEmpShiftListLoading);
  
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    // Tarih Değişimi
    const handleDateChange = (days: number) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      setSelectedDate(newDate);
    };
  
    // Vardiya Listeleme
    useEffect(() => {
      const dateString = selectedDate.toISOString().split('T')[0];
      dispatch(fetchShiftListEmployee({ date: dateString }));
    }, [dispatch, selectedDate]);
  
    return (
      <div>
        <div className="row">
          <div className="input-group mb-3 emp-search-div">
            <button className="btn btn-secondary" onClick={() => handleDateChange(-1)}>
              &lt; Previous Day
            </button>
            <span className="mx-2" style={{ color: 'white' }}>{selectedDate.toISOString().split('T')[0]}</span>
            <button className="btn btn-secondary" onClick={() => handleDateChange(1)}>
              Next Day &gt;
            </button>
          </div>
        </div>
  
        <div className="row emp-list-top-row">
          <div className="col-2 col-ops"><span className="emp-title">ID</span></div>
          <div className="col-2 col-ops"><span className="emp-title">Start Date</span></div>
          <div className="col-2 col-ops"><span className="emp-title">End Date</span></div>
          <div className="col-3 col-ops"><span className="emp-title">Shift Type</span></div>
          <div className="col-3 col-ops"><span className="emp-title">Name-Surname</span></div>
        </div>
        {isShiftListLoading ? (
          <div className="row">
            <div className="col">Loading...</div>
          </div>
        ) : (
          (Array.isArray(shiftList) ? shiftList : []).map((shift: IShiftResponseManager, index: number) => (
            <div className="row emp-list-row" key={index}>
              <div className="col-2 col-ops">{index+1}</div>
              <div className="col-2 col-ops">{shift.startDate}</div>
              <div className="col-2 col-ops">{shift.endDate}</div>
              <div className="col-3 col-ops">{shift.shiftType}</div>
              <div className="col-3 col-ops">{shift.employeeNameSurname?.join(', ') || 'No employees'}</div>
            </div>
          ))
        )}
      </div>
    );
  }

export default EmployeeShiftList