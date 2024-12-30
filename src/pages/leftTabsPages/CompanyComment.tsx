import React, { useEffect } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchGetComment } from '../../store/feature/commentSlice';

function CompanyComment() {
    const dispatch = useDispatch<MyDispatch>();
    const comment = MyUseSelector((store)=> store.comment.comment);

    useEffect(()=>{
        dispatch(fetchGetComment())
        console.log(comment);
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
                <h1 className="manager-dashboard-header">Company Comment</h1>
              </div>
              <div className="row">
                <input type='textarea'/>
                <Button  />
              </div>
            </div>
          </div>
        </div>
      );
}

export default CompanyComment