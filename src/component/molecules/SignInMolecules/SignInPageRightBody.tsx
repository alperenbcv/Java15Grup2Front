import React from 'react'
import './SignInPageRightBody.css'
import CyberPunkLogo from '../../atoms/GetStartedButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../../store';
import { fetchManagerLogin } from '../../../store/feature/managerSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import jwtDecode from 'jwt-decode';
import { fetchEmployeeLogin } from '../../../store/feature/employeeSlice';

function SignInPageRightBody() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmpty,setIsEmpty] = useState(false);
  const [isMailEmpty, setIsMailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');

  const dispatch = useDispatch<MyDispatch>();
  const navigate = useNavigate();

  const login = () => {
    setIsMailEmpty(email === '');     
        setIsPasswordEmpty(password === ''); 
        if(email === '' || password=== ''){
            setIsEmpty(true);                 
            return
        }
        else
            setIsEmpty(false);
        if(accountType === 'MANAGER'){
            dispatch(fetchManagerLogin({ email, password })).then((data: any) => {
                if (data.payload.code === 200 ) {
                    navigate('/manager-dashboard');
                } else if (data.payload.code === 2004) {
                    console.log(data.payload.code)
                    swal('Account Inactive', 'Your account is not active. Please check your email for activation.', 'warning');
                } else {
                    swal('Login Failed', data.payload.message || 'Invalid email or password!', 'error');
                }
            });
        }
        else if(accountType==='EMPLOYEE'){
            dispatch(fetchEmployeeLogin({email,password})).then((data:any) => {
                if (data.payload.code === 200 ) {
                    navigate('/employee-dashboard');
                } else if (data.payload.code === 2004) {
                    console.log(data.payload.code)
                    swal('Account Inactive', 'Your account is not active. Please check your email for activation.', 'warning');
                } else {
                    swal('Login Failed', data.payload.message || 'Invalid email or password!', 'error');
                }
            });
        }
    }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="col col-right">
            <div className="row-right">
                <h2 className='header'>Sign in with email</h2>
            </div>
            {
                    isEmpty 
                    ? <div className='alert alert-warning' role='alert'>
                        <h4 className='alert-heading'>Warning</h4>
                        <hr />
                        <p >Email or password can't be empty!</p>
                     </div>
                    : null 
                }
            
            <div className="row-right">
                <label htmlFor="exampleFromControlInput1" className='form-label-email'>Account Type</label>
            </div> 
            <div className="row-right">
            <select className="form-select form-select-sign-up" aria-label="Default select example" onChange={evt => {setAccountType(evt.target.value)}} value={accountType}>
            <option value="" disabled>
    Account Type
  </option>
  <option value="MANAGER">MANAGER</option>
  <option value="EMPLOYEE">EMPLOYEE</option>
</select>
            </div>
            <div className="row-right">
                <label htmlFor="exampleFormControlInput1" className="form-label-email">Email address</label>
            </div>
            <div className="row-right">
                <input type="email" className="form-control form-mail" id="exampleFormControlInput1" placeholder="name@example.com" onChange={evt=>{setEmail(evt.target.value)}} value={email}/>
            </div>
            
            <div className="row-right">
                <label htmlFor="exampleFormControlInput1" className="form-label-password">Password</label>
            </div>    
            <div className="row-right">  
                <input type={showPassword ? 'text' : 'password'} className="form-control form-password" id="exampleFormControlInput1" placeholder="password" onChange={evt=>{setPassword(evt.target.value)}} value={password}></input>
                <i
          className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '330px',
            top: '46.5%',
            cursor: 'pointer',
            color: 'gray',
          }}
        ></i>
                
            </div>
            <div className="row">
                <a className="forgot-link"href="/forgot-password">I forgot password</a>
                <a className="forgot-link"href="/sign-up">I don't have an account</a>
            </div>
            <div className="row-btn">
            <button className='btn gradient-button submit-button' onClick={login}><span style={{color:'white'}}>Submit</span></button>
            </div>
    </div>  
    
  )
}

export default SignInPageRightBody