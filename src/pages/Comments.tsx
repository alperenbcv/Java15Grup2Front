import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../store'
import { fetchGetAllComments } from '../store/feature/commentSlice';
import HomePageHeaderButtons from '../component/molecules/HomePageMolecules/HomePageHeaderButtons';
import HomePageHeaderMenu from '../component/molecules/HomePageMolecules/HomePageHeaderMenu';
import HomePageHeaderLogo from '../component/molecules/HomePageMolecules/HomePageHeaderLogo';
import { setActivePage } from '../store/feature/pageSlice';
import HRimage from '../icons/hrimage.webp';
import CompanyCommentList from '../component/organisms/CompanyCommentList';

function Comments() {
    const dispatch = useDispatch<MyDispatch>();
    
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
          <CompanyCommentList/>

      </div>
    </div>
  );
}

export default Comments