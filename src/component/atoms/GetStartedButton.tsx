import React from 'react'
import './GetStartedButton.css'
import { useNavigate } from 'react-router-dom';
type ButtonText = {
    name: string;
}
function GetStartedButton(props:ButtonText) {
    const navigate = useNavigate();

    const {name} = props;
  return (
        <button className='btn gradient-button get-started-btn' onClick={evt => navigate('/subscription')}><span style={{color:'white'}}>{name}</span></button>
  )
}

export default GetStartedButton