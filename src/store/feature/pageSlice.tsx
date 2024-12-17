import { configureStore, createSlice } from '@reduxjs/toolkit';

interface ActivePage {
    activePage : string | null
}

const activePage: ActivePage = {
    activePage: null
}

const activePageSlice = createSlice({
    name: 'activePage',
    initialState: { activePage:null},
    reducers: {
        setActivePage: (state,action)=>{
            state.activePage = action.payload;
        },
    },
});

export const {setActivePage} = activePageSlice.actions;
export default activePageSlice.reducer;