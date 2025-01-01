import React from 'react'
import { useDispatch } from 'react-redux'
import { MyDispatch, MyUseSelector } from '../../store'
import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import Swal from 'sweetalert2';
import { fetchManageExpense } from '../../store/feature/expenseSlice';
import { IExpense } from '../../models/IExpense';

interface IExpenseTableProps{
    role: string
}

function ExpenseTable(props: IExpenseTableProps) {
    const dispatch = useDispatch<MyDispatch>();
    const expenseTable = MyUseSelector((store)=> store.expense.expenseList)

    const expenseTableSource = expenseTable.map((expense, idx)=> {return(
        {
            expense: expense,
            key: idx
        }
    )})
  const manageState = async (leaveId: string | undefined, state: string) => {
      if (props.role == "MANAGER"){
        const token = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : "";
            dispatch(
                fetchManageExpense({
                  agentToken: token ? token : "token",
                  itemId: leaveId?leaveId:'',
                  updatedState: state,
                }))
      }
    };
  
      interface DataType {
          key: React.Key;
          expense: IExpense
        }
        
        const columns: TableColumnsType<DataType> = [
            {
                title: 'Expense Date',
                dataIndex: 'expense',
                sorter: (a, b) => a.expense.expenseDate - b.expense.expenseDate,
                render: (expense: IExpense)=> new Date(expense.expenseDate).toLocaleDateString()
            },
            {
                title: 'Title',
                dataIndex: 'expense',
                render: (expense: IExpense)=> expense.title 
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
          ];
          
          
          
          const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
            
          };
    
        
        
        
      return (
        <Table<DataType> columns={columns} dataSource={expenseTableSource} onChange={onChange} />
    
      )
}

export default ExpenseTable