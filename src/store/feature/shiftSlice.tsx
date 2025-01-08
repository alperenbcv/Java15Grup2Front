import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IShiftCreateRequest } from "../../models/IShiftCreateRequest";
import apis from "../../config/RestApis";
import swal from "sweetalert";
import { IShiftResponseManager } from "../../models/IShiftResponseManager";
import { IShiftUpdateRequest } from "../../models/IShiftUpdateRequest";

const initialAuthState = {
    isAuth: false,
    isShiftLoading: false,
    shiftRequest: {},
    isShiftListLoading: false,
    isShiftDeleteLoading: false,
    isShiftUpdateLoading: false,
    shiftList: [] as IShiftResponseManager[],
    empShiftList: [] as IShiftResponseManager[],
    isEmpShiftListLoading : false
};

export const fetchShiftCreate = createAsyncThunk<IBaseResponse, IShiftCreateRequest>(
    'shift/fetchShiftCreate',
    async (payload: IShiftCreateRequest) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in localStorage');
        }

        const response = await fetch(`${apis.authShiftService}/create-shift`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to create shift');
        }

        return (await response.json()) as IBaseResponse;
    }
);



export const fetchUpdateShift = createAsyncThunk<IBaseResponse, IShiftUpdateRequest>(
  'shift/fetchUpdateShift',
  async (payload: IShiftUpdateRequest) => {
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('No token found in localStorage');
      }

      const response = await fetch(`${apis.authShiftService}/update-shift`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error('Failed to create shift');
      }

      return (await response.json()) as IBaseResponse;
  }
);

export const fetchShiftListEmployee = createAsyncThunk<IBaseResponse, { date: string }>(
    'shift/fetchShiftListEmployee',
    async (payload: { date: string }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch(`${apis.authShiftService}/get-shift-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch shifts for the selected date');
      }
  
      return (await response.json()) as IBaseResponse;
    }
  );

  export const fetchShiftListManager = createAsyncThunk<IBaseResponse, { date: string }>(
    'shift/fetchShiftListManager',
    async (payload: { date: string }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await fetch(`${apis.authShiftService}/get-shift-manager`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch shifts for the selected date');
      }
  
      return (await response.json()) as IBaseResponse;
    }
  );

  export const fetchDeleteShift = createAsyncThunk<IBaseResponse, { id: string }>(
    'shift/fetchDeleteShift',
    async (payload: { id: string }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await fetch(`${apis.authShiftService}/delete-shift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the shift');
      }
  
      return (await response.json()) as IBaseResponse;
    }
  );
  

const shiftSlice = createSlice({
    name: 'shift',
    initialState: initialAuthState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShiftCreate.pending, (state) => {
            state.isShiftLoading = true;
        });
        builder.addCase(fetchShiftCreate.fulfilled, (state, action) => {
            state.isShiftLoading = false;
            if (action.payload.code === 200) {
                swal('Shift created successfuly!');
            } else {
                swal('Shift creation fail!');
            }
        });
        builder.addCase(fetchShiftCreate.rejected, (state) => {
            state.isShiftLoading = false;
            swal('Shift creation error!');
        });
        builder.addCase(fetchShiftListManager.pending, (state) => {
            state.isShiftListLoading = true;
        });
        builder.addCase(fetchShiftListManager.fulfilled, (state, action) => {
            state.isShiftListLoading = false;
            
            state.shiftList = action.payload.data;
            console.log(action.payload.data)
        });
        builder.addCase(fetchShiftListManager.rejected, (state) => {
            state.shiftList = [];
            state.isShiftListLoading = false;
        });
        builder.addCase(fetchShiftListEmployee.pending, (state) => {
          state.isEmpShiftListLoading = true;
      });
      builder.addCase(fetchShiftListEmployee.fulfilled, (state, action) => {
          state.isEmpShiftListLoading = false;
          
          state.empShiftList = action.payload.data;
          console.log(action.payload.data)
      });
      builder.addCase(fetchShiftListEmployee.rejected, (state) => {
          state.empShiftList = [];
          state.isEmpShiftListLoading = false;
      });
        builder.addCase(fetchDeleteShift.pending, (state) => {
            state.isShiftDeleteLoading = true;
        });
        builder.addCase(fetchDeleteShift.fulfilled, (state, action) => {
            state.isShiftDeleteLoading = false;
            if (action.payload.code === 200) {
                swal('Shift deleted successfuly!');
            } else {
                swal('Shift deletion fail!');
            }
        });
        builder.addCase(fetchDeleteShift.rejected, (state) => {
            state.isShiftDeleteLoading = false;
            swal('Shift deletion error!');
        });
        builder.addCase(fetchUpdateShift.pending, (state) => {
          state.isShiftUpdateLoading = true;
      });
      builder.addCase(fetchUpdateShift.fulfilled, (state, action) => {
        state.isShiftUpdateLoading = false;
        if (action.payload.code === 200) {
          state.shiftList = state.shiftList.map((shift) =>
            shift.shiftId === action.payload.data.shiftId ? action.payload.data : shift
          );
          swal('Shift updated successfully!');
        } else {
          swal('Shift update failed!');
        }
      });
      builder.addCase(fetchUpdateShift.rejected, (state) => {
          state.isShiftUpdateLoading = false;
          swal('Shift update error!');
      });
    }
});

export default shiftSlice.reducer;