import React from 'react'
import { IVisitorComment } from '../../models/IVisitorComment'
import { Avatar, Card, Space } from 'antd'
import './CommentCard.css'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../../store'
import { fetchManagerByCommentId } from '../../store/feature/userSlice'
import { fetchCompanyByComment } from '../../store/feature/companySlice'
import { useNavigate } from 'react-router-dom'
import { setComment } from '../../store/feature/commentSlice'

interface ICommentCardProps{
    visitorComment: IVisitorComment
}

function CommentCard(props: ICommentCardProps) {
    const dispatch = useDispatch<MyDispatch>();
    const navigate = useNavigate();
    const visitorComment = props.visitorComment
    const commentId = visitorComment.comment.id;
    const { Meta } = Card;

  const viewInDetail = ()=>{
    setComment(visitorComment.comment.comment)
    dispatch(fetchManagerByCommentId(commentId))
    dispatch(fetchCompanyByComment(commentId))
    navigate("/comment-detail")
  }

  return (
    <div className="card-container">
        
      <Card  onClick={viewInDetail} className='custom-card'
        hoverable
        style={{ width: 1000, height: 200, overflow: 'hidden', paddingLeft: 0}}
      >
        <Meta avatar={<Avatar src={visitorComment.companyLogoUrl} style={{height:'180px', width: '180px', borderRadius: '50%'}} />} title={visitorComment.managerName + '/ ' + visitorComment.companyName}  description= {visitorComment.comment.comment} />
      </Card>
    </div>
  )
}

export default CommentCard