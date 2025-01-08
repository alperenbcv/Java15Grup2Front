import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MyDispatch } from "../../store";
import { fetchEmployeeRegister } from "../../store/feature/userSlice";

function EmployeeRegisterModal() {
  const dispatch = useDispatch<MyDispatch>();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [department, setDepartment] = useState(''); 
  const [email, setEmail] = useState(''); 

  const saveEmployee = async () => {
    const token = localStorage.getItem('token');
    await dispatch(fetchEmployeeRegister({ name, surname, email, department, token }));

  };
    
    
    
  return (
    <div
      className="modal fade"
      id="employeeRegModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Register New Employee
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Form Başlangıcı */}
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  onChange={evt => {setName(evt.target.value)}}
               value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  placeholder="Enter surname"
                  onChange={evt => {setSurname(evt.target.value)}}
               value={surname}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="mail"
                  placeholder="Enter email"
                  onChange={evt => {setEmail(evt.target.value)}}
               value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select className="form-select" id="department" onChange={evt => {setDepartment(evt.target.value)}}
               value={department}>
                  <option selected disabled>
                    Deparment
                  </option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="SALES">SALES</option>
                  <option value="IT">IT</option>
                  <option value="LEGAL">LEGAL</option>
                  <option value="RESEARCH">RESEARCH</option>
                  <option value="ENGINEERING">ENGINEERING</option>
                  <option value="ADMINISTRATION">ADMINISTRATION</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                </select>
              </div>
            </form>
            {/* Form Bitişi */}
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
              onClick={() => saveEmployee()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegisterModal;
