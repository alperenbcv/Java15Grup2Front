import React from 'react';
import './HomePageBody.css'
import GetStartedNowButton from '../../atoms/GetStartedNowButton';

function HomePageBody() {
  return (
    <div className='col-6 left-body'>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
        SIMPLIFY HR / AMPLIFY RESULTS.
      </h1>      
      <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>
        Efficient HR management starts with simplicity...
      </p>
      <div style={{ marginBottom: '20px' }}>
        <GetStartedNowButton name="Get started now" />
      </div>
      
    </div>
  );
}

export default HomePageBody;
