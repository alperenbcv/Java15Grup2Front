import React, { useState } from 'react'
import './CompanyPageRegisterRightBody.css'
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../../store';
import { fetchCompanyRegister } from '../../../store/feature/companySlice';
import { useNavigate } from 'react-router-dom';
import { IBaseResponse } from '../../../models/IBaseResponse';

function CompanyPageRegisterRightBody() {
  const navigate = useNavigate();
  const dispatch = useDispatch<MyDispatch>();
  const [companyName, setCompanyName] = useState('');
  const [companyMail, setCompanyMail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [establishedDate, setEstablishedDate] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState(0);

  const saveCompany = async () =>{
    const response = await dispatch(fetchCompanyRegister({companyName, companyMail, companyAddress, establishedDate, industry, employeeNumber}));

    const payload = response.payload as IBaseResponse;
    if(payload?.code === 200){
      navigate('/')
    }
  }
  
    return (
        <div className="col col-right-sign-up">
          <div className="row-right-sign-up">
            <h2 className="header-sign-up">Company Registration</h2>
          </div>
          <div className="row-sign-up">
            <hr className="hr-1-sign-up"/>
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Company Name
            </label>
          </div>
          <div className="row-right-sign-up">
          <div className="row-right-sign-up">
            <input
              type="text"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
               placeholder="Company Name"
               onChange={evt => {setCompanyName(evt.target.value)}}
               value={companyName}
            />
          </div>
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Industry
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="text"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
              placeholder="Industry"
              onChange={evt => {setIndustry(evt.target.value)}} 
              value={industry}
            />
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Company Address
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="text"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
              placeholder="Address"
              onChange={evt => {setCompanyAddress(evt.target.value)}}
              value={companyAddress}
            />
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Established Date
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="date"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
              onChange={evt => {setEstablishedDate(evt.target.value)}}
              value={establishedDate}
            />
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up" >
              Company Mail
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="email"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
               placeholder="name@company.com"
               onChange={evt => {setCompanyMail(evt.target.value)}}
               value={companyMail}
            />
          </div>
          <div className="row-right">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Number of Employees
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="number"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
              placeholder="Number"
              onChange={(evt) => setEmployeeNumber(evt.target.value ? parseInt(evt.target.value, 10) : 0)}
              value={employeeNumber}
            />
          </div>
          <div className="row-btn row-right-sign-up">
        <button className="btn gradient-button-sign-up submit-button-sign-up" onClick={saveCompany}>
          <span style={{ color: "white" }}>Submit</span>
        </button>
      </div>
          </div>
      );
}

export default CompanyPageRegisterRightBody