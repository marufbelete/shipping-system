import { createSlice } from "@reduxjs/toolkit";
const customerSlice=createSlice({
    name:"modal",
    initialState:{tableData:[],isEditing:false,updated:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default customerSlice.reducer;
export const customerActions=customerSlice.actions;

