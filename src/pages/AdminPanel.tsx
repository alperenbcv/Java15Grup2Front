import React from 'react'
import ManagerDashboardHeaderLogo from '../component/molecules/DashboardMolecules/DashboardHeaderLogo'
import ManagerDashboardSideButtons from '../component/atoms/ManagerDashboardSideButtons'
import './AdminPanel.css'
import DashboardPageTopBar from '../component/molecules/DashboardMolecules/DashboardPageTopBar'
import AdminTotalCompanies from '../component/molecules/AdminCharts/AdminTotalCompanies'
import AdminTotalSub from '../component/molecules/AdminCharts/AdminTotalSub'
import AdminTotalEarnings from '../component/molecules/AdminCharts/AdminTotalEarnings'
import AdminClientSectorChart from '../component/molecules/AdminCharts/AdminClientSectorChart'
import AdminRevenueChart from '../component/molecules/AdminCharts/AdminRevenueChart'
import AdminSubscriptionChart from '../component/molecules/AdminCharts/AdminSubscriptionChart'

function AdminPanel() {
  return (
    <div className="container-fluid admin-panel-container">
      <div className="row">
      <div className="col-2 admin-side-bar">
          <div className="row">
            <ManagerDashboardHeaderLogo />
          </div>
          <div className="row">
            <span className="admin-menu-text">Main Menu</span>
            <hr className="admin-dash-hr-1" />
          </div>
          <div className="row">
            <ManagerDashboardSideButtons
              buttonName="Admin Panel"
              buttonIcon="fa-solid fa-user-tie"
              navigation='/admin-panel'
            />
          </div>
        </div>
        <div className="col-10 admin-dashboard-content">
          <div className="row">
            <DashboardPageTopBar />
          </div>
          <div className="row">
            <hr className='admin-dash-hr-2'/>
          </div>
          <div className="row">
            <h1 className='admin-dashboard-header'>Admin Panel</h1>
          </div>
          <div className="row">
            <div className="col admin-stat-col">
                <AdminTotalCompanies/>
            </div>
            <div className="col admin-stat-col">
            <AdminTotalSub/>
            </div>
            <div className="col admin-stat-col">
            <AdminTotalEarnings/>
            </div>    
            
          </div>
          <div className="row admin-chart-row">
          <div className="col-3 client-sector-chart">
            <AdminClientSectorChart/>            
            </div>  
            <div className="col-4 revenue-chart">
              <AdminRevenueChart/>
            </div>
            <div className='col-3 sub-chart'>
              <AdminSubscriptionChart/>
              </div>                
            </div>          
        </div>
      </div>
    </div>
  )
}

export default AdminPanel