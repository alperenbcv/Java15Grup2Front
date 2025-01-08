import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { MyDispatch } from '../../../store';
import { fetchShiftListManager, fetchUpdateShift } from '../../../store/feature/shiftSlice';
import { IShiftResponseManager } from '../../../models/IShiftResponseManager';


function UpdateShiftModal({ shift }: { shift: IShiftResponseManager | null}) {
  const dispatch = useDispatch<MyDispatch>();

  const [startDate, setStartDate] = useState(shift?.startDate || '');
  const [endDate, setEndDate] = useState(shift?.endDate || '');
  const [shiftType, setShiftType] = useState(shift?.shiftType || 'MORNING_SHIFT');
  const [emailList, setEmailList] = useState<string>(shift?.employeeNameSurname?.join(', ') || '');
  const shiftId = shift?.shiftId || '';

  const updateShift = async () => {
    if (!startDate || !endDate || !shiftType) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    try {
      await dispatch(
        fetchUpdateShift({
          startDate,
          endDate,
          shiftType,
          emailList: emailList.split(',').map((email) => email.trim()),
          shiftId
        })
      ).unwrap();
      const dateString = new Date(shift?.startDate || '').toISOString().split('T')[0];
    dispatch(fetchShiftListManager({ date: dateString }));
      Swal.fire('Success', 'Shift updated successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update shift. Please try again.', 'error');
      console.error('Error updating shift:', error);
    }
  };

  useEffect(() => {
    if (shift) {
      setStartDate(shift.startDate || '');
      setEndDate(shift.endDate || '');
      setShiftType(shift.shiftType || 'MORNING_SHIFT');
      setEmailList(shift.employeeNameSurname?.join(', ') || '');
    }
  }, [shift]);

  return (
    <div
      className="modal fade"
      id="updateShiftModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Shift
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  required
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
              onClick={updateShift}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateShiftModal;
