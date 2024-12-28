import React, { useEffect, useState } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar'
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar'
import ManagerCard from '../../component/atoms/ManagerCard'
import ProfilePhoto from '../../component/atoms/ProfilePhoto'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../../store'
import { fetchAddLeave } from '../../store/feature/leaveSlice'
import Swal from 'sweetalert2'

function LeavePage() {
    const convertToEpoch = (dateStr: string)=>{
        const date = new Date(dateStr);
        return date.getTime();
    }

    const dispatch = useDispatch<MyDispatch>();
    const leave = MyUseSelector((state)=> state.leave.leave)

    const [fromDate, setFromDate] = useState('');
    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setFromDate(event.target.value);
    }
    const [toDate, setToDate] = useState<string>('');
    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setToDate(event.target.value);
    }
    const [leaveType, setLeaveType] = useState<string>('');
    const handleLeaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        setLeaveType(event.target.value)
    }
    const [description, setDescription] = useState<string>('');

    const addLeave = ()=>{
        const token = localStorage.getItem("token");
        if (fromDate != '' && toDate != '' && leaveType != ''){
            dispatch(fetchAddLeave({
                description: description,
                endDate: convertToEpoch(toDate),
                startDate: convertToEpoch(fromDate),
                leaveType: leaveType,
                token: token? token: ""

            }))
        }
        else { Swal.fire({
          title: "Başarısız",
          text: "Lütfen boş kutuları doldurunuz",
          icon: "error"
        })}
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
            <h1 className="manager-dashboard-header">Manage Leave</h1>
          </div>
          <div className="row">
          <div className='px-5'>
        <div className="container my-5 text-white">
          <label htmlFor="startDate">Leave Type</label>
          <select onChange={handleLeaveTypeChange} className="form-select " aria-label="Default select example">
            <option data-hidden="true" disabled selected>
              Choose your leave category
            </option>
            <option value="ANNUAL_LEAVE">Annual Leave</option>
            <option value="SICK_LEAVE">Sick Leave</option>
            <option value="MATERNITY_LEAVE">Maternity Leave</option>
            <option value="PATERNITY_LEAVE">Paternity Leave</option>
            <option value="UNPAID_LEAVE">Unpaid Leave</option>
            <option value="COMPASSIONATE_LEAVE">Compassionate Leave</option>
            <option value="STUDY_LEAVE">Study Leave</option>
            <option value="EMERGENCY_LEAVE">Emergency Leave</option>
            <option value="SABBATICAL_LEAVE">Sabbatical Leave</option>
            <option value="PUBLIC_HOLIDAY">Public Holiday</option>
            <option value="CASUAL_LEAVE">Casual Leave</option>
            <option value="COMPENSATORY_LEAVE">Compensatory Leave</option>
            <option value="MARRIAGE_LEAVE">Marriage Leave</option>
            <option value="ADOPTION_LEAVE">Adoption Leave</option>
            <option value="MILITARY_LEAVE">Military Leave</option>

          </select>
        </div>

        <div className="container my-3 text-white">
          <div className="row">
            <div className="col-6">
              <label htmlFor="startDate">From Date</label>
              <input value={fromDate} onChange={handleFromDateChange} id="startDate" className="form-control " type="date" />
            </div>

            <div className="col-6">
              <label htmlFor="startDate">To Date</label>
              <input value={toDate} onChange={handleToDateChange} id="startDate" className="form-control" type="date" />
            </div>
          </div>
        </div>

        <div className="container mt-5 text-white">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control" value={description} onChange={(evt)=>setDescription(evt.target.value)}
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="container my-3 text-white">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button onClick={addLeave} className="btn btn-primary" type="button">
              Add Leave
            </button>
          </div>
        </div>
    </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeavePage