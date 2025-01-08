import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { MyDispatch, MyUseSelector } from '../../../store';
import { fetchShiftListManager, fetchDeleteShift } from '../../../store/feature/shiftSlice';
import AddShiftModal from './AddShiftModal';
import UpdateShiftModal from './UpdateShiftModal';
import { IShiftResponseManager } from '../../../models/IShiftResponseManager';
import './Ops.css'

function ManagerShiftOps() {
  const dispatch = useDispatch<MyDispatch>();
  const shiftList = MyUseSelector((state) => state.shift.shiftList);
  const isShiftListLoading = MyUseSelector((state) => state.shift.isShiftListLoading);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<IShiftResponseManager | null>(null); // Seçilen shift

  // Tarih Değişimi
  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // Vardiya Listeleme
  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    dispatch(fetchShiftListManager({ date: dateString }));
  }, [dispatch, selectedDate]);

  // Vardiya Silme
  const deleteShift = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this shift?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await dispatch(fetchDeleteShift({ id })).unwrap();
      Swal.fire('Deleted!', 'The shift has been deleted.', 'success');

      const dateString = selectedDate.toISOString().split('T')[0];
      dispatch(fetchShiftListManager({ date: dateString }));
    } catch (error) {
      Swal.fire('Error', 'Failed to delete the shift.', 'error');
    }
  };

  return (
    <div>
      <div className="row">
        <button
          className="btn btn-success emp-register-btn"
          data-bs-toggle="modal"
          data-bs-target="#addShiftModal"
        >
          Add New Shift
        </button>
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
      <AddShiftModal shiftDate={selectedDate}/>
      <UpdateShiftModal
  shift={selectedShift}
/>

      <div className="row emp-list-top-row">
        <div className="col-1 col-ops"><span className="emp-title">ID</span></div>
        <div className="col-2 col-ops"><span className="emp-title">Start Date</span></div>
        <div className="col-2 col-ops"><span className="emp-title">End Date</span></div>
        <div className="col-2 col-ops"><span className="emp-title">Shift Type</span></div>
        <div className="col-3 col-ops"><span className="emp-title">Employees</span></div>
        <div className="col-2 col-ops"><span className="emp-title">Operations</span></div>
      </div>
      {isShiftListLoading ? (
        <div className="row">
          <div className="col">Loading...</div>
        </div>
      ) : (
        (Array.isArray(shiftList) ? shiftList : []).map((shift: IShiftResponseManager, index: number) => (
          <div className="row emp-list-row" key={index}>
            <div className="col-1 col-ops">{index+1}</div>
            <div className="col-2 col-ops">{shift.startDate}</div>
            <div className="col-2 col-ops">{shift.endDate}</div>
            <div className="col-2 col-ops">{shift.shiftType}</div>
            <div className="col-3 col-ops">{shift.employeeNameSurname?.join(', ') || 'No employees'}</div>
            <div className="col-2 col-ops">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteShift(shift.shiftId)}
              >
                Delete Shift
              </button>
              <button
                className="btn btn-warning btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#updateShiftModal"
                onClick={() => setSelectedShift(shift)}
              >
                Update Shift
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ManagerShiftOps;
