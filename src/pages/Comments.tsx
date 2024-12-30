import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../store'
import { fetchGetAllComments } from '../store/feature/commentSlice';

function Comments() {
    const dispatch = useDispatch<MyDispatch>();
    const commentList = MyUseSelector((store)=> store.comment.commentList);

    useEffect(()=>{
        dispatch(fetchGetAllComments())
        console.log(commentList)

    },[])

  return (
    <div>
       {commentList.map(comment=> <p>{comment.comment}</p>)}
    </div>
  )
}

export default Comments