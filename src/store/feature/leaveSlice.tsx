import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";

import { ILeave } from "../../models/ILeave";
import Swal from "sweetalert2";
import { IAddLeave } from "../../models/IAddLeave";

interface ILeaveSlice {
  leave: ILeave,
  leaveList: ILeave[],
  isLeaveLoading: boolean,
  isLeaveListLoading: boolean
}
const initialLeaveSliceState: ILeaveSlice = {
    leave: {
        description: '',
        endDate: 0,
        startDate: 0,
        leaveType: ''
    },
    leaveList: [],
    isLeaveLoading: false,
    isLeaveListLoading: false
};

export const fetchAddLeave = createAsyncThunk(
    "leave/fetchAddLeave",
    async (payload: IAddLeave) => {
      const response = await fetch(`${apis.leaveService}/add-leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((data) => data.json());
      return response;
    }
  );

  export const fetchGetPendingLeaves = createAsyncThunk(
    "leave/fetchGetPendingLeaves",
    async ()=>{
        const token = localStorage.getItem("token")
        const response = await fetch(`${apis.leaveService}/get-pending-leaves?token=`+token).then(data=>data.json());
        return response;
    }
  )
const leaveSlice = createSlice({
  name: "leave",
  initialState: initialLeaveSliceState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddLeave.pending, (state) => {
          state.isLeaveLoading = true;
        });
    builder.addCase(fetchAddLeave.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isLeaveLoading = false;
        if (action.payload.code === 200){
            swal("izin isteği başarıyla gönderildi")
        }
        else{
            swal("gönderilirken bir hata oluştu")
        }
    })
    builder.addCase(fetchGetPendingLeaves.pending, (state)=>{
        state.isLeaveListLoading = true;
    })
    builder.addCase(fetchGetPendingLeaves.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isLeaveListLoading = false;
        if (action.payload.code === 200){
            state.leaveList = action.payload.data;
            console.log("leaveSlice>leaveList>fetchpending> ", state.leaveList);
        }
        else {Swal.fire("leaveList çekme başarısız")}
    })
  },
});
export default leaveSlice.reducer;
