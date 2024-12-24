import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SubscriptionPage from './pages/SubscriptionPage'
import SignUpPage from './pages/SignUpPage'
import ManagerDashboardPage from './pages/ManagerDashboardPage'
import AdminPanel from './pages/AdminPanel'
import EmployeeDashboardPage from './pages/EmployeeDashboardPage'
import CompanyRegisterPage from './pages/CompanyRegisterPage'
import MemberSettings from './pages/leftTabsPages/MemberSettings'

function RouterPage() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignInPage/>}/>
        <Route path='sign-up' element={<SignUpPage/>}/>
        <Route path='/subscription' element={<SubscriptionPage/>}/>
        <Route path='/manager-dashboard' element={<ManagerDashboardPage/>}/>
        <Route path='/admin-panel' element={<AdminPanel/>}/>
        <Route path='/employee-dashboard' element={<EmployeeDashboardPage/>}/>
        <Route path='/company-register' element={<CompanyRegisterPage/>}/>
        <Route path= '/member-settings' element={<MemberSettings/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default RouterPage