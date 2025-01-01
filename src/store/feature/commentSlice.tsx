import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../models/IComment";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { IVisitorComment } from "../../models/IVisitorComment";

interface ICommentState{
    comment: IComment,
    isCommentLoading: boolean,
    commentList: IVisitorComment[],
    isCommentListLoading: boolean,
}

const initialCommentState: ICommentState = {
    comment: {
        id: "",
        managerId: "",
        companyId: "",
        comment: ""
    },
    isCommentLoading: false,
    commentList: [],
    isCommentListLoading: false,
};

interface IUpdateCommentDto{
    token: string,
    commentId?: string,
    comment?: string
}

export const fetchAddComment = createAsyncThunk<IBaseResponse, IUpdateCommentDto>(
    'comment/fetchAddComment',
    async (payload: IUpdateCommentDto) => {
        const response = await fetch(`${apis.commentService}/add-comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchDeleteComment = createAsyncThunk<IBaseResponse, IUpdateCommentDto>(
    'comment/fetchDeleteComment',
    async (payload: IUpdateCommentDto) => {
        const response = await fetch(`${apis.commentService}/delete-comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchEditComment = createAsyncThunk<IBaseResponse, IUpdateCommentDto>(
    'comment/fetchEditComment',
    async (payload: IUpdateCommentDto) => {
        const response = await fetch(`${apis.commentService}/edit-comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return (await response.json()) as IBaseResponse;
    }
);

export const fetchGetComment = createAsyncThunk<IBaseResponse>(
    'comment/fetchGetComment',
    async () => {
        const response = await fetch(`${apis.commentService}/get-comment?token=` + localStorage.getItem("token"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the comment of the company');
        }

        return (await response.json()) as IBaseResponse;
    }
);

export const fetchGetAllComments = createAsyncThunk<IBaseResponse>(
    'comment/fetchGetAllComments',
    async () => {
        const response = await fetch(`${apis.commentService}/get-all-comments`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all comments');
        }

        return (await response.json()) as IBaseResponse;
    }
);


// Slice: State yönetimi
const commentSlice = createSlice({
    name: 'company',
    initialState: initialCommentState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetComment.pending, (state)=>{
            state.isCommentLoading = true
        })
        builder.addCase(fetchGetComment.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            state.isCommentLoading = false
            if (action.payload.code === 200){
                state.comment = action.payload.data
            }
            else {
                Swal.fire("şirketinize ait yorum getirilirken bir hatayla karşılaşıldı")
            }
        })

        builder.addCase(fetchAddComment.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            if (action.payload.code === 200){
                fetchGetComment();
            }
            else {
                Swal.fire("yorum eklerken bir hatayla karşılaşıldı")
            }
        })
        builder.addCase(fetchDeleteComment.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            if (action.payload.code === 200){
                fetchGetComment();
            }
            else {
                Swal.fire("yorum silinirken bir hatayla karşılaşıldı")
            }
        })
        builder.addCase(fetchEditComment.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            if (action.payload.code === 200){
                state.comment = action.payload.data
            }
            else {
                Swal.fire("yorum güncellenirken bir hatayla karşılaşıldı")
            }
        })
        builder.addCase(fetchGetAllComments.pending, (state)=>{
            state.isCommentListLoading = true
        })
        builder.addCase(fetchGetAllComments.fulfilled, (state, action:PayloadAction<IBaseResponse>)=>{
            state.isCommentListLoading = false
            if (action.payload.code === 200){
                state.commentList = action.payload.data
            }
            else {
                Swal.fire("şirketlerin yorumları getirilirken hatayla karşılaşıldı")
            }
        })
    }
});

export default commentSlice.reducer;
