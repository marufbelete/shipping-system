import { createSlice } from "@reduxjs/toolkit";
const hubSlice=createSlice({
    name:"modal",
    initialState:{tableData:[],isEditing:false,updated:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default hubSlice.reducer;
export const hubActions=hubSlice.actions;

