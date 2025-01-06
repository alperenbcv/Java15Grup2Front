import { Button, Input, InputRef, Space, Table, TableColumnsType, TableColumnType, TableProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { MyDispatch, MyUseSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGetMyEmployees } from '../../store/feature/userSlice';
import Swal from 'sweetalert2';
import { IProfile } from '../../models/IProfile';
import { ColumnFilterItem, FilterDropdownProps } from 'antd/es/table/interface';
import { FilePdfOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { fetchGetFiles, fetchUploadPersonnelFile } from '../../store/feature/personnelFileSlice';
import { IPersonnelFile } from '../../models/IPersonnelFile';
import { text } from 'stream/consumers';

function PersonnelFileTable() {
     const openPdf = async (fileUrl: string| undefined)=>{
    
          const response = await fetch(fileUrl?fileUrl:"");
          if (!response.ok){
            Swal.fire({
              title: 'Unable to fetch pdf file',
              icon:'error'
            })
            return
          }
          else {
            const blob = await response.blob();
    
            const pdfUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pdfUrl;
    
            a.download = 'expensePdf.pdf'
    
            document.body.appendChild(a);
            a.click()
            document.body.removeChild(a);
    
            window.URL.revokeObjectURL(pdfUrl);
          }
        }
    const uploadNewFile = async (oldFile: IPersonnelFile)=>{
        const  {value: file} = await Swal.fire({
                    title: "Upload New File",
                    input: "file",
                    showCancelButton: true,
                    confirmButtonText: 'Upload',
                    inputAttributes: {
                        "aria-label": "Upload your file"
                    }
                });
            if (file){
                const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append("token", token?token:"")
                formData.append("file", file)
                formData.append("personnelName", oldFile.personnelName)
                formData.append("personnelId", oldFile.personnelId)
                formData.append("fileType", oldFile.fileType)
                formData.append("fileName", oldFile.fileName)
                formData.append("oldFileId", oldFile.id)

                dispatch(fetchUploadPersonnelFile(formData)).then(data=>{
                    if (data.payload.code === 200){
                        dispatch(fetchGetFiles())
                    }
                })
            }

    }

    const navigate = useNavigate();
    
    const dispatch = useDispatch<MyDispatch>();
    useEffect(()=>{
        if (role == "MANAGER"){
        dispatch(fetchGetFiles())
        }
        else navigate("/manager-dashboard")
    },[])
    const personnelFileList = MyUseSelector((store)=> store.personnelFile.personnelFileList)
    const role = MyUseSelector((store)=> store.user.user.role)
  
      const personnelFileListSource = personnelFileList.map((personnelFile, idx)=> {
          return(
          {
              personnelFile: personnelFile,
              key: idx
          }
      )})
    
      const filter: ColumnFilterItem[] = personnelFileList.map(file=> {
        return(
            {
                text: file.fileType,
                value: file.fileType
            }
        )
      })

        interface DataType {
            key: React.Key;
            personnelFile: IPersonnelFile
          }

         

          const columns: TableColumnsType<DataType> = [
            
              {
                  title: 'Personnel Name',
                  dataIndex: 'personnelFile',
                  render: (personnelFile: IPersonnelFile) => personnelFile.personnelName,
                  sorter: (a, b)=> a.personnelFile.personnelName.localeCompare(b.personnelFile.personnelName)
              },
              {
                  title: 'File Name',
                  dataIndex: 'personnelFile',
                  render: (personnelFile: IPersonnelFile) => personnelFile.fileName,
                  sorter: (a, b)=> a.personnelFile.fileName.localeCompare(b.personnelFile.fileName)
              }
              ,
              {
                  title: 'File Type',
                  dataIndex: ['personnelFile', 'fileType'],
                  filters: filter,
                  filterMode: 'menu',
                  onFilter: (value, record) => record.personnelFile.fileType.startsWith(value as string)
                  
              },
              {
                  title: 'File',
                  dataIndex: 'personnelFile',
                  render: (personnelFile: IPersonnelFile) => (<Space>
                    <Button onClick={(evt)=>openPdf(personnelFile.fileUrl)} size='large' type='primary' icon={<FilePdfOutlined />}></Button> 
                    <Button onClick={()=>uploadNewFile(personnelFile)} size='large' type='default' style={{backgroundColor:'orange', color:'white'}} icon={<UndoOutlined />} ></Button> 
                    </Space>  )             
              },{
                  title: 'Upload Date',
                  dataIndex: 'personnelFile',
                  render: (personnelFile: IPersonnelFile) =>new Date(personnelFile.uploadDate).toLocaleString(),
                  sorter: (a, b)=> a.personnelFile.uploadDate - b.personnelFile.uploadDate
              }
            ];
            
            
            
            const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
              console.log('params', pagination, filters, sorter, extra);
              
            };
      
          
          
        return (
          <Table<DataType> columns={columns} dataSource={personnelFileListSource} onChange={onChange} />
      
        )
}


export default PersonnelFileTable