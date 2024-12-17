import React from 'react'
import Header from '../component/molecules/HomePageMolecules/Header'
import { useDispatch } from 'react-redux'
import { setActivePage } from '../store/feature/pageSlice'
import SubscriptionPageTopBody from '../component/molecules/SubscriptionPageMolecules/SubscriptionPageTopBody';
import SubscriptionPageMidBody from '../component/molecules/SubscriptionPageMolecules/SubscriptionPageMidBody';
import './SubscriptionPage.css'

function SubscriptionPage() {

const dispatch = useDispatch();
React.useEffect(()=>{
  dispatch(setActivePage('SUBSCRIPTION'));
}, [dispatch]);
  return (
   <div className="container-fluid subscription-body" style={{
    background: 'black',
    color: 'white',
    minHeight: '100vh',
    overflowY:'auto'
  }}>
      <div className="row align-items-center">
        <Header/>
        <hr style={{marginTop:'-25px'}}/>
      </div>
      <div className="row align-items-center">
       <SubscriptionPageTopBody/>
       <hr />
      </div>
      <div className="row">
        <SubscriptionPageMidBody monthlyPrice={9.99} annualPrice={Math.round(9.99*12)*0.75}/>
      </div>
   </div>
  )
}

export default SubscriptionPage