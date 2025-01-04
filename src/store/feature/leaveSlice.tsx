import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";

import { ILeave } from "../../models/ILeave";
import Swal from "sweetalert2";
import { IAddLeave } from "../../models/IAddLeave";

interface ILeaveSlice {
  leave: ILeave;
  leaveList: ILeave[];
  isLeaveLoading: boolean;
  isLeaveListLoading: boolean;
}
const initialLeaveSliceState: ILeaveSlice = {
  leave: {
    description: "",
    endDate: 0,
    startDate: 0,
    leaveType: "",
    state: ""
  },
  leaveList: [],
  isLeaveLoading: false,
  isLeaveListLoading: false,
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

export const fetchGetLeavesByManager = createAsyncThunk(
  "leave/fetchGetLeavesByManager",
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${apis.leaveService}/get-leaves-by-manager?token=` + token
    ).then((data) => data.json());
    return response;
  }
);

interface IManageState {
  leaveId: string | undefined;
  token: string;
  state: string;
  rejectionReason?: string;
}

export const fetchManageState = createAsyncThunk(
  "leave/fetchManageState",
  async (payload: IManageState) => {
    const response = await fetch(`${apis.leaveService}/manage-leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((data) => data.json());
    return response;
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: initialLeaveSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddLeave.pending, (state) => {
      state.isLeaveLoading = true;
    });
    builder.addCase(
      fetchAddLeave.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isLeaveLoading = false;
        if (action.payload.code === 200) {
          swal("izin isteği başarıyla gönderildi");
        } else {
          swal("gönderilirken bir hata oluştu");
        }
      }
    );
    builder.addCase(fetchGetLeavesByManager.pending, (state) => {
      state.isLeaveListLoading = true;
    });
    builder.addCase(
      fetchGetLeavesByManager.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isLeaveListLoading = false;
        if (action.payload.code === 200) {
          state.leaveList = action.payload.data;
        } else {
          Swal.fire("leaveList çekme başarısız");
        }
      }
    );
    builder.addCase(
      fetchManageState.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        if (action.payload.code === 200) {
          Swal.fire("izin talebi başarıyla yönetildi");
        } else {
          Swal.fire("İzin talebi yönetilirken bir sorun oluştu");
        }
      }
    );
  },
});
export default leaveSlice.reducer;
