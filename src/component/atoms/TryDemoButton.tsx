import React from 'react'
import './TryDemoButton.css'
import { useNavigate } from 'react-router-dom';
type ButtonText = {
    name: string;
}
function TryDemoButton(props:ButtonText) {
    const navigate = useNavigate();

    const {name} = props;
  return (
        <button className='btn try-button' onClick={evt => navigate('/demo')}><span style={{color:'white'}}>{name}</span></button>
  )
}

export default TryDemoButton