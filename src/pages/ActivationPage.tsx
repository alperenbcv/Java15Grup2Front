import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MyDispatch, MyUseSelector } from '../store';
import { fetchManagerActivation } from '../store/feature/userSlice';

function ActivationPage() {
  const dispatch = useDispatch<MyDispatch>();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const {isActivationLoading} = MyUseSelector(state => state.user);
    
    

    useEffect(() => {
        if (token) {
            dispatch(fetchManagerActivation(token));
        }
    }, [token, dispatch]);

    useEffect(() => {
      if (!isActivationLoading && token) {
          const timeout = setTimeout(() => {
              navigate("/sign-in");
          }, 3000);
          return () => clearTimeout(timeout);
      }
  }, [isActivationLoading, navigate, token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Account Activation</h1>
        {isActivationLoading ? (
            <p>Activating your account, please wait...</p>
        ) : (
            <p>Activation successful! Redirecting to login page...</p>
        )}
    </div>
);
}

export default ActivationPage;