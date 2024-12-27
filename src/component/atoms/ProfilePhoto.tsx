import React from "react";
import "./ProfilePhoto.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../store";
import { fetchEditPhoto } from "../../store/feature/userSlice";

function ProfilePhoto() {
  const dispatch = useDispatch<MyDispatch>();
  const changePhoto = () => {
    const value = Swal.fire({
      title: "New Photo",
      input: "text",
      inputLabel: "Enter the url of the new photo: ",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        } else {
          dispatch(fetchEditPhoto(value));
        }
      },
    });
  };

  const manager = MyUseSelector((state) => state.user.user);
  return (
    <div>
      <div className="d-flex justify-content-center text-white m-2 fs-5">
        Profile Photo
      </div>
      <div className="cover" onClick={changePhoto}>
        <img src={manager.pictureUrl} className="photo" alt="profile photo" />
        <i className="fa fa-pencil fa-3x overlay" />
      </div>
    </div>
  );
}
export default ProfilePhoto;
