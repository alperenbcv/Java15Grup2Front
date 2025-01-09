import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";

import { ILeave } from "../../models/ILeave";
import Swal from "sweetalert2";
import { IAddLeave } from "../../models/IAddLeave";
import { IPossession } from "../../models/IPossesion";

interface IPossessionSlice {
  possession: IPossession,
  possessionList: IPossession[],
  isPossessionLoading: boolean,
  isPossessionListLoading: boolean
}
const initialPossessionSlice: IPossessionSlice = {
    possession: {
        id: "",
        title: "",
        description: "",
        personnelId: "",
        companyId: "",
        managerId: "",
        lendingDate: 0,
        returnDate: 0,
        confirmationState: ""
    },
    possessionList: [],
    isPossessionListLoading: false,
    isPossessionLoading: false
};

interface IManagePossession{
  itemId: string,
	agentToken: string,
	updatedState: string
}

export const fetchManagePossession = createAsyncThunk(
    "possession/fetchManagePossession",
    async (payload: IManagePossession) => {
      const response = await fetch(`${apis.possessionService}/manage-possession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((data) => data.json());
      return response;
    }
  );

  export const fetchGetMyPossessions = createAsyncThunk(
    "possession/fetchGetMyPossessions",
    async ()=>{
        const token = localStorage.getItem("token")
        const response = await fetch(`${apis.possessionService}/get-my-possessions?token=`+token).then(data=>data.json());
        return response;
    }
  )

  interface IAddPossession{
    title: string,
    description: string,
    personnelMail: string,
    token: string
  }
  export const fetchAddPossession = createAsyncThunk(
    "possession/fetchAddPossession",
    async (payload:IAddPossession)=>{
      const response = await fetch(`${apis.possessionService}/add-possession`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)

      }).then(data=>data.json())
      return response
})

const possessionSlice = createSlice({
  name: "possession",
  initialState: initialPossessionSlice,
  reducers: {
    clearPossessions: (state)=>{
      state.possessionList = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetMyPossessions.pending, (state) =>{
        state.isPossessionListLoading = true
    })
    builder.addCase(fetchGetMyPossessions.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isPossessionListLoading = false
        if(action.payload.code === 200){
            state.possessionList = action.payload.data
        }
        else {
            Swal.fire("Maalesef zimmetler yüklenirken bir hata oluştu")
        }
    })
    builder.addCase(fetchManagePossession.pending, (state)=>{
        state.isPossessionLoading = true
    })
    builder.addCase(fetchManagePossession.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isPossessionLoading = false
        if (action.payload.code === 200){
            Swal.fire("İşlem başarıyla gerçekleştirildi")
        }
        else{
            Swal.fire("İşlem gerçekleştirilirken bir hatayla karşılaşıldı")
        }
    })
    builder.addCase(fetchAddPossession.fulfilled, (state,action:PayloadAction<IBaseResponse>)=>{
      if (action.payload.code === 200){
        Swal.fire({
          title: "Possession successfully added!",
          icon: "success"
        })
      }
    })
  },
});
export const {clearPossessions} = possessionSlice.actions
export default possessionSlice.reducer;
