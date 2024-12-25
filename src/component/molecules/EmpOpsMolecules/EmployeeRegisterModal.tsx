import React from 'react';
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap';


function EmployeeRegisterModal() {

    const registerAlert = () => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee has been registered successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
            const modalElement = document.getElementById('employeeRegModal'); // Modal elementini al
            if (modalElement) {
            const bootstrapModal = Modal.getInstance(modalElement); // Modal instance'ını al
            bootstrapModal?.hide(); // Modal'ı kapat
            }
          });
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
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Form Başlangıcı */}
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <input type="text" className="form-control" id="surname" placeholder="Enter surname" />
              </div>
              <div className="mb-3">
                <label htmlFor="mail" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="mail" placeholder="Enter email" />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select className="form-select" id="department">
                  <option value="">Select department</option>
                  <option value="Production">Production</option>
                  <option value="Legal">Legal</option>
                  <option value="HR">Human Resources</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </form>
            {/* Form Bitişi */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary btn-reg-submit" onClick={()=>registerAlert()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegisterModal;
