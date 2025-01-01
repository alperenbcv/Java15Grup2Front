import React from 'react'
import { IVisitorComment } from '../../models/IVisitorComment'
import { Avatar, Card, Space } from 'antd'
import './CommentCard.css'

interface ICommentCardProps{
    visitorComment: IVisitorComment
}

function CommentCard(props: ICommentCardProps) {
    const visitorComment = props.visitorComment
    const { Meta } = Card;
  return (
    <div className="card-container">
        
      <Card className='custom-card'
        hoverable
        style={{ width: 1000, height: 200, overflow: 'hidden', paddingLeft: 0}}
      >
        <Meta avatar={<Avatar src={visitorComment.companyLogoUrl} style={{height:'180px', width: '180px', borderRadius: '50%'}} />} title={visitorComment.managerName + '/ ' + visitorComment.companyName}  description= {visitorComment.comment.comment} />
      </Card>
    </div>
  )
}

export default CommentCard