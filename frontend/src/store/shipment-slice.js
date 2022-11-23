import { createSlice } from "@reduxjs/toolkit";
const shipmentSlice=createSlice({
    name:"modal",
    initialState:{tableData:[],isOpen:false,fileName:'',isEditing:false,updated:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default shipmentSlice.reducer;
export const shipmentActions=shipmentSlice.actions;

