import React, { useState } from 'react';
import './EmployeeOpsList.css';
import EmployeeRegisterModal from './EmployeeRegisterModal';

function EmployeeOpsList() {
    const [empList, setEmpList] = useState<object[]>([
        {
            id: 1,
            name: 'Alperen',
            surname: 'Bicav',
            departmant: 'Production',
            mail: 'alperenbcv@gmail.com'
        },
        {
            id: 2,
            name: 'Atakan',
            surname: 'Isler',
            departmant: 'Legal',
            mail: 'atakanisler@gmail.com'
        }
    ]);

    const deleteEmployee = (index: number) => {
        setEmpList(empList.filter((_, i) => i !== index));
    };
    

    return (
        <div>
            <div className="row">
                <button className="btn btn-success emp-register-btn" data-bs-toggle="modal" data-bs-target="#employeeRegModal">Register New Employee</button>
                <div className="input-group mb-3 emp-search-div">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="Search in the list"
                        aria-describedby="button-addon2"
                    />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                        Search
                    </button>
                </div>
            </div>
            <EmployeeRegisterModal/>
            <div className="row emp-list-top-row">
                <div className="col-1 col-ops"><span className="emp-title">ID</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Name</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Surname</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Department</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Mail</span></div>
                <div className="col-3 col-ops"><span className="emp-title">Operations</span></div>
            </div>
            {empList.map((emp: any, index: number) => (
                <div className="row emp-list-row" key={index}>
                    <div className="col-1 col-ops">{index+1}</div>
                    <div className="col-2 col-ops">{emp.name}</div>
                    <div className="col-2 col-ops">{emp.surname}</div>
                    <div className="col-2 col-ops">{emp.departmant}</div>
                    <div className="col-2 col-ops">{emp.mail}</div>
                    <div className="col-3 col-ops">
                        <button className="btn btn-danger btn-sm ml-2" onClick={()=>deleteEmployee(index)}>Delete</button>
                        <button className="btn btn-warning btn-sm">Mail</button>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default EmployeeOpsList;
