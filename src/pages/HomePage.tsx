import React from 'react';
import HomePageHeaderLogo from '../component/molecules/HomePageMolecules/HomePageHeaderLogo';
import HomePageHeaderMenu from '../component/molecules/HomePageMolecules/HomePageHeaderMenu';
import HomePageHeaderButtons from '../component/molecules/HomePageMolecules/HomePageHeaderButtons';
import HomePageBody from '../component/molecules/HomePageMolecules/HomePageBody';
import HRimage from '../icons/hrimage.webp';
import './HomePage.css'
import { useDispatch } from 'react-redux';
import { setActivePage } from '../store/feature/pageSlice';

function HomePage() {
  const dispatch = useDispatch();
React.useEffect(()=>{
  dispatch(setActivePage(null));
}, [dispatch]);
  return (
    <div
      className="container-fluid"
      style={{
        background: 'black',
        color: 'white',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Header Bölgesi */}
      <div className="row align-items-center">
        <HomePageHeaderLogo />
        <HomePageHeaderMenu/>
        <HomePageHeaderButtons />
      </div>

      {/* Body Bölgesi */}
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
          <HomePageBody />
        <div className="col-md-6 body-right d-flex justify-content-center">
          <img className='hr-image' src={HRimage} alt="hr-image"/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
