import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:"modal",
    initialState:{tableData:[],isEditing:false,updated:false,profile:{}},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
        setProfile(state,action){state.profile=action.payload}
    },
})
export default userSlice.reducer;
export const userActions=userSlice.actions;

