import { configureStore } from "@reduxjs/toolkit";
import { pageSlice, companySlice, userSlice, leaveSlice, possessionSlice, expenseSlice, commentSlice } from "./feature";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        page: pageSlice,
        company: companySlice,
        user : userSlice,
        leave: leaveSlice,
        possession: possessionSlice,
        expense: expenseSlice,
        comment: commentSlice
    }
})

export type MyDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const MyUseSelector = useSelector.withTypes<RootState>();
export default store;