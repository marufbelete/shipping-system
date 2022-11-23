import { createSlice } from "@reduxjs/toolkit";
const tablemodalSlice=createSlice({
    name:"modal",
    initialState:{tableData:[],isOpen:false,fileName:'',isEditing:false},
    reducers:{
        setTableModal(state,action){state.tableData=action.payload},
        setVisibility(state,action){state.isOpen=action.payload},
        setFileName(state,action){state.fileName=action.payload},
        setEditing(state,action){state.isEditing=action.payload}
    },
})
export default tablemodalSlice.reducer;
export const tablemodalActions=tablemodalSlice.actions;

