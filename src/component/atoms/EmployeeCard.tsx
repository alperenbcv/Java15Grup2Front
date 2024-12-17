import React, { useState } from 'react'
import './EmployeeCard.css'
interface UserInfo {
    joinDate: string;
    phone: string;
    email: string;
    departmant: string;
    address: string;
    manager: string;
  }
function EmployeeCard() {
    const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone: "+90 999 555 4432",
    email: "alperenbcv@gmail.com",
    departmant: 'Engineering',
    address: "Bornova/Izmir",
    joinDate: "15 Nov 2024",
    manager: "Alperen Bicav"
  });

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <>
    <div className="row employee-card-top-row">
        <div className="col-2">
            <img className="dashboard-img" src="https://picsum.photos/50/50" alt="employee-img" />
        </div>
        <div className="col-8 employee-info-col">
            <div className="row">
                <h4 className='employee-name'>Alperen Bicav</h4>
            </div>
            <div className="row">
                <h5 className='employee-title'>Software Developer</h5>
            </div>
        </div>
        <div className="col-1">
            <button className='btn dashboard-card-edit-btn' onClick={toggleEditMode}>{isEditMode ? <i className="fa-regular fa-floppy-disk fa-xl save-icon-employee"></i> : <i className="fa-solid fa-pen-to-square fa-xl edit-icon-employee" ></i>}</button>
        </div>
    </div>
    <div className="row">
        <hr className='employee-card-hr-1'/>
    </div>
    <div className='col-12 info-col'>
      <p className='employee-info-title'><strong>Phone Number:</strong> {isEditMode ? <input className="form-control manager-info-input" name="position" value={userInfo.phone} onChange={handleInputChange} /> : <p>{userInfo.phone}</p>}</p>
      <p className='employee-info-title'><strong>Email Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="phone" value={userInfo.email} onChange={handleInputChange} /> : <p>{userInfo.email}</p>}</p>
      <p className='employee-info-title'><strong>Departmant:</strong> <p>{userInfo.departmant}</p></p>
      <p className='employee-info-title'><strong>Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="reportOffice" value={userInfo.address} onChange={handleInputChange} /> : <p>{userInfo.address}</p>}</p>
      <p className='employee-info-title'><strong>Joined On:</strong><p>{userInfo.joinDate}</p></p>
      <p className='employee-info-title'><strong>Manager:</strong> <p>{userInfo.manager}</p></p>
    </div>
    </>
  )
}

export default EmployeeCard