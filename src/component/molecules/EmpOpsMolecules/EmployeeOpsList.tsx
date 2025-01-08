import React, { useEffect, useState } from 'react';
import './EmployeeOpsList.css';
import EmployeeRegisterModal from './EmployeeRegisterModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../../store';
import { fetchEmployeeList } from '../../../store/feature/managerSlice';
import { fetchDeleteEmployee } from '../../../store/feature/employeeSlice';
import Swal from 'sweetalert2';

function EmployeeOpsList() {
    const dispatch = useDispatch<MyDispatch>();
    const navigate = useNavigate();
    const employeeList = MyUseSelector((state) => state.manager.employeeList);
    const isEmployeeListLoading = MyUseSelector((state) => state.manager.isEmployeeListLoading);

    const [deactivatedEmployees, setDeactivatedEmployees] = useState<Record<number, boolean>>({});

    useEffect(() => {
        dispatch(fetchEmployeeList());
    }, [dispatch]);

    const deleteEmployee = async (index: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token not found!");
            return;
        }
    
        const mail = employeeList[index]?.mail;
        if (!mail) {
            console.error("Mail not found for employee!");
            return;
        }
    
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you really want to delete the employee with mail: ${mail}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });
        if (!result.isConfirmed) {
            console.log("Delete action cancelled.");
            return;
        }
    
        try {
            await dispatch(fetchDeleteEmployee({ token, mail }));
            console.log(`Employee with mail ${mail} deleted.`);
            dispatch(fetchEmployeeList()); // Listeyi güncelle
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };
    

    const toggleDeactivateEmployee = (index: number) => {
        setDeactivatedEmployees((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Çalışanın durumunu ters çevir
        }));
    };

    return (
        <div>
            <div className="row">
                <button
                    className="btn btn-success emp-register-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#employeeRegModal"
                >
                    Register New Employee
                </button>
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
            <EmployeeRegisterModal />
            <div className="row emp-list-top-row">
                <div className="col-1 col-ops"><span className="emp-title">ID</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Name</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Surname</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Department</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Mail</span></div>
                <div className="col-1 col-ops"><span className="emp-title">State</span></div>
                <div className="col-2 col-ops"><span className="emp-title">Operations</span></div>
            </div>
            {isEmployeeListLoading ? (
                <div className="row">
                    <div className="col">Loading...</div>
                </div>
            ) : (
                (employeeList || []).map((emp: any, index: number) => (
                    <div
                        className={`row emp-list-row ${deactivatedEmployees[index] ? 'deactivated' : ''}`}
                        key={index}
                    >
                        <div className="col-1 col-ops">{index + 1}</div>
                        <div className="col-2 col-ops">{emp.name}</div>
                        <div className="col-2 col-ops">{emp.surname}</div>
                        <div className="col-2 col-ops">{emp.department}</div>
                        <div className="col-2 col-ops">{emp.mail}</div>
                        <div className="col-1 col-ops">Active</div>
                        <div className="col-2 col-ops">
                            <button
                                className="btn btn-danger btn-sm ml-2"
                                onClick={() => deleteEmployee(index)}
                            >
                                Delete
                            </button>
                            <button
                                className={deactivatedEmployees[index] ? 'btn btn-success btn-sm' : 'btn btn-warning btn-sm'}
                                onClick={() => toggleDeactivateEmployee(index)}
                            >
                                {deactivatedEmployees[index] ? 'Activate' : 'Deactivate'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EmployeeOpsList;
