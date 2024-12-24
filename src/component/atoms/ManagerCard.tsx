import React, { useEffect, useState } from 'react'
import './ManagerCard.css'
import { MyDispatch, MyUseSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchGetProfile } from '../../store/feature/managerSlice';
import { IProfile } from '../../models/IProfile';

function ManagerCard() {
  const manager = MyUseSelector(state=> state.manager.manager)
  const dispatch=useDispatch<MyDispatch>();
  useEffect(()=>{
    dispatch(fetchGetProfile)
  }, [])

    const [isEditMode, setIsEditMode] = useState(false);
  

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  /**const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };*/
  return (
    <>
    <div className="row manager-card-top-row">
        <div className="col-2">
            <img className="dashboard-img" src="https://picsum.photos/50/50" alt="manager-img" />
        </div>
        <div className="col-8 manager-info-col">
            <div className="row">
                <h4 className='manager-name'>{manager.name + manager.surname}</h4>
            </div>
            <div className="row">
                <h5 className='manager-title'>{manager.title}</h5>
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
      <p className='manager-info-title'><strong>Phone Number:</strong> {isEditMode ? <input className="form-control manager-info-input" name="position" value={manager.phoneNumber} /> : <p>{manager.phoneNumber}</p>}</p>
      <p className='manager-info-title'><strong>Email Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="phone" value={manager.email} /> : <p>{manager.email}</p>}</p>
      <p className='manager-info-title'><strong>Deparmant:</strong> <p>{manager.department}</p></p>
      <p className='manager-info-title'><strong>Address:</strong> {isEditMode ? <input className="form-control manager-info-input" name="reportOffice" value={manager.address} /> : <p>{manager.address}</p>}</p>
      <p className='manager-info-title'><strong>Gender:</strong> <p>{manager.gender}</p></p>
    </div>
    </>
  )
}

export default ManagerCard