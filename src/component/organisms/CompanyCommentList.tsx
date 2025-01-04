import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchGetAllComments } from '../../store/feature/commentSlice';
import CommentCard from '../atoms/CommentCard';
import { Flex } from 'antd';

function CompanyCommentList() {
    const dispatch = useDispatch<MyDispatch>();
    const commentList = MyUseSelector((store)=> store.comment.commentList);
    
        useEffect(()=>{
            dispatch(fetchGetAllComments())    
        },[])
    return (
        <div className='left-body'>
            <Flex gap="middle" align="start" vertical
            style={{overflowY: 'auto'}}>
                {commentList.map(comment=> <CommentCard visitorComment={comment} />)}
            </Flex>
        </div>
    );
  }
  
  export default CompanyCommentList;