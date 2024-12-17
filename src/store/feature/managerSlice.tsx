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
    manager: {}
};


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
    'auth/fetchCompanyRegister',
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
                swal('Manager Register Successful')
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
    }
});

export default managerSlice.reducer;
