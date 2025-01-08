import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICompanyRegisterRequest } from "../../models/ICompanyRegisterRequest";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { ICompanyNameResponse } from "../../models/ICompanyNameResponse";

interface ICompanyState{
    isRegisterLoading: boolean,
    isCompanyListLoading: boolean,
    company: object,
    companyNameList: string[]
}

const initialAuthState: ICompanyState = {
    isRegisterLoading: false,
    isCompanyListLoading: false,
    company: {},
    companyNameList: []
};


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
    }
});

export default companySlice.reducer;
