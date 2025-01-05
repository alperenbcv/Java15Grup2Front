import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";

import Swal from "sweetalert2";

import { IExpense } from "../../models/IExpense";


interface IExpenseSlice {
  expense: IExpense,
  expenseList: IExpense[],
  isExpenseLoading: boolean,
  isExpenseListLoading: boolean
}
const initialExpenseSlice: IExpenseSlice = {
    expense: {
        id: "",
        title: "",
        personnelId: "",
        managerId: "",
        expenseDate: 0,
        description: "",
        expenseState: ""
    },
    expenseList: [],
    isExpenseLoading: false,
    isExpenseListLoading: false
};

interface IManageExpense{
    itemId: string,
	agentToken: string,
	updatedState: string
}

export const fetchManageExpense = createAsyncThunk(
    "expense/fetchManageExpense",
    async (payload: IManageExpense) => {
      const response = await fetch(`${apis.expenseService}/manage-expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((data) => data.json());
      return response;
    }
  );

interface IAddExpense{
  title: string,
  description: string,
  cost: number,
  token: string
}  

  export const fetchAddExpense = createAsyncThunk(
    "expense/fetchAddExpense",
    async (payload: IAddExpense)=> {
      const response = await fetch(`${apis.expenseService}/add-expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((data) => data.json());
      return response;
    }
  );
  


  export const fetchGetMyExpenses = createAsyncThunk(
    "expense/fetchGetMyExpenses",
    async ()=>{
        const token = localStorage.getItem("token")
        const response = await fetch(`${apis.expenseService}/get-my-expenses?token=`+token).then(data=>data.json());
        return response;
    }
  )

  export const fetchGetMyEmployeesExpenses = createAsyncThunk(
    "expense/fetchGetMyEmployeesExpenses",
    async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(`${apis.expenseService}/get-my-employees-expenses?token=`+token).then(data=>data.json())
      return response;
    }
  )

 

  export const fetchUploadFile = createAsyncThunk(
    "expense/fetchUploadFile",
    async (payload: FormData)=> {
      const response = await fetch(`${apis.mediaFileService}/upload-file`, {
        method: "POST",
        body: payload
      }).then((data) => data.json());
      return response;
    }
  )

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseSlice,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetMyExpenses.pending, (state) =>{
        state.isExpenseListLoading = true
    })
    builder.addCase(fetchGetMyExpenses.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isExpenseListLoading = false
        if(action.payload.code === 200){
            state.expenseList = action.payload.data
        }
        else {
            Swal.fire("Maalesef harcamalar yüklenirken bir hata oluştu")
        }
    })
    builder.addCase(fetchManageExpense.pending, (state)=>{
        state.isExpenseLoading = true
    })
    builder.addCase(fetchManageExpense.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
        state.isExpenseLoading = false
        if (action.payload.code === 200){
            Swal.fire("İşlem başarıyla gerçekleştirildi")
        }
        else{
            Swal.fire("İşlem gerçekleştirilirken bir hatayla karşılaşıldı")
        }
    })
    builder.addCase(fetchAddExpense.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      if (action.payload.code === 200){
        Swal.fire("harcama ekleme başarılı")
      }
      else Swal.fire("harcama eklenemedi")
    })
    builder.addCase(fetchUploadFile.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      if (action.payload.code === 200){
        Swal.fire("dosya başarıyla yüklendi")
      }
      else Swal.fire("dosya yüklenirken bir hata oluştu")
    })
    builder.addCase(fetchGetMyEmployeesExpenses.pending, state=>{
      state.isExpenseListLoading = true;
    })
    builder.addCase(fetchGetMyEmployeesExpenses.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
      state.isExpenseListLoading = false;
      if (action.payload.code === 200){
        state.expenseList = action.payload.data;
      }
    })
  },
});
export default expenseSlice.reducer;
