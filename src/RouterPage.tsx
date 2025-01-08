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
import ActivationPage from './pages/ActivationPage'
import ManagerEmployeeOpsPage from './pages/ManagerEmployeeOpsPage'
import EmployeeActivationPage from './pages/EmployeeActivationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage'
import ManagerShiftOperations from './pages/ManagerShiftOperations'
import EmployeeShifts from './pages/EmployeeShifts'

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
        <Route path='/activate' element={<ActivationPage/>}/>
        <Route path='/employee-ops' element={<ManagerEmployeeOpsPage/>}/>
        <Route path = '/activate-employee' element={<EmployeeActivationPage/>}/>
        <Route path = '/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path = '/password-recovery' element={<PasswordRecoveryPage/>}/>
        <Route path = '/shift-ops' element={<ManagerShiftOperations/>}/>
        <Route path = '/emp-shifts' element={<EmployeeShifts/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default RouterPage