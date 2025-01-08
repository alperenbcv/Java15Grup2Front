import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../../store';
import swal from 'sweetalert';
import { fetchForgotPassword } from '../../../store/feature/userSlice';

function PasswordForgotRightBody() {
    const [isEmpty, setIsEmpty] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch<MyDispatch>();

    const handleForgotPassword = async () => {
        if (!email) {
            setIsEmpty(true); // Email alanı boşsa uyarı göster
            return;
        }

        try {
            const response = await dispatch(fetchForgotPassword(email)).unwrap();
            if (response.success) {
                swal('Success', 'Recovery email has been sent successfully!', 'success');
            } else {
                swal('Error', response.message || 'Failed to send recovery email.', 'error');
            }
        } catch (error) {
            console.error('Error sending recovery email:', error);
            swal('Error', 'Something went wrong. Please try again later.', 'error');
        }
    };

    return (
        <div className="col col-right">
            <div className="row-right">
                <h2 className="header">Forgot Password</h2>
            </div>
            {isEmpty && (
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Warning</h4>
                    <hr />
                    <p>Email can't be empty!</p>
                </div>
            )}
            <div className="row-right">
                <label htmlFor="exampleFormControlInput1" className="form-label-email">
                    Email address
                </label>
            </div>
            <div className="row-right">
                <input
                    type="email"
                    className="form-control form-mail"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={(evt) => {
                        setEmail(evt.target.value);
                        setIsEmpty(false); // Email değiştiğinde uyarıyı kaldır
                    }}
                    value={email}
                />
            </div>
            <div className="row-btn">
                <button
                    className="btn gradient-button submit-button"
                    onClick={handleForgotPassword}
                >
                    <span style={{ color: 'white' }}>Submit</span>
                </button>
            </div>
        </div>
    );
}

export default PasswordForgotRightBody;
