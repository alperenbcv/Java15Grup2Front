import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../../store'
import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import Swal from 'sweetalert2';
import { fetchAddExpense, fetchGetMyEmployeesExpenses, fetchGetMyExpenses, fetchManageExpense, fetchUploadFile } from '../../store/feature/expenseSlice';
import { IExpense } from '../../models/IExpense';
import { FileImageOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons';



function ExpenseTable() {
  const user = MyUseSelector((store)=> store.user.user)
  const role = user.role
    const dispatch = useDispatch<MyDispatch>();
    useEffect(()=>{
        if (role == "EMPLOYEE")
            dispatch(fetchGetMyExpenses())
        else if (role == "MANAGER")
            dispatch(fetchGetMyEmployeesExpenses())
    },[])
    const expenseTable = MyUseSelector((store)=> store.expense.expenseList)

    const expenseTableSource = expenseTable.map((expense, idx)=> {
        return(
        {
            expense: expense,
            key: idx
        }
    )})
  const manageState = async (leaveId: string | undefined, state: string) => {
      if (role == "MANAGER"){
        const token = localStorage.getItem("token");
            dispatch(
                fetchManageExpense({
                  agentToken: token ? token : "token",
                  itemId: leaveId?leaveId:'',
                  updatedState: state,
                })).then(data=>{
                  if(data.payload.success === true){
                    dispatch(fetchGetMyEmployeesExpenses());
                  }
                })
      }
    };

    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "IMAGE": "Image",
            "PDF": "Pdf"
          });
        }, 1000);
      });
    const addFile = async (expense: IExpense)=>{
        const {value: type} = await Swal.fire({
            title: "Choose File Type",
            input: "radio",
            inputOptions,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                  return "You need to choose something!";
                }
              }

        })

        if (type == undefined) return

        const  {value: file} = await Swal.fire({
            title: "Upload File",
            input: "file",
            showCancelButton: true,
            confirmButtonText: 'Upload',
            inputAttributes: {
                "aria-label": "Upload your file"
            }
        });
        console.log(type)
        if (file){
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", file);
            formData.append("expenseId", expense.id);
            formData.append("token", token?token:"");
            formData.append("type", type)
            dispatch(fetchUploadFile(formData)).then(data=>{
                if (data.payload.code === 200){
                    dispatch(fetchGetMyExpenses())
                }
            })
            
        }
    }
  
      interface DataType {
          key: React.Key;
          expense: IExpense
        }
        
        const columns: TableColumnsType<DataType> = [
            role == "MANAGER"? {
                title: 'Employee Name',
                dataIndex: 'expense',
                render: (expense: IExpense)=> expense.employeeName
            }:{}
            ,
            {
                title: 'Expense Date',
                dataIndex: 'expense',
                sorter: (a, b) => a.expense.expenseDate - b.expense.expenseDate,
                render: (expense: IExpense)=> new Date(expense.expenseDate).toLocaleDateString()
            },
            {
                title: 'Title',
                dataIndex: 'expense',
                render: (expense: IExpense)=> expense.title ,
                sorter: (a, b) => a.expense.title.localeCompare(b.expense.title)
                
            },
            {
                title: 'Description',
                dataIndex: 'expense',
                render: (expense: IExpense) => expense.description,
            },{
                title: 'State',
                dataIndex: 'expense',
                render: (record: IExpense)=> <Tag color={record.expenseState == "ACCEPTED"? 'green': (record.expenseState == "REJECTED"? 'red': (record.expenseState == "PENDING"? 'yellow': 'gray'))}>
                {record.expenseState}
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
                onFilter: (value, record)=> record.expense.expenseState.startsWith(value as string) 
            },
            {
                title: "Files",
                dataIndex: "expense",
                 render: (record: IExpense) => (<Space size="middle" direction='horizontal'>
                    {record.imageUrl?(<Button onClick={(evt)=>window.open(record.imageUrl, '_blank')} size='large' type='primary' icon={<FileImageOutlined />}></Button>):<Button size='large' type='dashed' icon={<FileImageOutlined/>} disabled></Button> }
                    {record.fileUrl?(<Button onClick={(evt)=>window.open(record.fileUrl, '_blank')} size='large' type='primary' icon={<FilePdfOutlined />}></Button>):<Button size='large' type='dashed' icon={<FilePdfOutlined />} disabled></Button> }
                    {role == "EMPLOYEE" && record.expenseState == "PENDING"?<Button style={{backgroundColor: 'green', color: 'white'}} onClick={(evt)=>addFile(record)} icon={<PlusOutlined />} type='link' ></Button>:<></>}
                    </Space>)
                 
            }, 
            role == "MANAGER"?
            {
                        title: 'Actions',
                        dataIndex: "expense",
                        render: (record: IExpense) => record.expenseState == "PENDING"? (
                            <Space size="middle">
                              <Button
                                onClick={(evt) => manageState(record.id, "ACCEPTED")}
                                type="primary"
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={(evt) => manageState(record.id, "REJECTED")}
                                type="primary"
                                danger
                              >
                                Reject
                              </Button>
                            </Space>
                          ): <></>
                    }: {}
          ];
          
          
          
          const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
            
          };
    
        
        
        console.log(expenseTableSource)
      return (
        <Table<DataType> columns={columns} dataSource={expenseTableSource} onChange={onChange} />
    
      )
}

export default ExpenseTable