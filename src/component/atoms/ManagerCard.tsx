import React, { useEffect, useState } from "react";
import "./ManagerCard.css";
import { MyDispatch, MyUseSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  fetchEditProfile,
  fetchGetProfile,
} from "../../store/feature/userSlice";
import { IProfile } from "../../models/IProfile";
import { IEditProfile } from "../../models/IEditProfile";
import { Input } from "antd";

function ManagerCard() {
  const manager = MyUseSelector((state) => state.user.user);
  const dispatch = useDispatch<MyDispatch>();
  useEffect(() => {
    dispatch(fetchGetProfile);
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);

  const [isPageLoad, setIsPageLoad] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date())
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (!isEditMode && !isPageLoad && isEdited) {
      const token = localStorage.getItem("token");
      const editProfile: IEditProfile = {
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        email: email,
        department: department,
        birthDate: birthDate.getTime(),
        token: token ? token : "token",
      };
      dispatch(fetchEditProfile(editProfile));
    } else {
      setEmail(manager.email);
      setPhoneNumber(manager.phoneNumber);
      setAddress(manager.address);
      setGender(manager.gender);
      setBirthDate(new Date(manager.birthDate))
      setDepartment(manager.department)
    }
    setIsPageLoad(false);
    setIsEdited(false);
  }, [isEditMode]);

  /**const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };*/
  return (
    <>
      <div className="row manager-card-top-row">
        <div className="col-2">
          <img
            className="dashboard-img"
            src={manager.pictureUrl?manager.pictureUrl:'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'}
            alt="manager-img"
          />
        </div>
        <div className="col-8 manager-info-col">
          <div className="row">{
            manager.role == "ADMIN"
            ?
            <h4 className="manager-name">
              ADMIN
            </h4>
            :
            <h4 className="manager-name">
              {manager.name + " " + manager.surname}
            </h4>}
          </div>
          <div className="row">
            <h5 className="manager-title">{manager.title}</h5>
          </div>
        </div>
        <div className="col-1">
          <button
            className="btn dashboard-card-edit-btn"
            onClick={toggleEditMode}
          >
            {isEditMode ? (
              <i className="fa-regular fa-floppy-disk fa-xl save-icon-manager"></i>
            ) : (
              <i className="fa-solid fa-pen-to-square fa-xl edit-icon-manager"></i>
            )}
          </button>
        </div>
      </div>
      <div className="row">
        <hr className="manager-card-hr-1" />
      </div>
      <div className="col-12 info-col">
        <p className="manager-info-title">
          <strong>Phone Number:</strong>{" "}
          {isEditMode ? (
            <Input
              style={{width:'90%'}}
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(evt) => {
                setPhoneNumber(evt.target.value);
                setIsEdited(true);
              }}
            />
          ) : (
            <p>{manager.phoneNumber}</p>
          )}
        </p>
        <p className="manager-info-title">
          <strong>Email Address:</strong>{" "}
          {isEditMode ? (
            <Input
            style={{width:'90%'}}
            id='email'
              name="email"
              value={email}
              onChange={(evt) => {
                setEmail(evt.target.value);
                setIsEdited(true);
              }}
            />
          ) : (
            <p>{manager.email}</p>
          )}
        </p>
        <p className="manager-info-title">
          <strong>Deparmant:</strong> 
          {isEditMode
          ?
          <Input
          style={{width:'80%'}}
          id="department"
          name="department"
            value={department}
            onChange={(evt)=>{
              setDepartment(evt.target.value)
              setIsEdited(true)
            }}
          
          />
          :
          <p>{manager.department}</p>
}
        </p>
        <p className="manager-info-title">
          <strong>Address:</strong>{" "}
          {isEditMode ? (
            <Input
            style={{width:'90%'}}
            id='address'
              name="address"
              value={address}
              onChange={(evt) => {
                setAddress(evt.target.value);
                setIsEdited(true);
              }}
            />
          ) : (
            <p>{manager.address}</p>
          )}
        </p>
        <p className="manager-info-title">
          <strong>Gender:</strong>{" "}
          {isEditMode ? (
            <Input
            style={{width:'90%'}}
            id= 'gender'
              name="gender"
              value={gender}
              onChange={(evt) => {
                setGender(evt.target.value);
                setIsEdited(true);
              }}
            />
          ) : (
            <p>{manager.gender}</p>
          )}
        </p>
        <p className="manager-info-title">
          <strong>BirthDate:</strong>{" "}
          {isEditMode ? (
            <div>
            <label htmlFor="birthDate"></label>
            <Input name="birthDate" id="birthDate" style={{width:'90%'}} type="date" value={new Date(manager.birthDate).toDateString()}/>
          </div>

          ) : (
            <p>{new Date(manager.birthDate).toLocaleDateString()}</p>
          )}
        </p>
      </div>
    </>
  );
}

export default ManagerCard;
