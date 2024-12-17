import React, { useState } from 'react'
import './ManagerCard.css'
interface UserInfo {
    joinDate: string;
    phone: string;
    email: string;
    departmant: string;
    address: string;
  }
function ManagerCard() {
    const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone: "+90 999 555 4432",
    email: "alperenbcv@gmail.com",
    departmant: 'Engineering',
    address: "Bornova/Izmir",
    joinDate: "15 Nov 2024",
  });

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <>
    <div className="row manager-card-top-row">
        <div className="col-2">
            <img className="dashboard-img" src="https://picsum.photos/50/50" alt="manager-img" />
        </div>
        <div className="col-8 manager-info-col">
            <div className="row">
                <h4 className='manager-name'>Alperen Bicav</h4>
            </div>
            <div className="row">
                <h5 className='manager-title'>Software Developer</h5>
            </div>
        </div>
        <div className="col-1">
            <button className='btn dashboard-card-edit-btn' onClick={toggleEditMode}>{isEditMode ? <i className="fa-regular fa-floppy-disk fa-xl save-icon-manager"></i> : <i className="fa-solid fa-pen-to-square fa-xl edit-icon-manager" ></i>}</button>
        </div>
    </div>
    <div className="row">
        <hr className='manager-card-hr-1'/>
    </div>
    <div className='col-12 info-col'>
      <p className='manager-info-title'><strong>Phone Number:</strong> {isEditMode ? <input className="form-control manager-info-input" name="position" value={userInfo.phone} onChange={handleInputChange} /> : <p>{userInfo.phone}</p>}</p>
      <p className='manager-info-title'><strong>Email Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="phone" value={userInfo.email} onChange={handleInputChange} /> : <p>{userInfo.email}</p>}</p>
      <p className='manager-info-title'><strong>Deparmant:</strong> <p>{userInfo.departmant}</p></p>
      <p className='manager-info-title'><strong>Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="reportOffice" value={userInfo.address} onChange={handleInputChange} /> : <p>{userInfo.address}</p>}</p>
      <p className='manager-info-title'><strong>Joined On:</strong> <p>{userInfo.joinDate}</p></p>
    </div>
    </>
  )
}

export default ManagerCard