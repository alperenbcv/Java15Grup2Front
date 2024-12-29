import React, { useEffect } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { Button, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { MyDispatch, MyUseSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchCompanies, fetchManageCompany } from '../../store/feature/companySlice';
import { ICompany } from '../../models/ICompany';
import Swal from 'sweetalert2';

function ManageCompanies() {
    const companyList = MyUseSelector((state)=> state.company.companyList)
    const dispatch = useDispatch<MyDispatch>();

    useEffect(()=>{
        dispatch(fetchCompanies())
    }, [])


      const manageState = async (companyId: string|undefined ,registerState: string) =>{
          const token = localStorage.getItem("token")? localStorage.getItem("token"): "";
        dispatch(fetchManageCompany({
          token: token?token:"token",
          id: companyId? companyId: "",
          state: registerState
        }))
        
        
      }

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
                <h1 className="manager-dashboard-header">Manage Companies</h1>
              </div>
              
              <div className="row">
              <Table<ICompany> dataSource={companyList}>
            <Column title="Company Name" dataIndex="companyName" key="companyName" />
            <Column title="Company Address" dataIndex="companyAddress" key="companyAddress" />
            <Column title="Established Date" dataIndex="establishedDate" key="establishedDate"  render={(date)=> new Date(date).toLocaleDateString()} />
            <Column title="Industry" dataIndex="industry" key="industry"/>
            <Column title="Register State" dataIndex="registerState" key="registerState" />
            <Column
      title="Action"
      key="action"
      render={(_: any, record: ICompany) => (
        <Space size="middle">
         <Button onClick={(evt)=> manageState(record.id, "ACCEPTED")}  type='primary'>Accept</Button>
         <Button onClick={(evt)=> manageState(record.id, "REJECTED")}type='primary' danger>Reject</Button>
        </Space>
      )}
    />
            </Table>
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default ManageCompanies