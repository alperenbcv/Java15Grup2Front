import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { ILeave } from '../../models/ILeave';
import { render } from 'react-dom';
import { useDispatch } from 'react-redux';
import { MyDispatch } from '../../store';
import Swal from 'sweetalert2';
import { fetchGetLeavesByManager, fetchManageState } from '../../store/feature/leaveSlice';




interface ILeaveTableProps{
    leaveList: ILeave[]
}

function LeaveTable(props: ILeaveTableProps) {
    const dispatch = useDispatch<MyDispatch>();

const manageState = async (leaveId: string | undefined, state: string) => {
    if (state == "REJECTED") {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: true,
      });
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      dispatch(
        fetchManageState({
          token: token ? token : "token",
          leaveId: leaveId,
          state: state,
          rejectionReason: text,
        })
      ).then(data=>{
        if (data.payload.code === 200){
          dispatch(fetchGetLeavesByManager())
        }
      })
    } else {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      dispatch(
        fetchManageState({
          token: token ? token : "token",
          leaveId: leaveId,
          state: state,
        })
      ).then(data=>{
        if (data.payload.code === 200){
          dispatch(fetchGetLeavesByManager())
        }
      })
    }
  };

    interface DataType {
        key: React.Key;
        leave: ILeave
      }
      
      const columns: TableColumnsType<DataType> = [
          {
              title: 'Start Date',
              dataIndex: 'leave',
              sorter: (a, b) => a.leave.startDate - b.leave.startDate,
              render: (leave: ILeave)=> new Date(leave.startDate).toLocaleDateString()
          },
          {
              title: 'End Date',
              dataIndex: 'leave',
              sorter: (a, b) => a.leave.endDate - b.leave.endDate,
              render: (leave: ILeave)=> new Date(leave.endDate).toLocaleDateString()
          },
          {
              title: 'Description',
              dataIndex: 'leave',
              render: (leave: ILeave) => leave.description,
          },
          {
              title: 'Leave Type',
              dataIndex: 'leave',
              render: (leave: ILeave) => leave.leaveType,
              filters: [
                  {
                      text: "ANNUAL LEAVE",
                      value: "ANNUAL_LEAVE"
                  },
                  {
                      text: "SICK_LEAVE",
                      value: "SICK_LEAVE"
                  },
                  {
                      text: "MATERNITY_LEAVE",
                      value: "MATERNITY_LEAVE"
                  },
                  {
                      text: "PATERNITY_LEAVE",
                      value: "PATERNITY_LEAVE"
                  },
                  {
                      text: "UNPAID_LEAVE",
                      value: "UNPAID_LEAVE"
                  },
                  {
                      text: "COMPASSIONATE_LEAVE",
                      value: "COMPASSIONATE_LEAVE"
                  },
                  {
                      text: "STUDY_LEAVE",
                      value: "STUDY_LEAVE"
                  },
                  {
                      text: "EMERGENCY_LEAVE",
                      value: "EMERGENCY_LEAVE"
                  },
                  {
                      text: "SABBATICAL_LEAVE",
                      value: "SABBATICAL_LEAVE"
                  },
                  {
                      text: "PUBLIC_HOLIDAY",
                      value: "PUBLIC_HOLIDAY"
                  },
                  {
                      text: "CASUAL_LEAVE",
                      value: "CASUAL_LEAVE"
                  },
                  {
                      text: "COMPENSATORY_LEAVE",
                      value: "COMPENSATORY_LEAVE"
                  },
                  {
                      text: "MARRIAGE_LEAVE",
                      value: "MARRIAGE_LEAVE"
                  },
                  {
                      text: "ADOPTION_LEAVE",
                      value: "ADOPTION_LEAVE"
                  },
                  {
                      text: "MILITARY_LEAVE",
                      value: "MILITARY_LEAVE"
                  }
              ],
              onFilter: (value, record) => record.leave.leaveType.startsWith(value as string),
              filterSearch: true
          },
          {
            title: 'State',
            dataIndex: 'leave',
            render: (record: ILeave)=> <Tag color={record.state == "ACCEPTED"? 'green': (record.state == "REJECTED"? 'red': (record.state == "PENDING"? 'yellow': 'gray'))}>
            {record.state}
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
            onFilter: (value, record)=> record.leave.state.startsWith(value as string) 
        },
        {
            title: 'Actions',
            dataIndex: "leave",
            render: (record: ILeave) => record.state == "PENDING"? (
                <Space size="middle">
                  <Button
                    onClick={(evt) => manageState(record.leaveId, "ACCEPTED")}
                    type="primary"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(evt) => manageState(record.leaveId, "REJECTED")}
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

    const leaveList = props.leaveList;
    const leaveListSource = leaveList.map((leave, idx)=> {return(
        {
            leave: leave,
            key: idx
        }
    )})
    console.log(leaveListSource)
    
    
  return (
    <Table<DataType> columns={columns} dataSource={leaveListSource} onChange={onChange} />

  )
}

export default LeaveTable;
