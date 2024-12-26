import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { IManagerRegisterRequest } from "../../models/IManagerRegisterRequest";
import { ILoginRequest } from "../../models/ILoginRequest";
import { IProfile } from "../../models/IProfile";
import { IEditProfile } from "../../models/IEditProfile";

interface IManagerState{
    isAuth: boolean,
    isLoginLoading: boolean,
    isRegisterLoading: boolean,
    isProfileLoading: boolean,
    manager: IProfile
}
const initialAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    isProfileLoading: false,
    manager: {
        name: "none",
        surname:  "none",
        email:  "none",
        phoneNumber:  "none",
        pictureUrl:  "none",
        address:  "none",
        gender:  "none",
        department:  "none",
        title:  "none"
        }
};


export const fetchEditPhoto = createAsyncThunk(
    'manager/fetchEditPhoto',
    async (payload: string)=>{
        return await fetch(apis.authManagerService+'/edit-photo?token=' + localStorage.getItem('token')+'&photoUrl=' + payload).then(data=> data.json())
    }
)

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

export const fetchGetProfile=createAsyncThunk(
    'manager/fetchGetProfile',
    async ()=>{
        return await fetch(apis.authManagerService+'/get-profile?token='+localStorage.getItem('token')).then(data=>data.json())
    }
)


export const fetchEditProfile = createAsyncThunk(
    'manager/fetchEditProfile',
    async(payload: IEditProfile)=>{
        const response = await fetch(
            `${apis.authManagerService}/edit-profile`,{
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
    reducers: {
        userLogin(state){
            state.isAuth = true;
        },
        userLogout(state){
            state.isAuth=false;
        }
    },
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
        builder.addCase(fetchGetProfile.pending, (state)=>{
            state.isProfileLoading = true
        })
        builder.addCase(fetchGetProfile.fulfilled, (state,action: PayloadAction<IBaseResponse>)=>{
            state.isProfileLoading = false;
            if(action.payload.code === 200){
                state.manager = action.payload.data;
            }
        })
        builder.addCase(fetchEditProfile.pending, (state)=>{
            state.isProfileLoading = true
        })
        builder.addCase(fetchEditProfile.fulfilled, (state, action: PayloadAction<IBaseResponse>)=>{
            state.isProfileLoading=false;
            if(action.payload.code===200){
                state.manager = action.payload.data
            }
            else {
                console.log('fetch başarısız/ atılmadı')
            }
        })
        builder.addCase(fetchEditPhoto.pending, (state)=>{
            state.isProfileLoading = true
        })
        builder.addCase(fetchEditPhoto.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            state.isProfileLoading = false;
            if(action.payload.code === 200){
                state.manager = action.payload.data;
            }
        })
    }
});
export const  {userLogin,userLogout} = managerSlice.actions
export default managerSlice.reducer;
