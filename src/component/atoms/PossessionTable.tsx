import { Button, Divider, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React, { useEffect } from 'react'
import { IPossession } from '../../models/IPossesion';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import Swal from 'sweetalert2';
import { fetchGetMyPossessions, fetchManagePossession } from '../../store/feature/possessionSlice';
import { render } from 'react-dom';

interface IPossesionTableProps{
    role: string
}

function PossessionTable(props: IPossesionTableProps) {
  const dispatch = useDispatch<MyDispatch>();
  const possessionList = MyUseSelector((store)=> store.possession.possessionList);
  useEffect(()=>{
      dispatch(fetchGetMyPossessions())
      console.log('possList: ', possessionList)
  },[props.role])
  

  

    const manageConfirmState = async (possessionId: string, confirmationState: string) => {
        const token = localStorage.getItem("token")
          dispatch(
            fetchManagePossession({
              agentToken: token? token: "",
              itemId: possessionId,
              updatedState: confirmationState
            })
          ).then(data=> {
            if(data.payload.code === 200){
              dispatch(fetchGetMyPossessions())
            }
          })
       
        }


    interface DataType {
        key: React.Key;
        possession: IPossession
      }
      
      const columns: TableColumnsType<DataType> = [
        props.role == "MANAGER"? { title: "Name", dataIndex: "possession", render: (possession: IPossession)=> possession.employeeName}:{},
        props.role == "MANAGER"? { title: "E-mail", dataIndex: "possession", render: (possession: IPossession)=> possession.employeeMail}:{},

        {
            title: "Title",
            dataIndex: 'possession',
            sorter: (a, b) => a.possession.title.localeCompare(b.possession.title),
            render: (possession: IPossession)=> possession.title
        },
          {
              title: 'Lending Date',
              dataIndex: 'possession',
              sorter: (a, b) => a.possession.lendingDate - b.possession.lendingDate,
              render: (possession: IPossession)=> new Date(possession.lendingDate).toLocaleDateString()
          },
          {
              title: 'Return Date',
              dataIndex: 'possession',
              sorter: (a, b) => a.possession.returnDate - b.possession.returnDate,
              render: (possession: IPossession)=> possession.returnDate?new Date(possession.returnDate).toLocaleDateString():<hr className='w-50' />
          },
          {
              title: 'Description',
              dataIndex: 'possession',
              render: (possession: IPossession) => possession.description,
          },
         
          {
            title: 'State',
            dataIndex: 'possession',
            render: (record: IPossession)=> <Tag color={record.confirmationState == "ACCEPTED"? 'green': (record.confirmationState == "REJECTED"? 'red': (record.confirmationState == "PENDING"? 'yellow': 'gray'))}>
            {record.confirmationState}
          </Tag>,
            filters:[
                {
                    text: "ACCEPTED",
                    value: "ACCEPTED"
                },
                {
                    text: "REJECTED",
                    value: "REJECTED"
                },{
                    text: "PENDING",
                    value: "PENDING"
                },
            ],
            onFilter: (value, record)=> record.possession.confirmationState.startsWith(value as string) 
        },
        props.role == "EMPLOYEE"
        ?
        {
            title: 'Actions',
            dataIndex: "possession",
            render: (record: IPossession) => record.confirmationState == "PENDING"? (
                <Space size="middle">
                  <Button
                    onClick={(evt) => manageConfirmState(record.id, "ACCEPTED")}
                    type="primary"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(evt) => manageConfirmState(record.id, "REJECTED")}
                    type="primary"
                    danger
                  >
                    Reject
                  </Button>
                </Space>
              ): <></>
        }
        :
        {}
      ];
      
      
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        
      };

    
    const possessionListSource = possessionList.map((possession, idx)=> {return(
        {
            possession: possession,
            key: idx
        }
    )})
    
    
  return (
    <Table<DataType> columns={columns} dataSource={possessionListSource} onChange={onChange} />

  ) 
  
}

export default PossessionTable