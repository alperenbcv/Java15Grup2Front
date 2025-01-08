import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployeeRegisterRequest } from "../../models/IEmployeeRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { IEmployeeActivationRequest } from "../../models/IEmployeeActivationRequest";
import { ILoginRequest } from "../../models/ILoginRequest";
import { IDeleteEmployeeRequest } from "../../models/IDeleteEmployeeRequest";

const initialAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    employee: {},
    isActivationLoading: false,
    isActivationSuccessful: false,
    isDeleteLoading: false
};

export const fetchEmployeeRegister = createAsyncThunk<IBaseResponse, IEmployeeRegisterRequest>(
    'auth/fetchEmployeeRegister',
    async (payload: IEmployeeRegisterRequest) => {
        const response = await fetch(`${apis.authEmployeeService}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);


export const fetchEmployeeActivation = createAsyncThunk<IBaseResponse, IEmployeeActivationRequest>(
    'auth/fetchEmployeeActivation',
    async (payload: IEmployeeActivationRequest) => {
        const response = await fetch(`${apis.authEmployeeService}/activate-employee`, {
            method: 'PUT',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchEmployeeLogin = createAsyncThunk(
    'auth/fetchLogin',
    async(payload: ILoginRequest)=>{
        const response = await fetch(
            `${apis.authEmployeeService}/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data=>data.json())
        return response;
    }
);

export const fetchDeleteEmployee = createAsyncThunk(
    'auth/deleteEmployee',
    async (payload: IDeleteEmployeeRequest) => {
        const response = await fetch(
            `${apis.authEmployeeService}/delete-employee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), 
            }).then(data=>data.json())
            return response;
    }
)




const employeeSlice = createSlice({
    name:'employee',
    initialState: initialAuthState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchEmployeeRegister.pending, (state)=>{
            state.isRegisterLoading=true;
        });
        builder.addCase(fetchEmployeeRegister.fulfilled, (state,action)=>{
            state.isRegisterLoading=false;
            if(action.payload.code === 200){
                swal('Employee Register Successful');
            } else {
                swal('Employee Register Failed');
            }
        });
        builder.addCase(fetchEmployeeRegister.rejected, (state)=>{
            state.isRegisterLoading=false;
            swal('Employee Register Error!')
        });
        builder.addCase(fetchEmployeeActivation.pending, (state)=>{
            state.isActivationLoading=true;
        });
        builder.addCase(fetchEmployeeActivation.fulfilled, (state,action)=>{
            state.isActivationLoading=false;
            state.isActivationSuccessful=true;
            if(action.payload.code === 200){
                swal('Employee Activation Successful');
            } else {
                swal('Employee Activation Failed');
            }
        });
        builder.addCase(fetchEmployeeActivation.rejected, (state)=>{
            state.isActivationLoading=false;
            swal('Employee Activation Error!')
        });
        builder.addCase(fetchEmployeeLogin.pending,(state)=>{
            state.isLoginLoading = true;
        });
        builder.addCase(fetchEmployeeLogin.fulfilled,(state,action: PayloadAction<IBaseResponse>)=>{
            state.isLoginLoading = false;
            if(action.payload.code === 200){
                localStorage.setItem('token', action.payload.data);
                state.isAuth = true;
            } else{
                swal('Warning!', 'error');
            }
        });
        builder.addCase(fetchDeleteEmployee.pending,(state)=>{
            state.isDeleteLoading = true;
        });
        builder.addCase(fetchDeleteEmployee.fulfilled,(state,action: PayloadAction<IBaseResponse>)=>{
            state.isDeleteLoading = false;
            if(action.payload.code === 200){
                swal('Employee Deleted Succesfully')
            } else{
                swal('Warning!', 'error');
            }
        });
    }
})

export default employeeSlice.reducer;