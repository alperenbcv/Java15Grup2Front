import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React from 'react'
import { IPossession } from '../../models/IPossesion';
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../store';
import Swal from 'sweetalert2';
import { fetchManagePossession } from '../../store/feature/possessionSlice';
import { render } from 'react-dom';

interface IPossesionTableProps{
    possessionList: IPossession[],
    role: string
}

function PossessionTable(props: IPossesionTableProps) {
    const dispatch = useDispatch<MyDispatch>();

    const manageConfirmState = async (possessionId: string, confirmationState: string) => {
        const token = localStorage.getItem("token")
          dispatch(
            fetchManagePossession({
              agentToken: token? token: "",
              itemId: possessionId,
              updatedState: confirmationState
            })
          );
       
        }


    interface DataType {
        key: React.Key;
        possession: IPossession
      }
      
      const columns: TableColumnsType<DataType> = [
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
              render: (possession: IPossession)=> new Date(possession.returnDate).toLocaleDateString()
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
        {
            title: 'Actions',
            dataIndex: "leave",
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
      ];
      
      
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        
      };

    const possessionList = props.possessionList;
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