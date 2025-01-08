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
import { IEmployeeRegisterRequest } from "../../models/IEmployeeRegisterRequest";
import { IEmployeeActivationRequest } from "../../models/IEmployeeActivationRequest";

interface IUserState {
  isAuth: boolean;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isProfileLoading: boolean;
  user: IProfile;
  userList: IProfile[];
  isUserListLoading: boolean;
  isActivationLoading: boolean;
  isActivationSuccessful: boolean;
  isRecoverMailLoading: boolean;
  isPasswordRecoveryLoading: boolean;
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
    accountVerified: false,
    accountActive: false,
    hireDate: 0,
    birthDate: 0,
    wage: 0,
    role: "none",
    isOnLeave: false,
    companyId: "none",
  },
  userList: [],
  isUserListLoading: false,
  isActivationLoading: false,
  isActivationSuccessful: false,
  isRecoverMailLoading: false,
  isPasswordRecoveryLoading: false,
};

export const fetchEditPhoto = createAsyncThunk(
  "auth/fetchEditPhoto",
  async (payload: FormData) => {
    return await fetch(apis.mediaFileService + "/upload-profile-picture", {
      method: "POST",
      body: payload,
    }).then((data) => data.json());
  }
);

interface IAlterAccountActivation {
  token: string;
  employeeMail: string;
}

export const fetchAlterAccountActivation = createAsyncThunk(
  "auth/fetchAlterAccountActivation",
  async (payload: IAlterAccountActivation) => {
    return await fetch(apis.userService + "/alter-account-activation", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).then((data) => data.json());
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
  "auth/fetchGetProfile",
  async () => {
    return await fetch(
      apis.userService + "/get-profile?token=" + localStorage.getItem("token")
    ).then((data) => data.json());
  }
);

export const fetchEditProfile = createAsyncThunk(
  "auth/fetchEditProfile",
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
  "auth/fetchManagerByCommentId",
  async (payload: string) => {
    const response = await fetch(
      `${apis.userService}/get-manager-by-comment?commentId=` + payload
    );
    return (await response.json()) as IBaseResponse;
  }
);

export const fetchGetMyEmployees = createAsyncThunk(
  "auth/fetchGetMyEmployees",
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${apis.userService}/get-my-employees?token=` + token
    ).then((data) => data.json());
    return response;
  }
);

export const fetchAddEmployee = createAsyncThunk(
  "auth/fetchAddEmployee",
  async (payload: any) => {
    const response = await fetch(`${apis.userService}/add-employee`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
    return response;
  }
);

export const fetchEmployeeRegister = createAsyncThunk<
  IBaseResponse,
  IEmployeeRegisterRequest
>("auth/fetchEmployeeRegister", async (payload: IEmployeeRegisterRequest) => {
  const response = await fetch(`${apis.authEmployeeService}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((data) => data.json());
  return response as IBaseResponse;
});

export const fetchEmployeeActivation = createAsyncThunk<
  IBaseResponse,
  IEmployeeActivationRequest
