import React, { useState } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar'
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar'
import PersonnelFileTable from '../../component/atoms/PersonnelFileTable'
import { FloatButton } from 'antd'

function PersonnelFileManagement() {
  const [isAddFile, setIsAddFile] = useState(false);
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
                <h1 className="manager-dashboard-header">Personnel File Management</h1>
              </div>
              <div className="row">
               <PersonnelFileTable/>
              </div>
            </div>
          </div>
        </div>
    )
}

export default PersonnelFileManagement