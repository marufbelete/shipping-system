import { createSlice } from "@reduxjs/toolkit";
const loginSlice=createSlice({
    name:"login",
    initialState:{isAuthenticated:false,token:''},
    reducers:{
        isLoged(state,action){state.isAuthenticated=action.payload},
        setCookie(state,action){state.token=action.payload},

    },
})

export default loginSlice.reducer;
export const loginActions=loginSlice.actions;
