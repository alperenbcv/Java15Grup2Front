import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { IManagerRegisterRequest } from "../../models/IManagerRegisterRequest";
import { ILoginRequest } from "../../models/ILoginRequest";
import { IProfile } from "../../models/IProfile";
import { IEditProfile } from "../../models/IEditProfile";
import Swal from "sweetalert2";
import state from "sweetalert/typings/modules/state";

interface IUserState {
  isAuth: boolean;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isProfileLoading: boolean;
  user: IProfile;
  userList: IProfile[];
  isUserListLoading: boolean;
}
const initialAuthState: IUserState = {
  isAuth: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  isProfileLoading: false,
  user: {
    name: "none",
    surname: "none",
    email: "none",
    phoneNumber: "none",
    pictureUrl: "none",
    address: "none",
    gender: "none",
    department: "none",
    title: "none",
    isAccountVerified: false,
    isAccountActive: false,
    hireDate: 0,
    birthDate: 0,
    wage: 0,
    role: "none",
    isOnLeave: false,
    companyId: "none",
  },
  userList: [],
  isUserListLoading: false
};

export const fetchEditPhoto = createAsyncThunk(
  "manager/fetchEditPhoto",
  async (payload: FormData) => {
    return await fetch(
      apis.mediaFileService +
        "/upload-profile-picture",{
          method: "POST",
          body: payload
        }
    ).then((data) => data.json());
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (payload: ILoginRequest) => {
    const response = await fetch(`${apis.authService}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((data) => data.json());
    return response;
  }
);

export const fetchGetProfile = createAsyncThunk(
  "manager/fetchGetProfile",
  async () => {
    return await fetch(
      apis.userService +
        "/get-profile?token=" +
        localStorage.getItem("token")
    ).then((data) => data.json());
  }
);

export const fetchEditProfile = createAsyncThunk(
  "manager/fetchEditProfile",
  async (payload: IEditProfile) => {
    const response = await fetch(`${apis.userService}/edit-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((data) => data.json());
    return response;
  }
);

export const fetchManagerRegister = createAsyncThunk<
  IBaseResponse,
  IManagerRegisterRequest
>("auth/fetchCompanyRegister", async (payload: IManagerRegisterRequest) => {
  const response = await fetch(`${apis.authManagerService}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await response.json()) as IBaseResponse;
});


export const fetchManagerByCommentId = createAsyncThunk(
  "user/fetchManagerByCommentId",
  async(payload: string) => {
    const response = await fetch(`${apis.userService}/get-manager-by-comment?commentId=` + payload);
    return (await response.json()) as IBaseResponse
  }
)

export const fetchGetMyEmployees = createAsyncThunk(
  "user/fetchGetMyEmployees",
  async()=>{
    const token = localStorage.getItem("token");
    const response = await fetch(`${apis.userService}/get-my-employees?token=` + token).then(data=> data.json());
    return response
  }

)

export const fetchAddEmployee = createAsyncThunk(
  "user/fetchAddEmployee",
  async(payload:any)=>{
    const response = await fetch(`${apis.userService}/add-employee`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(data=> data.json())
    return response

  }
)

interface DeactivateEmployee{
  token: string,
  employeeEmail: string
}

export const fetchDeactivateEmployee = createAsyncThunk(
  "user/fetchDeactivateEmployee",
  async(payload:DeactivateEmployee)=>{
    const response = await fetch(`${apis.userService}/deactivate-employee`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(data=> data.json())
    return response

  }
)

const userSlice = createSlice({
  name: "manager",
  initialState: initialAuthState,
  reducers: {
    userLogin(state) {
      state.isAuth = true;
    },
    userLogout(state) {
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchManagerRegister.pending, (state) => {
      state.isRegisterLoading = true;
    });
    builder.addCase(fetchManagerRegister.fulfilled, (state, action) => {
      console.log("FULFILLED:", action);
      state.isRegisterLoading = false;
      if (action.payload.code === 200) {
        swal("Manager Register Successful");
      } else {
        swal("Manager Register Failed");
      }
    });
    builder.addCase(fetchManagerRegister.rejected, (state) => {
      state.isRegisterLoading = false;
      swal("Manager Register Error!");
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoginLoading = true;
    });
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isLoginLoading = false;
        if (action.payload.code === 200) {
          localStorage.setItem("token", action.payload.data.token);
          state.isAuth = true;
          
        } else {
          swal("Warning!", "error");
        }
      }
    );
    builder.addCase(fetchGetProfile.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(
      fetchGetProfile.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isProfileLoading = false;
        if (action.payload.code === 200 && state.user.role != "ADMIN") {
          state.user = action.payload.data;
        }
      }
    );
    builder.addCase(fetchEditProfile.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(
      fetchEditProfile.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isProfileLoading = false;
        if (action.payload.code === 200) {
          state.user = action.payload.data;
        } else {
          console.log("fetch başarısız/ atılmadı");
        }
      }
    );
    builder.addCase(fetchEditPhoto.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(
      fetchEditPhoto.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isProfileLoading = false;
        if (action.payload.code === 200) {
          state.user = action.payload.data;
        }
        else{
          Swal.fire("editProfile basarisiz")
        }
      }
    );
    builder.addCase(fetchManagerByCommentId.pending, (state)=> {state.isProfileLoading = true})
    builder.addCase(fetchManagerByCommentId.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      state.isProfileLoading = false;
      if (action.payload.code === 200){
        state.user = action.payload.data
      }
    })
    builder.addCase(fetchGetMyEmployees.pending, state=> {state.isUserListLoading = true})
    builder.addCase(fetchGetMyEmployees.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      state.isUserListLoading = false
      if(action.payload.code === 200){
        state.userList = action.payload.data
      }
    })
    builder.addCase(fetchAddEmployee.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      if (action.payload.code === 200){
        Swal.fire({
          icon: 'success',
          text: 'employee successfully registered'
        })
      } else{
        Swal.fire({
          icon: "error",
          text: "başarısız"
        })
      }
    })
    builder.addCase(fetchDeactivateEmployee.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      if (action.payload.code === 200) Swal.fire({
        title: 'Employee deleted successfully',
        icon: 'info'
      })
    })
  },
});
export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
