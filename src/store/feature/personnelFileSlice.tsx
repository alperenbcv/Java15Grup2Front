import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../models/IComment";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { IVisitorComment } from "../../models/IVisitorComment";
import store from "..";
import { IPersonnelFile } from "../../models/IPersonnelFile";


interface IPersonnelFileState{
    personnelFileList: IPersonnelFile[]
    isPersonnelFileListLoading: boolean,
    personnelFile: IPersonnelFile,
    isPersonnelFileLoading: boolean
}

const initialPersonnelFileState: IPersonnelFileState = {
    personnelFileList: [],
    isPersonnelFileListLoading: false,
    personnelFile: {
        fileName: "",
        fileType: "",
        fileUrl: "",
        id: "",
        personnelName: "",
        uploadDate: 0,
        personnelId: ""
    },
    isPersonnelFileLoading: false
};




export const fetchGetFiles = createAsyncThunk(
    'personnelFile/fetchGetFiles',
    async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apis.mediaFileService}/get-files?token=` + token).then(data=> data.json());
        return response
    }
);

export const fetchUploadPersonnelFile = createAsyncThunk(
    'personnelFile/fetchUploadPersonnelFile',
    async (payload:FormData) => {
        const response = await fetch(`${apis.mediaFileService}/upload-file`, {
            method: 'POST',
            body: payload
        }).then(data=> data.json());

        

        return response
    }
);



// Slice: State yönetimi
const personnelFileSlice = createSlice({
    name: 'personnelFile',
    initialState: initialPersonnelFileState,
    reducers: {
        
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchGetFiles.pending, (state)=>{
            state.isPersonnelFileListLoading = true
        })
        builder.addCase(fetchGetFiles.fulfilled, (state,action:PayloadAction<IBaseResponse>)=>{
            state.isPersonnelFileListLoading = false
            if (action.payload.code === 200) {state.personnelFileList = action.payload.data}
        })

        builder.addCase(fetchUploadPersonnelFile.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            if (action.payload.code === 200){
                Swal.fire("dosya başarıyla değiştirildi")
            }
            else Swal.fire("dosya değiştirilirken bir hata oluştu")
        })
    }
   
    
});
export const { } = personnelFileSlice.actions
export default personnelFileSlice.reducer;
