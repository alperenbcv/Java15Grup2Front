import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../../store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchEmployeeActivation } from '../../../store/feature/userSlice';

function EmployeeActivationRightBody() {

        const dispatch = useDispatch<MyDispatch>();
        const navigate = useNavigate();
        const [searchParams] = useSearchParams();
        const activationToken = searchParams.get("token");
        console.log("Activation Token:", activationToken);
        const {isActivationSuccessful} = MyUseSelector(state => state.user);

        const [showPassword, setShowPassword] = useState(false);
        const [password, setPassword] = useState('');
        const [rePassword, setRePassword] = useState('');
        const [isWrong, setIsWrong] = useState(false);
        const [gender, setGender] = useState('');
        const [birthDate, setBirthDate] = useState('');
        const [title, setTitle] = useState('');

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const activateEmployee = async () => {
        await dispatch(
          fetchEmployeeActivation({
            gender,
            password,
            rePassword,
            birthDate,
            title,
            activationToken,
          })
        );
      };
      
      useEffect(() => {
        if (isActivationSuccessful) {
          navigate("/sign-in");
        }
      }, [isActivationSuccessful, navigate]);
      
     
    return (
        <div className="col col-right-sign-up">
          <div className="row-right-sign-up">
            <h2 className="header-sign-up">Employee Activation</h2>
          </div>
          <div className="row-sign-up">
            <hr className="hr-1-sign-up"/>
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Title
            </label>
          </div>
          <div className="row-right-sign-up">
          <input
              type="text"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
               placeholder="Title"
               onChange={evt => {setTitle(evt.target.value)}}
                   value={title}
            />
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Birthdate
            </label>
          </div>
          <div className="row-right-sign-up">
            <input
              type="date"
              className="form-control form-mail-sign-up"
              id="exampleFormControlInput1"
              onChange={evt => {setBirthDate(evt.target.value)}}
                   value={birthDate}
            />
          </div>
          <div className="row-right-sign-up">
            <label htmlFor="exampleFormControlInput1" className="form-label-text-sign-up">
              Gender
            </label>
          </div>
          <div className="row-right-sign-up">
            <select className="form-select form-select-sign-up" aria-label="Default select example" onChange={evt => {setGender(evt.target.value)}}
                   value={gender}>
              <option value="" disabled>
              Gender
              </option>
              <option value="MAN">MAN</option>
              <option value="WOMAN">WOMAN</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div className="row-right-sign-up">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label-password-sign-up"
            >
              Password
            </label>
          </div>
          <div className="row-right-sign-up pass-icon-sign-up">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-password-sign-up"
              id="exampleFormControlInput1"
              placeholder="password"
              onChange={evt => {setPassword(evt.target.value)}}
                   value={password}
            ></input>
            <i
              className={`fa ${showPassword ? "fa-eye-slash sign-up-icon" : "fa-eye sign-up-icon"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="row-right-sign-up">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label-password-sign-up"
            >
              Re-Password
            </label>
          </div>
          <div className="row-right-sign-up pass-icon-sign-up">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-password-sign-up"
              id="exampleFormControlInput1"
              placeholder="re-password"
              onChange={evt => { {setRePassword(evt.target.value)} if(evt.target.value === password) setIsWrong(false)
              else setIsWrong(true)}}
                   value={rePassword}
              
            ></input>
          </div>
          <div className="row-right-sign-up">
          {password !== '' && (isWrong ? <label className="text-danger text-danger-sign-up">Passwords don't match!</label> : null)}
    
            </div>
          <div className="row-btn row-right-sign-up">
            <button className="btn gradient-button-sign-up submit-button-sign-up" onClick={activateEmployee} disabled={password !== rePassword || password === ''}>
              <span style={{ color: "white" }}>Submit</span>
            </button>
          </div>
        </div>
      );
    }
export default EmployeeActivationRightBody