import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { IManagerRegisterRequest } from "../../models/IManagerRegisterRequest";
import { ILoginRequest } from "../../models/ILoginRequest";

const initialAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    manager: {},
    isActivationLoading: false
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
    }
});

export default managerSlice.reducer;
