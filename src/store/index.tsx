import { configureStore } from "@reduxjs/toolkit";
import { pageSlice, companySlice, managerSlice, employeeSlice, shiftSlice } from "./feature";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        page: pageSlice,
        company: companySlice,
        manager : managerSlice,
        employee : employeeSlice,
        shift : shiftSlice
    }
})

export type MyDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const MyUseSelector = useSelector.withTypes<RootState>();
export default store;