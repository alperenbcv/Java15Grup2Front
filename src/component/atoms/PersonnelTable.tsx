import { Button, Input, InputRef, Select, Space, Table, TableColumnsType, TableColumnType, TableProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { MyDispatch, MyUseSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGetMyEmployees } from '../../store/feature/userSlice';
import Swal from 'sweetalert2';
import { IProfile } from '../../models/IProfile';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

function PersonnelTable() {
    const user = MyUseSelector((store)=> store.user.user)
    const employeeList = MyUseSelector((store)=> store.user.userList)
    const navigate = useNavigate();
    const role = user.role
    const dispatch = useDispatch<MyDispatch>();
    useEffect(()=>{
        if (user.role == "MANAGER"){
        dispatch(fetchGetMyEmployees())
        }
        else navigate("/manager-dashboard")
    },[])
  
      const employeeListSource = employeeList.map((employee, idx)=> {
          return(
          {
              employee: employee,
              key: idx
          }
      )})
    
      
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef<InputRef>(null);
      
        const handleSearch = (
          selectedKeys: string[],
          confirm: FilterDropdownProps['confirm'],
          dataIndex: DataIndex,
        ) => {
          confirm();
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
        };
      
        const handleReset = (clearFilters: () => void) => {
          clearFilters();
          setSearchText('');
        };
      

        interface DataType {
            key: React.Key;
            employee: IProfile
          }
          type DataIndex = keyof DataType;
const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
          const columns: TableColumnsType<DataType> = [
            
              {
                  title: 'Profile Picture',
                  dataIndex: 'employee',
                  render: (employee: IProfile) =><img alt='profile picture' style={{width: '80%', borderRadius: '50%', aspectRatio: 1/1, objectFit: 'cover'}} src={employee.pictureUrl?employee.pictureUrl:"https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"} />,
                  width: 100
              },
              {
                  title: 'Employee Name',
                  dataIndex: 'employee',
                  render: (employee: IProfile)=> employee.name + ' ' + employee.surname,
                  sorter: (a, b)=> a.employee.name.localeCompare(b.employee.name),
              }
              ,
              {
                  title: 'E-mail',
                  dataIndex: 'employee',
                  render: (employee: IProfile)=> employee.email,
                
                
              },
              {
                  title: 'Phone Number',
                  dataIndex: 'employee',
                  render: (employee: IProfile)=> employee.phoneNumber,                  
              },{
                  title: 'Address',
                  dataIndex: 'employee',
                  render: (employee: IProfile)=> employee.address
              },
              {
                  title: "Gender",
                  dataIndex: "employee",
                   render: (employee: IProfile) => employee.gender
                   
              }, 
              
              {
                  title: 'Title',
                  dataIndex: "employee",
                  render: (employee: IProfile) => employee.title
              },
              {
                title: "Department",
                dataIndex: "employee",
                render: (employee: IProfile) => employee.department
              }
            ];
            
            
            
            const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
              console.log('params', pagination, filters, sorter, extra);
              
            };
      
          
          
          console.log(employeeListSource)
        return (
          <Table<DataType> columns={columns} dataSource={employeeListSource} onChange={onChange} />
      
        )
}


export default PersonnelTable