import React from 'react'
import './SubscribeNowButton.css'
import { useNavigate } from 'react-router-dom';
type ButtonText = {
    name: string;
}
function SubscribeNowButton(props:ButtonText) {
    const navigate = useNavigate();

    const {name} = props;
  return (
        <button className='btn subscribe-button' onClick={evt => navigate('/company-register')}><span style={{color:'white'}}>{name}</span></button>
  )
}

export default SubscribeNowButton