>(
  "auth/fetchEmployeeActivation",
  async (payload: IEmployeeActivationRequest) => {
    const response = await fetch(
      `${apis.authEmployeeService}/activate-employee`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return (await response.json()) as IBaseResponse;
  }
);

interface DeactivateEmployee {
  token: string;
  employeeEmail: string;
}

export const fetchDeactivateEmployee = createAsyncThunk(
  "auth/fetchDeactivateEmployee",
  async (payload: DeactivateEmployee) => {
    const response = await fetch(`${apis.userService}/deactivate-employee`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
    return response;
  }
);

export const fetchManagerActivation = createAsyncThunk<IBaseResponse, string>(
  "auth/fetchActivation",
  async (token: string) => {
    const response = await fetch(
      `${apis.authManagerService}/activate?token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await response.json()) as IBaseResponse;
  }
);

export const fetchForgotPassword = createAsyncThunk<IBaseResponse, string>(
  "auth/fetchForgotPassword",
  async (payload: string) => {
    const response = await fetch(
      `${apis.authManagerService}/send-recovery-mail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }
    );
    return (await response.json()) as IBaseResponse;
  }
);

export const fetchPasswordRecovery = createAsyncThunk<
  IBaseResponse,
  { mail: string; password: string; rePassword: string }
>("auth/fetchPasswordRecovery", async (payload) => {
  const response = await fetch(`${apis.authManagerService}/password-recovery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await response.json()) as IBaseResponse;
});

const userSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    userLogin(state) {
      state.isAuth = true;
    },
    userLogout(state) {
      state.isAuth = false;
    },
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
    builder.addCase(fetchManagerActivation.pending, (state) => {
      state.isActivationLoading = true;
    });
    builder.addCase(
      fetchManagerActivation.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isActivationLoading = false;
        if (action.payload.code === 200) {
          swal("Success", "Account activation successful!", "success");
        } else {
          swal("Error", "Activation token is invalid or expired!", "error");
        }
      }
    );
    builder.addCase(fetchManagerActivation.rejected, (state) => {
      state.isActivationLoading = false;
      swal("Error", "Activation failed!", "error");
    });
    builder.addCase(fetchForgotPassword.pending, (state) => {
      state.isRecoverMailLoading = true;
    });
    builder.addCase(fetchForgotPassword.fulfilled, (state, action) => {
      state.isRecoverMailLoading = false;
    });
    builder.addCase(fetchForgotPassword.rejected, (state, action) => {
      state.isRecoverMailLoading = false;
    });
    builder.addCase(fetchPasswordRecovery.pending, (state) => {
      state.isPasswordRecoveryLoading = true;
    });
    builder.addCase(fetchPasswordRecovery.fulfilled, (state, action) => {
      state.isPasswordRecoveryLoading = false;
      swal(
        "Success",
        action.payload.message || "Password recovery successful!",
        "success"
      );
    });
    builder.addCase(fetchPasswordRecovery.rejected, (state, action) => {
      state.isPasswordRecoveryLoading = false;
      swal("Error");
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
        } else if (action.payload.code === 400) {
          Swal.fire({
            title: "Login Failed",
            text: "Your account is not active at the moment, contact admins/ your manager",
            icon: "error",
          });
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
        } else {
          Swal.fire("editProfile basarisiz");
        }
      }
    );
    builder.addCase(fetchManagerByCommentId.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(
      fetchManagerByCommentId.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isProfileLoading = false;
        if (action.payload.code === 200) {
          state.user = action.payload.data;
        }
      }
    );
    builder.addCase(fetchGetMyEmployees.pending, (state) => {
      state.isUserListLoading = true;
    });
    builder.addCase(
      fetchGetMyEmployees.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isUserListLoading = false;
        if (action.payload.code === 200) {
          state.userList = action.payload.data;
        }
      }
    );
    builder.addCase(
      fetchAddEmployee.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        if (action.payload.code === 200) {
          Swal.fire({
            icon: "success",
            text: "employee successfully registered",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "başarısız",
          });
        }
      }
    );
    builder.addCase(fetchEmployeeRegister.pending, (state) => {
      state.isRegisterLoading = true;
    });
    builder.addCase(fetchEmployeeRegister.fulfilled, (state, action) => {
      state.isRegisterLoading = false;
      if (action.payload.code === 200) {
        swal("Employee Register Successful");
      } else {
        swal("Employee Register Failed");
      }
    });
    builder.addCase(fetchEmployeeRegister.rejected, (state) => {
      state.isRegisterLoading = false;
      swal("Employee Register Error!");
    });
    builder.addCase(fetchEmployeeActivation.pending, (state) => {
      state.isActivationLoading = true;
    });
    builder.addCase(fetchEmployeeActivation.fulfilled, (state, action) => {
      state.isActivationLoading = false;
      state.isActivationSuccessful = true;
      if (action.payload.code === 200) {
        swal("Employee Activation Successful");
      } else {
        swal("Employee Activation Failed");
      }
    });
    builder.addCase(fetchEmployeeActivation.rejected, (state) => {
      state.isActivationLoading = false;
      swal("Employee Activation Error!");
    });
    builder.addCase(
      fetchDeactivateEmployee.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        if (action.payload.code === 200)
          Swal.fire({
            title: "Employee deleted successfully",
            icon: "info",
          });
      }
    );
    builder.addCase(
      fetchAlterAccountActivation.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        if (action.payload.code === 200)
          Swal.fire({
            title: "Activation Status Changed Successfully",
            icon: "success",
          });
        else
          Swal.fire({
            title: "Account Activation Couldn't Be Changed",
            icon: "error",
          });
      }
    );
  },
});
export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
