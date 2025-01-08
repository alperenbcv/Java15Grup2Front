import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // URL'den parametre almak için
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../../store';
import swal from 'sweetalert';
import { fetchPasswordRecovery } from '../../../store/feature/managerSlice';

function PasswordRecoverRightBody() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isWrong, setIsWrong] = useState(false);
    const dispatch = useDispatch<MyDispatch>();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordRecovery = async () => {
        if (!email) {
            swal('Error', 'Invalid email address in URL!', 'error');
            return;
        }

        if (password !== rePassword || password === '') {
            swal('Error', 'Passwords do not match or are empty!', 'error');
            return;
        }

        try {
            const response = await dispatch(fetchPasswordRecovery({ mail: email, password, rePassword })).unwrap();
            if (response.success) {
                swal('Success', 'Password updated successfully!', 'success');
                navigate('/sign-in')
                
            } else {
                swal('Error', response.message || 'Failed to update password.', 'error');
            }
        } catch (error) {
            console.error('Error during password recovery:', error);
            swal('Error', 'Something went wrong. Please try again later.', 'error');
        }
    };

    return (
        <div className="col col-right-sign-up">
            <div className="row-right-sign-up">
                <label htmlFor="exampleFormControlInput1" className="form-label-password-sign-up">
                    Password
                </label>
            </div>
            <div className="row-right-sign-up pass-icon-sign-up">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control form-password-sign-up"
                    id="exampleFormControlInput1"
                    placeholder="password"
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                ></input>
                <i
                    className={`fa ${showPassword ? 'fa-eye-slash sign-up-icon' : 'fa-eye sign-up-icon'}`}
                    onClick={togglePasswordVisibility}
                ></i>
            </div>
            <div className="row-right-sign-up">
                <label htmlFor="exampleFormControlInput1" className="form-label-password-sign-up">
                    Re-Password
                </label>
            </div>
            <div className="row-right-sign-up pass-icon-sign-up">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control form-password-sign-up"
                    id="exampleFormControlInput1"
                    placeholder="re-password"
                    onChange={(evt) => {
                        setRePassword(evt.target.value);
                        if (evt.target.value === password) setIsWrong(false);
                        else setIsWrong(true);
                    }}
                    value={rePassword}
                ></input>
            </div>
            <div className="row-right-sign-up">
                {password !== '' && isWrong ? (
                    <label className="text-danger text-danger-sign-up">Passwords don't match!</label>
                ) : null}
            </div>
            <div className="row-btn row-right-sign-up">
                <button
                    className="btn gradient-button-sign-up submit-button-sign-up"
                    onClick={handlePasswordRecovery}
                    disabled={password !== rePassword || password === ''}
                >
                    <span style={{ color: 'white' }}>Submit</span>
                </button>
            </div>
        </div>
    );
}

export default PasswordRecoverRightBody;
