import React, { useEffect } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchGetMyPossessions } from '../../store/feature/possessionSlice';
import PossessionTable from '../../component/atoms/PossessionTable';

function PossessionPage() {
  const dispatch = useDispatch<MyDispatch>();
    const possessionList = MyUseSelector((store)=> store.possession.possessionList);
    const user = MyUseSelector((store)=> store.user)
    
    useEffect(()=>{
        dispatch(fetchGetMyPossessions())
    },[])
  return (
    <div className="container-fluid manager-dashboard-container">
      <div className="row">
        {/* Sol Side Bar */}
        <LeftSideBar/>

        {/* Sağ Top Bar ve İçerik */}
        <div className="col-10 manager-dashboard-content">
          <div className="row">
            <DashboardPageTopBar />
          </div>
          <div className="row">
            <hr className="manager-dash-hr-2" />
          </div>
          <div className="row">
            <h1 className="manager-dashboard-header">Manage Possession</h1>
          </div>
          <div className="row">
            <PossessionTable possessionList={possessionList} role={user.user.role} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PossessionPage