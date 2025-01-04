import React from "react";
import "./ProfilePhoto.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../store";
import { fetchEditPhoto, fetchGetProfile } from "../../store/feature/userSlice";

function ProfilePhoto() {
  const dispatch = useDispatch<MyDispatch>();
  const changePhoto = () => {
    const value = Swal.fire({
      title: "New Photo",
      input: "file",
      inputLabel: "Choose your photo (2MB)",
      showCancelButton: true,
      inputValidator: (value: any) => {
        if (value) {
          const formData = new FormData();
          const token = localStorage.getItem("token");
          formData.append("token", token?token:"")
          formData.append("file", value)
          dispatch(fetchEditPhoto(formData)).then(data=> {
            if (data.payload.code === 200){
              dispatch(fetchGetProfile())
            }
          })
        } else {
          return "You haven't choose your photo yet!";
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
