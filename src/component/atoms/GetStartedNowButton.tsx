import React from 'react'
import './GetStartedNowButton.css'
import { useNavigate } from 'react-router-dom';
type ButtonText = {
    name: string;
}
function GetStartedNowButton(props:ButtonText) {
    const navigate = useNavigate();

    const {name} = props;
  return (
        <button className='btn gradient-button get-started-now-btn' onClick={evt => navigate('/subscription')}><span style={{color:'white'}}>{name}</span></button>
  )
}

export default GetStartedNowButton