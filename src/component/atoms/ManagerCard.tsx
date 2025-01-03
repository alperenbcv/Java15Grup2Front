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

  useEffect(() => {
    if (!isEditMode && !isPageLoad && isEdited) {
      const token = localStorage.getItem("token");
      const editProfile: IEditProfile = {
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        email: email,
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
            src={manager.pictureUrl}
            alt="manager-img"
          />
        </div>
        <div className="col-8 manager-info-col">
          <div className="row">
            <h4 className="manager-name">
              {manager.name + " " + manager.surname}
            </h4>
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
            <input
              type="text"
              id="phoneNumber"
              className="form-control manager-info-input"
              name="position"
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
            <input
              className="form-control manager-info-input"
              name="phone"
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
          <strong>Deparmant:</strong> <p>{manager.department}</p>
        </p>
        <p className="manager-info-title">
          <strong>Address:</strong>{" "}
          {isEditMode ? (
            <input
              className="form-control manager-info-input"
              name="reportOffice"
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
            <input
              className="form-control manager-info-input"
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
            <input id="birthDate" className="form-control" type="date" value={new Date(manager.birthDate).toDateString()}/>
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
