import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../../store';
import { fetchShiftCreate, fetchShiftListManager } from '../../../store/feature/shiftSlice';
import Swal from 'sweetalert2';

interface IRefreshDate {
    shiftDate: Date
}
function AddShiftModal(props: IRefreshDate) {
  const dispatch = useDispatch<MyDispatch>();
  const shiftDate  = props.shiftDate;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [shiftType, setShiftType] = useState('MORNING_SHIFT');
  const [emailList, setEmailList] = useState<string>('');

  const createShift = async () => {
    if (!startDate || !endDate || !shiftType) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    if (!emailList) {
      Swal.fire('Error', 'Employee emails are required.', 'error');
      return;
    }

    const emailArray = emailList
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email);
    if (emailArray.length === 0) {
      Swal.fire('Error', 'Please enter valid employee emails.', 'error');
      return;
    }

    try {
      await dispatch(
        fetchShiftCreate({
          startDate,
          endDate,
          shiftType,
          emailList: emailArray,
        })
      ).unwrap();
      const dateString = new Date(shiftDate || '').toISOString().split('T')[0];
      dispatch(fetchShiftListManager({ date: dateString }));
      Swal.fire('Success', 'Shift created successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to create shift. Please try again.', 'error');
      console.error('Error creating shift:', error);
    }
  };

  return (
    <div
      className="modal fade"
      id="addShiftModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Shift
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Form */}
            <form>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  required
                  id="start-date"
                  onChange={(evt) => setStartDate(evt.target.value)}
                  value={startDate}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="form-control"
                  required
                  id="end-date"
                  onChange={(evt) => setEndDate(evt.target.value)}
                  value={endDate}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Employee Emails</label>
                <input
                  type="text"
                  name="employeeEmails"
                  className="form-control"
                  placeholder="Enter emails, separated by commas"
                  required
                  onChange={(evt) => setEmailList(evt.target.value)}
                  value={emailList}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shiftType" className="form-label">
                  Shift Type
                </label>
                <select
                  className="form-select"
                  id="shiftType"
                  onChange={(evt) => setShiftType(evt.target.value)}
                  value={shiftType}
                >
                  <option disabled>Choose Shift Type</option>
                  <option value="MORNING_SHIFT">Morning</option>
                  <option value="NIGHT_SHIFT">Night</option>
                  <option value="WEEKEND_SHIFT">Weekend</option>
                  <option value="HOLIDAY_SHIFT">Holiday</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-reg-submit"
              onClick={createShift}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddShiftModal;
