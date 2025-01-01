import React, { useEffect, useState } from 'react'
import LeftSideBar from '../../component/organisms/LeftSideBar';
import DashboardPageTopBar from '../../component/molecules/DashboardMolecules/DashboardPageTopBar';
import { Button, Space } from 'antd';
import {CloseCircleOutlined, EditOutlined, SaveOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchEditComment, fetchGetComment } from '../../store/feature/commentSlice';
import LeaveTable from '../../component/atoms/LeaveTable';
import { fetchGetLeavesByManager } from '../../store/feature/leaveSlice';
import Icon from '@ant-design/icons/lib/components/Icon';

function CompanyComment() {
    const dispatch = useDispatch<MyDispatch>();
    const storedComment = MyUseSelector((store)=> store.comment);
    const comment = storedComment.comment
      const token = localStorage.getItem("token");
      const [textAreaComment, setTextAreaComment] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(()=>{
        dispatch(fetchGetComment())
    },[])

    useEffect(()=>{
      setTextAreaComment(comment.comment)
    },[storedComment, isDisabled])

    const saveComment = ()=>{
      const token = localStorage.getItem("token");
      dispatch(fetchEditComment({
        token: token?token:"",
        comment: textAreaComment,
        commentId: comment.id
      }))
      setIsDisabled(!isDisabled)
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
                <h1 className="manager-dashboard-header">Company Comment</h1>
              </div>
              <div className="row" style={{height: "600px"}}>
                
                <div className="col-9 d-flex justify-content-end mt-5">
                  <textarea disabled={isDisabled} placeholder={isDisabled?textAreaComment:''} value={isDisabled?'':textAreaComment} onChange={(evt)=>setTextAreaComment(evt.target.value)} className="form-control w-75" style={{minHeight: '35%'}} ></textarea>
                </div>
                <div className='col-3 d-flex justify-content-start mt-5'>
                  <Space direction='vertical' >
                    <Button icon={<EditOutlined/>} style={{backgroundColor: isDisabled?'white':'rgb(20, 20, 120)', color: isDisabled?'':'white'}} shape='circle' onClick={()=>setIsDisabled(!isDisabled)} />
                    <Button icon={<SaveOutlined />} style={{backgroundColor: isDisabled?'gray':'rgb(20, 120, 20)', color: isDisabled?'':'white'}} shape='circle' disabled={isDisabled} onClick={(evt)=>saveComment()} />
                    <Button icon={<CloseCircleOutlined />} style={{backgroundColor: isDisabled?'gray':'rgb(120, 20, 20)', color: isDisabled?'':'white'}} shape='circle' onClick={(evt)=> setTextAreaComment(comment.comment) }  disabled={isDisabled}   />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CompanyComment