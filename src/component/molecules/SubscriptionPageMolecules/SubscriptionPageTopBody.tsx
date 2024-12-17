import React from 'react'
import CyberPunkLogo from '../../atoms/GetStartedButton'
import './SubscriptionPageTopBody.css'
import TryDemoButton from '../../atoms/TryDemoButton'

function SubscriptionPageTopBody() {
  return (
    <>
     <div className="col-8 top-left-body">
            <h2 className='top-left-header'>Try our demo for free!</h2>
            <div className="row top-left-row">
            <span className='top-left-text-1'>Look first at how platform are performing.</span>
            </div>
            <div className="row top-left-row">
            <span className='top-left-text-2'>Then leap into the platform used by millions.</span>
            </div>
     </div>
     <div className="col-4 top-right-body">
        <div className="row top-right-row">
        <span className='dolar-sign'>$</span> <span className='price'>0</span>
        </div>
        <div className="row top-right-row">
            <TryDemoButton name='Try Demo'/>
        </div>
        <div className="row top-right-row">
            <span className='top-right-text'>No credit card needed.</span>
        </div>
     </div>
    </>
  )
}

export default SubscriptionPageTopBody