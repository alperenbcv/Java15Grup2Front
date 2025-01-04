import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../store'
import { fetchManagerByCommentId } from '../store/feature/userSlice';
import { fetchCompanyByComment } from '../store/feature/companySlice';
import HomePageHeaderLogo from '../component/molecules/HomePageMolecules/HomePageHeaderLogo';
import HomePageHeaderMenu from '../component/molecules/HomePageMolecules/HomePageHeaderMenu';
import HomePageHeaderButtons from '../component/molecules/HomePageMolecules/HomePageHeaderButtons';
import HomePageBody from '../component/molecules/HomePageMolecules/HomePageBody';
import { Card, Flex, Space } from 'antd';
import '../component/molecules/HomePageMolecules/HomePageBody.css'



function CommentDetail() {
    const manager = MyUseSelector((store)=> store.user.user)
    const company = MyUseSelector((store)=> store.company.company)
    const comment = MyUseSelector((store)=> store.comment.comment.comment)
    const { Meta } = Card;

    
  return (
    <div
      className="container-fluid"
      style={{
        background: 'black',
        color: 'white',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Header Bölgesi */}
      <div className="row align-items-center">
        <HomePageHeaderLogo />
        <HomePageHeaderMenu/>
        <HomePageHeaderButtons />
      </div>

      {/* Body Bölgesi */}
      <div className="row alternate-body" style={{ display: 'flex', alignItems: 'center'}}>
        
          <div className="col-4">
            <Card style={{width:'100%'}} cover={<img alt="company logo" src={company.companyLogoUrl}  />}>
                <Meta  title="Name" /> {company.companyName}
                <Meta  title="Address" /> {company.companyAddress}
                <Meta  title="E-Mail" /> {company.companyMail}
                <Meta  title="Website" /> {company.companyWebSite}
                <Meta  title="Employee Count" /> {company.employeeCount}
                <Meta  title="Established Date" /> {new Date(company.establishedDate).toLocaleDateString()}
                <Meta  title="Industry" /> {company.industry}
              </Card >
          </div>
            
            <div className="col-4">
               <Card style={{width:'100%'}}>
                <p>
                  {comment}
                </p>
              </Card>
             </div>
             <div className="col-4">
             <Card style={{width:'100%'}} cover={<img style={{maxHeight:'400px', objectFit:'cover', objectPosition:'center'}} alt="company logo" src={manager.pictureUrl}  />}>
                <Meta  title="Name" /> {manager.name + ' ' + manager.surname}
                <Meta  title="Address" /> {company.companyAddress}
                <Meta  title="E-Mail" /> {manager.email}
                <Meta  title="Phone Number" /> {manager.phoneNumber}
                <Meta  title="Title" /> {manager.title}
              </Card >
             </div>
             
              
      </div>
    </div>
  );
}

export default CommentDetail