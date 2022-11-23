import { createSlice } from "@reduxjs/toolkit";
const modalSlice=createSlice({
    name:"modal",
    initialState:{isModalOpen:false,isCODModalOpen:false,isFormOpen:false,data:{}},
    reducers:{
        setModal(state,action){state.isModalOpen=action.payload},
        setCODModal(state,action){state.isCODModalOpen=action.payload},
        setForm(state,action){state.isFormOpen=action.payload},
        setData(state,action){state.data=action.payload}
    },
})
export default modalSlice.reducer;
export const modalActions=modalSlice.actions;

