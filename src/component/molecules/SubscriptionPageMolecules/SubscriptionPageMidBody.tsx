import React, { useState } from 'react'
import './SubscriptionPageMidBody.css'
import SubscribeNowButton from '../../atoms/SubscribeNowButton';

interface SubscriptionDetails {
    monthlyPrice : number,
    annualPrice : number,
}
function SubscriptionPageMidBody(props : SubscriptionDetails) {
    const {monthlyPrice, annualPrice} = props;

    const [showPopup, setShowPopup] = useState(false);

    const infoPopUp = () => {
        setShowPopup(true);
    }

    const hidePopUp = () => {
        setShowPopup(false);
      };

  return (
    <>
    <div className="row header-row">
        <h1 className='mid-body-header-1'>Plans for next level of</h1>
    </div>
    <div className="row header-row">
        <h1 className='mid-body-header-2'>management</h1>
    </div>
    <div className="row mid-row">
    <div className="col-6 month-col">
        <div className="row"><h3 className='month-header'>Monthly</h3></div>
        <div className="row"><h2 className='month-price'>${monthlyPrice}</h2><span className='divide-month'>/month</span></div>
        <div className="row"><p className='month-text'>${monthlyPrice*12} / year</p></div>
        <div className="row month-save-row"><h4 className='month-save'>No save</h4>
        </div>
        <div className="row">
            <SubscribeNowButton name='Subscribe Now' />
            <hr className='hr-month-1'/>
        </div>
        
        <div className="row spec-row">
            <div className="col-1"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11"><span>No ads</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11"><span>Unlimited employee</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11"><span>Live Support Chat</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11"><span>Calendar Integration</span></div>
        </div>
    </div>
    <div className="col-6 annual-col">
        <div className="row"><h3 className='annual-header'>Annualy</h3></div>
        <div className="row"><h2 className='annual-price'>${annualPrice/12}</h2><span className='divide-year'>/month</span></div>
        <div className="row"><p className='annual-text'>${annualPrice} / year</p></div>
        <div className="row annual-save-row"><h4 className='annual-save'>You save about ${Math.round(monthlyPrice*12)-annualPrice} a year</h4>
       <i className="fa-solid fa-circle-info" onMouseEnter={evt=> infoPopUp()} onMouseLeave={evt => hidePopUp()} onClick={evt => infoPopUp()}></i>
       {showPopup && (
        <div className='popup'
          style={{
            position: 'absolute',
            right: '460px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '200px',
          }}
        >
          <p style={{ margin: 0, fontSize: '10px' }}>Compared to paying monthly. You can save up to 25% by paying annually !</p>
        </div> )}
        </div>
        <div className="row">
        <SubscribeNowButton name='Subscribe Now' />
        <hr className='hr-annual-1'/>
        </div>
       
        <div className="row spec-row">
            <div className="col-1 check-col"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11 spec-col"><span>No ads</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1 check-col"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11 spec-col"><span>Unlimited employee</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1 check-col"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11 spec-col"><span>Live Support Chat</span></div>
        </div>
        <div className="row spec-row">
            <div className="col-1 check-col"><i className="fa-solid fa-check" style={{color: "#898b90;"}}></i></div>
            <div className="col-11 spec-col"><span>Calendar Integration</span></div>
        </div>
    </div>
    </div>
    </>
  )
}
export default SubscriptionPageMidBody