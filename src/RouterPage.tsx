import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SignUpPage from "./pages/SignUpPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import AdminPanel from "./pages/AdminPanel";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import CompanyRegisterPage from "./pages/CompanyRegisterPage";
import MemberSettings from "./pages/leftTabsPages/MemberSettings";
import { MyDispatch, MyUseSelector } from "./store";
import { useDispatch } from "react-redux";
import { fetchGetProfile, userLogin } from "./store/feature/userSlice";
import ManagePersonnel from "./pages/leftTabsPages/ManagerPersonnel";
import LeavePage from "./pages/leftTabsPages/LeavePage";
import ManageLeavesPage from "./pages/leftTabsPages/ManageLeavesPage";
import ManageCompanies from "./pages/leftTabsPages/ManageCompanies";
import PossessionPage from "./pages/leftTabsPages/PossessionPage";
import ManageExpense from "./pages/leftTabsPages/ManageExpense";
import CompanyComment from "./pages/leftTabsPages/CompanyComment";
import Comments from "./pages/Comments";
import CommentDetail from "./pages/CommentDetail";

function RouterPage() {
  const dispatch = useDispatch<MyDispatch>();
  const isLogin = MyUseSelector((state) => state.user.isAuth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userLogin());
      dispatch(fetchGetProfile());
    }
  },[]);
  return (
    <BrowserRouter future={{v7_relativeSplatPath: true}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/manager-dashboard" element={isLogin?<ManagerDashboardPage />:<SignInPage/>} />
        <Route path="/admin-panel" element={isLogin?<AdminPanel />:<SignInPage/>} />
        <Route path="/employee-dashboard" element={isLogin?<EmployeeDashboardPage />:<SignInPage/>} />
        <Route path="/company-register" element={<CompanyRegisterPage />} />
        <Route path="/member-settings" element={isLogin?<MemberSettings />:<SignInPage/>} />
        <Route path="/manage-personnel" element={isLogin?<ManagePersonnel />:<SignInPage/>} />
        <Route path="/leave" element={isLogin?<LeavePage/>:<SignInPage/>}/>
        <Route path="/manage-leaves" element={isLogin?<ManageLeavesPage/>:<SignInPage/>}/>
        <Route path="/companies" element={isLogin?<ManageCompanies/>:<SignInPage/>}/>
        <Route path="/possession" element={isLogin?<PossessionPage/>:<SignInPage/>}/>
        <Route path="/expense" element={isLogin?<ManageExpense/>:<SignInPage/>}/>
        <Route path="/company-comment" element={isLogin?<CompanyComment/>:<SignInPage/>}/>
        <Route path="/comments" element={<Comments/>}/>
        <Route path="/comment-detail" element={<CommentDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
