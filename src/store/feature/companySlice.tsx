import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { ICompanyNameResponse } from "../../models/ICompanyNameResponse";
import { ICompany } from "../../models/ICompany";
import Swal from "sweetalert2";

interface ICompanyState{
    isRegisterLoading: boolean,
    isCompanyListLoading: boolean,
    company: ICompany,
    isCompanyLoading: boolean,
    companyNameList: string[],
    companyList: ICompany[]
}

const initialAuthState: ICompanyState = {
    isRegisterLoading: false,
    isCompanyListLoading: false,
    company: {
        companyAddress: "",
        companyLogoUrl: "",
        companyMail: "",
        companyName: "",
        companyWebSite: "",
        employeeCount: 0,
        establishedDate: 0,
        id: "",
        industry: "",
        isPaidMember: false,
        membershipPlanId: "",
        registerState: ""
    },
    isCompanyLoading: false,
    companyNameList: [],
    companyList: []
};

// Async Thunk: API isteği
export const fetchCompanyRegister = createAsyncThunk<IBaseResponse, ICompanyRegisterRequest>(
    'auth/fetchCompanyRegister',
    async (payload: ICompanyRegisterRequest) => {
        const response = await fetch(`${apis.authCompanyService}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchCompanyList = createAsyncThunk<IBaseResponse>(
    'companyList',
    async () => {
        const response = await fetch(`${apis.authCompanyService}/company-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch company list');
        }

        return (await response.json()) as IBaseResponse;
    }
);

export const fetchCompanies = createAsyncThunk<IBaseResponse>(
    'company/fetchCompanies',
    async () => {
        const response = await fetch(`${apis.authCompanyService}/get-all-companies?token=` + localStorage.getItem("token"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch company list');
        }

        return (await response.json()) as IBaseResponse;
    }
)

interface IManageCompanyRegisterState{
    token: string,
    id: string,
    state: string
}

export const fetchManageCompany = createAsyncThunk(
    'company/fetchManageCompany',
    async (payload: IManageCompanyRegisterState) => {
        const response = await fetch(`${apis.authCompanyService}/manage-company-register-state`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(data=> data.json())

        return response
    }
)

export const fetchCompanyByComment = createAsyncThunk(
    'company/fetchCompanyByComment',
    async (payload: string)=>{
        const response = await fetch(`${apis.authCompanyService}/get-company-by-comment?commentId=`+payload)
        return (await response.json()) as IBaseResponse;
    }
)

// Slice: State yönetimi
const companySlice = createSlice({
    name: 'company',
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCompanyRegister.pending, (state) => {
            state.isRegisterLoading = true;
        });
        builder.addCase(fetchCompanyRegister.fulfilled, (state, action) => {
            console.log('FULFILLED:', action);
            state.isRegisterLoading = false;
            if (action.payload.code === 200) {
                swal('Company Register Successful')
            } else {
                swal('Company Register Failed');
            }
        });
        builder.addCase(fetchCompanyRegister.rejected, (state) => {
            state.isRegisterLoading = false;
            swal('Company Register Error!');
        });
        builder.addCase(fetchCompanyList.pending, (state) => {
            state.isCompanyListLoading = true;
        });
        builder.addCase(fetchCompanyList.fulfilled, (state, action) => {
            state.isCompanyListLoading = false;
            state.companyNameList = action.payload.data; 
            console.log("Company Name List:", state.companyNameList);
        });
        builder.addCase(fetchCompanyList.rejected, (state, action) => {
            state.isCompanyListLoading = false;
        });
        builder.addCase(fetchCompanies.pending, (state)=> {
            state.isCompanyListLoading = true
        })
        builder.addCase(fetchCompanies.fulfilled, (state, action)=>{
            state.isCompanyListLoading = false;
            if (action.payload.code === 200){
                state.companyList = action.payload.data
                console.log("companiesSliice: ", state.companyList)
            }
        })
        builder.addCase(fetchCompanyByComment.pending, state=>{state.isCompanyLoading = true})
        builder.addCase(fetchCompanyByComment.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            state.isCompanyLoading = false;
            if (action.payload.code === 200){
                state.company = action.payload.data
            }
        })
        builder.addCase(fetchManageCompany.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            if (action.payload.code === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Şirket durumu değiştirme başarılı'
                })
            }
            else Swal.fire({
                icon: 'error',
                title: "Şirket durumu değiştirilirken bir hatayla karşılaşıldı"
            })
        })
    }
});

export default companySlice.reducer;
