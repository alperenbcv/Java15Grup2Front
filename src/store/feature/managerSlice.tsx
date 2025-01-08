import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { IManagerRegisterRequest } from "../../models/IManagerRegisterRequest";
import { ILoginRequest } from "../../models/ILoginRequest";
import { IEmployeeListDto } from "../../models/IEmployeeListDto";
import { IManagerCardRequest } from "../../models/IManagerCardRequest";

const initialAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    manager: {},
    isActivationLoading: false,
    userType: null,
    isEmployeeListLoading: false,
    employeeList: [] as IEmployeeListDto[],
    managerCard: {} as IManagerCardRequest,
    isManagerCardLoading : false,
    isRecoverMailLoading: false,
    isPasswordRecoveryLoading: false
};


export const fetchManagerActivation = createAsyncThunk<IBaseResponse, string>(
    'auth/fetchActivation',
    async (token: string) => {
        const response = await fetch(`${apis.authManagerService}/activate?token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (await response.json()) as IBaseResponse;
    }
);


export const fetchManagerLogin = createAsyncThunk(
    'auth/fetchLogin',
    async(payload: ILoginRequest)=>{
        const response = await fetch(
            `${apis.authManagerService}/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data=>data.json())
        return response;
    }
)

export const fetchEmployeeList = createAsyncThunk<IBaseResponse, void>(
    'auth/fetchEmployeeList',
    async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apis.authManagerService}/get-employee-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: token,
        }).then((data) => data.json());
        return response;
    }
);


export const fetchManagerRegister = createAsyncThunk<IBaseResponse, IManagerRegisterRequest>(
    'auth/fetchManagerRegister',
    async (payload: IManagerRegisterRequest) => {
        const response = await fetch(`${apis.authManagerService}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchManagerCard = createAsyncThunk<IBaseResponse, void>(
    'auth/fetchManagerCard',
    async () => {
        const token = localStorage.getItem('token'); // Token'i al
        const response = await fetch(`${apis.authManagerService}/get-manager-card`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: token ,
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchForgotPassword = createAsyncThunk<IBaseResponse, string>(
    'auth/fetchForgotPassword',
    async (payload: string) => {
        const response = await fetch(`${apis.authManagerService}/send-recovery-mail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload, // Email'i JSON formatında gönderiyoruz
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchPasswordRecovery = createAsyncThunk<IBaseResponse, { mail: string; password: string; rePassword: string }>(
    'auth/fetchPasswordRecovery',
    async (payload) => {
        const response = await fetch(`${apis.authManagerService}/password-recovery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return (await response.json()) as IBaseResponse;
    }
);


const managerSlice = createSlice({
    name: 'manager',
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchManagerRegister.pending, (state) => {
            state.isRegisterLoading = true;
        });
        builder.addCase(fetchManagerRegister.fulfilled, (state, action) => {
            console.log('FULFILLED:', action);
            state.isRegisterLoading = false;
            if (action.payload.code === 200) {
                swal('Manager Register Successful');
            } else {
                swal('Manager Register Failed');
            }
        });
        builder.addCase(fetchManagerRegister.rejected, (state) => {
            state.isRegisterLoading = false;
            swal('Manager Register Error!');
        });
        builder.addCase(fetchManagerLogin.pending,(state)=>{
            state.isLoginLoading = true;
        })
        builder.addCase(fetchManagerLogin.fulfilled,(state,action: PayloadAction<IBaseResponse>)=>{
            state.isLoginLoading = false;
            if(action.payload.code === 200){
                localStorage.setItem('token', action.payload.data);
                state.isAuth = true;
            } else{
                swal('Warning!', 'error');
            }
        })
        builder.addCase(fetchManagerActivation.pending, (state) => {
            state.isActivationLoading = true;
        });
        builder.addCase(fetchManagerActivation.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isActivationLoading = false;
            if (action.payload.code === 200) {
                swal('Success', 'Account activation successful!', 'success');
            } else {
                swal('Error', 'Activation token is invalid or expired!', 'error');
            }
        });
        builder.addCase(fetchManagerActivation.rejected, (state) => {
            state.isActivationLoading = false;
            swal('Error', 'Activation failed!', 'error');
        });
        builder.addCase(fetchEmployeeList.pending, (state) => {
                    state.isEmployeeListLoading = true;
                });
        builder.addCase(fetchEmployeeList.fulfilled, (state, action) => {
                    state.isEmployeeListLoading = false;
                    state.employeeList = action.payload.data; 
                });
        builder.addCase(fetchEmployeeList.rejected, (state, action) => {
                    state.isEmployeeListLoading = false;
                });
        builder.addCase(fetchManagerCard.pending, (state) => {
                    state.isManagerCardLoading = true;
                });
        builder.addCase(fetchManagerCard.fulfilled, (state, action) => {
                    state.isManagerCardLoading = false;
                    state.managerCard = action.payload.data; 
                });
        builder.addCase(fetchManagerCard.rejected, (state, action) => {
                    state.isManagerCardLoading = false;
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
                    swal('Success', action.payload.message || 'Password recovery successful!', 'success');
                });
        builder.addCase(fetchPasswordRecovery.rejected, (state, action) => {
                    state.isPasswordRecoveryLoading = false;
                    swal('Error');
                });            
    }
});

export default managerSlice.reducer;
