import {
  Button,
  Input,
  InputRef,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
  TableProps,
  Tag,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { MyDispatch, MyUseSelector } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAlterAccountActivation,
  fetchDeactivateEmployee,
  fetchGetMyEmployees,
} from "../../store/feature/userSlice";
import Swal from "sweetalert2";
import { IProfile } from "../../models/IProfile";
import { FilterDropdownProps } from "antd/es/table/interface";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import EmployeeDetailsChart from "../molecules/ManagerCharts/EmployeeDetailsChart";
import {
  fetchAddNewPersonnelFile,
  fetchUploadPersonnelFile,
} from "../../store/feature/personnelFileSlice";

function PersonnelTable() {
  const user = MyUseSelector((store) => store.user.user);
  const employeeList = MyUseSelector((store) => store.user.userList);
  const navigate = useNavigate();
  const role = user.role;
  const [isAddPersonnelFile, setIsAddPersonnelFile] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [employee, setEmployee] = useState<IProfile>();
  const dispatch = useDispatch<MyDispatch>();
  useEffect(() => {
    if (user.role == "MANAGER") {
      dispatch(fetchGetMyEmployees());
    }
  }, [role]);

  const deActivate = (email: string) => {
    const token = localStorage.getItem("token");
    dispatch(
      fetchDeactivateEmployee({
        token: token ? token : "",
        employeeEmail: email,
      })
    ).then((data) => {
      if (data.payload.code === 200) {
        dispatch(fetchGetMyEmployees());
      }
    });
  };

  const addPersonnelFile = async () => {
    const { value: file } = await Swal.fire({
      title: "Upload File",
      input: "file",
      showCancelButton: true,
      confirmButtonText: "Upload",
      inputAttributes: {
        "aria-label": "Upload your file",
      },
    });
    if (file && employee) {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const personnelName = employee.name + " " + employee.surname;
      const personnelMail = employee.email;

      formData.append("fileType", fileType);
      formData.append("fileName", fileName);
      formData.append("personnelName", personnelName);
      formData.append("personnelMail", personnelMail);
      formData.append("file", file);
      formData.append("token", token ? token : "");

      dispatch(fetchAddNewPersonnelFile(formData));
    }
  };

  const alterAccountActivation = (employee: IProfile) => {
    const token = localStorage.getItem("token");

    dispatch(
      fetchAlterAccountActivation({
        token: token ? token : "",
        employeeMail: employee.email,
      })
    ).then((data) => {
      if (data.payload.code == 200) {
        dispatch(fetchGetMyEmployees());
      }
    });
  };

  const addPossession = (email: string) => {};

  const employeeListSource = employeeList.map((employee, idx) => {
    return {
      employee: employee,
      key: idx,
    };
  });

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  interface DataType {
    key: React.Key;
    employee: IProfile;
  }
  type DataIndex = keyof DataType;
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: TableColumnsType<DataType> = [
    {
      title: "Profile Picture",
      dataIndex: "employee",
      render: (employee: IProfile) => (
        <img
          alt="profile picture"
          style={{
            width: "80%",
            borderRadius: "50%",
            aspectRatio: 1 / 1,
            objectFit: "cover",
          }}
          src={
            employee.pictureUrl
              ? employee.pictureUrl
              : "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"
          }
        />
      ),
      width: 100,
    },
    {
      title: "Employee Name",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.name + " " + employee.surname,
      sorter: (a, b) => a.employee.name.localeCompare(b.employee.name),
    },
    {
      title: "E-mail",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.email,
    },
    {
      title: "Phone Number",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.phoneNumber,
    },
    {
      title: "Address",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.address,
    },
    {
      title: "Gender",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.gender,
    },

    {
      title: "Title",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.title,
    },
    {
      title: "Department",
      dataIndex: "employee",
      render: (employee: IProfile) => employee.department,
    },
    {
      title: "Delete",
      dataIndex: "employee",
      render: (employee: IProfile) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="danger"
            variant="solid"
            icon={<DeleteOutlined />}
            onClick={(evt) => deActivate(employee.email)}
          />
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "employee",
      render: (employee: IProfile) => (
        <Space direction="horizontal">
          <Tag color={employee.accountActive ? "green" : "red"}>
            {employee.accountActive ? "ACTIVE" : "DEACTIVATED"}
          </Tag>
          <Button
            onClick={(evt) => alterAccountActivation(employee)}
            color={employee.accountActive ? "red" : "green"}
            variant="solid"
          >
            {employee.accountActive ? "DEACTIVATE" : "ACTIVATE"}
          </Button>
        </Space>
      ),
      filters: [
        {
          text: "ACTIVE",
          value: true,
        },
        {
          text: "DEACTIVATED",
          value: false,
        },
      ],
      onFilter: (value, record) => record.employee.accountActive != value,
    },
    {
      title: "Add Personnel File",
      dataIndex: "employee",
      render: (employee: IProfile) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="cyan"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={(evt) => {
              setEmployee(employee);
              setIsAddPersonnelFile(true);
            }}
          />
        </div>
      ),
    },
    {
      title: "Add Possession",
      dataIndex: "employee",
      render: (employee: IProfile) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="volcano"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={(evt) => addPossession(employee.email)}
          />
        </div>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  console.log(employeeListSource);
  return (
    <div>
      <Modal
        open={isAddPersonnelFile}
        onCancel={() => setIsAddPersonnelFile(false)}
        onOk={() => addPersonnelFile()}
        okText="Add Personnel File"
      >
        <Space direction="vertical">
          <label htmlFor="fileType">File Type</label>
          <Input
            id="fileType"
            placeholder="file type"
            value={fileType}
            onChange={(evt) => {
              setFileType(evt.target.value);
            }}
          />
          <label htmlFor="fileName">File Name</label>
          <Input
            id="fileName"
            placeholder="file name"
            value={fileName}
            onChange={(evt) => {
              setFileName(evt.target.value);
            }}
          />
        </Space>
      </Modal>
      <Table<DataType>
        columns={columns}
        dataSource={employeeListSource}
        onChange={onChange}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default PersonnelTable;
